import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

import { errors } from 'com'

import express from 'express'

import registerUser from './logic/registerUser.js'
import authenticateUser from './logic/authenticateUser.js'
const { SystemError, DuplicityError, NotFoundError, ContentError, CredentialsError } = errors

mongoose.connect('mongodb://127.0.0.1:27017/project')
  .then(() =>{
            const server = express()
        const jsonBodyParser = express.json()

        server.get('/', (req, res) => res.send('Hello, World!'))    

        server.use((req, res, next) => {
            res.setHeader('Access-Control-Allow-Origin', '*')
            res.setHeader('Access-Control-Allow-Headers', '*')
            res.setHeader('Access-Control-Allow-Methods', '*')

            next()
        })

        server.post('/users', jsonBodyParser, (req, res) =>{
            try {

                const {name, email, password } = req.body
                
                registerUser(name, email, password)
                .then(() => res.status(201).send())
                .catch(error =>{
                    let status = 500
                    if(error instanceof DuplicityError)
                    status = 409
                    res.status(status).json({ error: error.constructor.name, message: error.message })   
                })

            } catch (error) {
            let status = 500

                if (error instanceof ContentError || error instanceof TypeError)
                    status = 406

                res.status(status).json({ error: error.constructor.name, message: error.message })
            }
        })

        server.post('/users/auth', jsonBodyParser, async (req, res) => {
            try {
                const { email, password } = req.body;
                const userId = await authenticateUser(email, password);
                res.json(userId);
            } catch (error) {
                let status = 500;
                if (error instanceof NotFoundError) {
                    status = 404;
                } else if (error instanceof CredentialsError) {
                    status = 401;
                } else if (error instanceof ContentError || error instanceof TypeError) {
                    status = 406;
                }
                res.status(status).json({ error: error.constructor.name, message: error.message });
            }
        });

        server.listen(3000, () => console.log('server is up'))
 })
  .catch(error => console.error(error))