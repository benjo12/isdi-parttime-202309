import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

import { errors } from 'com'

import express from 'express'

import registerUser from './logic/registerUser.js'
import authenticateUser from './logic/authenticateUser.js'
import retrieveUser from './logic/retrieveUser.js'
import createService from './logic/createService.js'
import createEvent from './logic/createEvent.js'
import retrieveEvent from './logic/retrieveEvent.js'
import retrieveService from './logic/retrieveService.js'


const { SystemError, DuplicityError, NotFoundError, ContentError, CredentialsError } = errors

mongoose.connect(process.env.MONGODB_URL)
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
          // crear un usuario
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
         // authenticar un usuario
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
       // Obtener usuario
        server.get('/users', async (req, res) =>{
             try {
                const userId = req.headers.authorization.substring(7)

                const user = await retrieveUser(userId)

                res.json(user)
                
             } catch (error) {
                let status = 500

                if(error instanceof NotFoundError)
                    status = 404
                else if(error instanceof ContentError || error instanceof TypeError)
                    status = 406    
                res.status(status).json({ error: error.constructor.name, message: error.message })
             }
        })

       // Crear servicio
        server.post('/services', jsonBodyParser, async(req, res) =>{
            try{
                const userId = req.headers.authorization.substring(7)
                
                const {name, description} = req.body
                
            const serviceId= await createService(userId,name, description )
            res.json(serviceId)
            
            }catch(error){
            let status = 500
            if(error instanceof NotFoundError){
                status = 404
            }
            else if(error instanceof ContentError || error instanceof TypeError){
                        status = 406
            }
                
            res.status(status).json({error: error.constructor.name, message: error.message}) 
            }
        })

        // crear un evento
         server.post('/events', jsonBodyParser, async(req, res) =>{
            try{
                const userId = req.headers.authorization.substring(7)
                
                const { serviceId, date, time } = req.body
                
            await createEvent(userId ,serviceId, date, time )
                res.status(201).send()
            
            }catch(error){
            let status = 500
            if(error instanceof NotFoundError){
                status = 404
            }
            else if(error instanceof ContentError || error instanceof TypeError){
                        status = 406
            }
                
            res.status(status).json({error: error.constructor.name, message: error.message}) 
            }
        })

        // obtener eventos

            server.get('/events', jsonBodyParser, async(req,res) =>{
                try{
                    const userId = req.headers.authorization.substring(7)

                    const serviceId = req.query.serviceId;

                    const event = await retrieveEvent(userId, serviceId)
                    res.json(event)
                    
                }catch(error){
                    let status = 500
                    if(error instanceof NotFoundError){
                        status = 404
                    }
                    else if(error instanceof ContentError || error instanceof TypeError){
                            status = 406
                    }
                    
                    res.status(status).json({error: error.constructor.name, message: error.message})
                }
            })

            // obtener servicios


            server.get('/services', async(req,res) =>{
                try{
                    const userId = req.headers.authorization.substring(7)
                    
                    const services = await retrieveService(userId)
                    res.json(services)
                    
                }catch(error){
                    let status = 500
                    if(error instanceof NotFoundError){
                        status = 404
                    }
                    else if(error instanceof ContentError || error instanceof TypeError){
                            status = 406
                    }
                    
                    res.status(status).json({error: error.constructor.name, message: error.message})
                }
            })

        server.listen(3000, () => console.log('server is up'))
 })
  .catch(error => console.error(error))