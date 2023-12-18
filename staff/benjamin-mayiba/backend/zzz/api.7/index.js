const express = require('express')

const registerUser = require('./logic/registerUser')

const authenticateUser = require('./logic/authenticateUser')

const retrieveUser = require('./logic/retrieveUser')

const server = express()

server.get('/' , (req, res) => res.send('Hello, World!'))


const jsonBodyParser = express.json()

server.post('/users', jsonBodyParser, (req, res)=>{
    try {
        const {name, email, password} = req.body

        registerUser(name, email, password, error =>{
            if(error){
                res.status(400).json({error: error.constructor.name, message: error.message})

                return
            }

            res.status(201).send
        })
        
    } catch (error) {
        res.status(400).json({ error: error.constructor.name, message: error.message })
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

server.listen(8000, () => console.log('server is up'))


// Abre otra terminal(bash) y ejecuta el siguiente comando, ajustando los datos según tus necesidades:
// curl -X POST -H "Content-Type: application/json" -d '{"name" : "Le Chuga", "email" : "le@chuga.com", "password" : "123123123"}' http://localhost:8000/register
// en poweshell, seria
// Invoke-WebRequest -Uri http://localhost:8000/register -Method POST -Body '{"name": "Le Chuga", "email": "le@chuga.com", "password": "123123123"}' -Headers @{"Content-Type"="application/json"}
