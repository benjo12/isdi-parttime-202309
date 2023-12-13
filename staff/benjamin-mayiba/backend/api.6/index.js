const express = require('express')

const registerUser = require('./logic/registerUser')

const server = express()

server.get('/' , (req, res) => res.send('Hello, World!'))

// TEST in browser GET http://localhost:8000/hello?name=Campa&surname=Nilla

server.get('/hello', (req, res) =>res.send(`hello, , ${req.query.name} ${req.query.surname}!`))

const jsonBodyParser = express.json()

server.post('/register', jsonBodyParser, (req, res)=>{
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


server.listen(8000, () => console.log('server is up'))


// Abre otra terminal(bash) y ejecuta el siguiente comando, ajustando los datos según tus necesidades:
// curl -X POST -H "Content-Type: application/json" -d '{"name" : "Le Chuga", "email" : "le@chuga.com", "password" : "123123123"}' http://localhost:8000/register
// en poweshell, seria
// Invoke-WebRequest -Uri http://localhost:8000/register -Method POST -Body '{"name": "Le Chuga", "email": "le@chuga.com", "password": "123123123"}' -Headers @{"Content-Type"="application/json"}
