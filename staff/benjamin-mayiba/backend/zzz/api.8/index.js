const express = require('express')

const registerUser = require('./logic/registerUser')

const authenticateUser = require('./logic/authenticateUser')

const retrieveUser = require('./logic/retrieveUser')
const createPost = require('./logic/createPost')
const toggleLikePost = require('./logic/toggleLikePost')

const { SystemError, NotFoundError, ContentError, DuplicityError } = require('./utils/errors')

const server = express()

server.get('/' , (req, res) => res.send('Hello, World!'))


const jsonBodyParser = express.json()

server.post('/users', jsonBodyParser, (req, res)=>{
    try {
        const {name, email, password} = req.body

        registerUser(name, email, password, error =>{
            if(error){

                let status = 400

                if(error instanceof SystemError)
                     status = 500
                else if( error instanceof DuplicityError)
                    status = 409 

                res.status(status).json({error: error.constructor.name, message: error.message})

                return
            }

            res.status(201).send
        })
        
    } catch (error) {

        let status = 400

        if(error instanceof ContentError)
              status = 406
        res.status(status).json({ error: error.constructor.name, message: error.message })
    }
})

server.post('/users/auth', jsonBodyParser, (req, res)=>{

    try {
        const {email, password} = req.body

        authenticateUser(email, password, (error, userId)=>{
            if(error){
                res.status(400).json({error: error.constructor.name, message: error.message})

                return
            }

            res.json(userId)
        })
    } catch (error) {
        res.status(400).json({error: error.constructor.name, message: error.message})
    }
})

server.get('/users', (req, res)=>{
    try {
        const userId = req.headers.authorization.substring(7)

        retrieveUser(userId, (error, user)=>{
            if(error){
                res.status(400).json({error: error.constructor.name, message: error.message})

                return
            }

            res.json(user)
        })
    } catch (error) {
          res.status(400).json({ error: error.constructor.name, message: error.message })

    }
})

server.post('/posts', jsonBodyParser, (req, res) =>{
    try {

        const userId = req.headers.authorization.substring(7)

        const { image, text } = req.body

        createPost(userId, image, text, error =>{
            if(error){

                res.status(400).json({error: error.constructor.name, message: error.message})

                return
            }
            res.status(201).send()
        })
        
    } catch (error) {
        res.status(400).json({error: error.constructor.name, message: error.message})

    }
})

server.patch('/posts/:postId/likes', (req, res) => {
    try {
        const userId = String(req.headers.authorization.substring(7));
        const { postId } = req.params;

        toggleLikePost(userId, postId, error => {
            if (error) {
                let status = 400;
                if (error instanceof SystemError)
                    status = 500;
                else if (error instanceof NotFoundError)
                    status = 404;

                res.status(status).json({ error: error.constructor.name, message: error.message });
                return;
            }

            res.status(204).send();
        });
    } catch (error) {
        let status = 400;
        if (error instanceof ContentError)
            status = 406;

        res.status(status).json({ error: error.constructor.name, message: error.message });
    }
});



server.listen(8000, () => console.log('server is up'))


// Abre otra terminal(bash) y ejecuta el siguiente comando, ajustando los datos según tus necesidades:
// curl -X POST -H "Content-Type: application/json" -d '{"name" : "Le Chuga", "email" : "le@chuga.com", "password" : "123123123"}' http://localhost:8000/register
// en poweshell, seria
// Invoke-WebRequest -Uri http://localhost:8000/register -Method POST -Body '{"name": "Le Chuga", "email": "le@chuga.com", "password": "123123123"}' -Headers @{"Content-Type"="application/json"}
