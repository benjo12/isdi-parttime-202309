const mongoose = require('mongoose')

const express = require('express')

const registerUser = require('./logic/registerUser')

const authenticateUser = require('./logic/authenticateUser')

const retrieveUser = require('./logic/retrieveUser')
const createPost = require('./logic/createPost')
const toggleLikePost = require('./logic/toggleLikePost')

const { NotFoundError, ContentError, DuplicityError } = require('./logic/errors')
const { CredentialsError } = require('./logic/errors')

mongoose.connect('mongodb://127.0.0.1:27017/test')
    .then(() => {
        const server = express()

        server.get('/', (req, res) => res.send('Hello, World!'))

        const jsonBodyParser = express.json()

        server.use((req, res, next) => {
            res.setHeader('Access-Control-Allow-Origin', '*')
            res.setHeader('Access-Control-Allow-Headers', '*')
            res.setHeader('Access-Control-Allow-Methods', '*')

            next()
        })

        server.post('/users', jsonBodyParser, (req, res) => {
            try {
                const { name, email, password } = req.body

                registerUser(name, email, password, error => {
                    if (error) {
                        let status = 500

                        if (error instanceof DuplicityError)
                            status = 409

                        res.status(status).json({ error: error.constructor.name, message: error.message })

                        return
                    }

                    res.status(201).send()
                })
            } catch (error) {
                let status = 500

                if (error instanceof ContentError || error instanceof TypeError)
                    status = 406

                res.status(status).json({ error: error.constructor.name, message: error.message })
            }
        })

        server.post('/users/auth', jsonBodyParser, (req, res) => {
            try {
                const { email, password } = req.body

                authenticateUser(email, password, (error, userId) => {
                    if (error) {
                        let status = 500

                        if (error instanceof NotFoundError)
                            status = 404
                        else if (error instanceof CredentialsError)
                            status = 401

                        res.status(status).json({ error: error.constructor.name, message: error.message })

                        return
                    }

                    res.json(userId)
                })
            } catch (error) {
                let status = 500

                if (error instanceof ContentError || error instanceof TypeError)
                    status = 406

                res.status(status).json({ error: error.constructor.name, message: error.message })
            }
        })

        server.get('/users', (req, res) => {
            try {
                const userId = req.headers.authorization.substring(7)

                retrieveUser(userId, (error, user) => {
                    if (error) {
                        let status = 500

                        if (error instanceof NotFoundError)
                            status = 404

                        res.status(status).json({ error: error.constructor.name, message: error.message })

                        return
                    }

                    res.json(user)
                })
            } catch (error) {
                let status = 500

                if (error instanceof ContentError || error instanceof TypeError)
                    status = 406

                res.status(status).json({ error: error.constructor.name, message: error.message })
            }
        })

        server.post('/posts', jsonBodyParser, (req, res) => {
            try {
                const userId = req.headers.authorization.substring(7)

                const { image, text } = req.body

                createPost(userId, image, text, error => {
                    if (error) {
                        res.status(400).json({ error: error.constructor.name, message: error.message })

                        return
                    }

                    res.status(201).send()
                })
            } catch (error) {
                res.status(400).json({ error: error.constructor.name, message: error.message })
            }
        })

        server.patch('/posts/:postId/likes', (req, res) => {
            try {
                const userId = req.headers.authorization.substring(7)

                const { postId } = req.params

                toggleLikePost(userId, postId, error => {
                    if (error) {
                        let status = 500

                        if (error instanceof NotFoundError)
                            status = 404

                        res.status(status).json({ error: error.constructor.name, message: error.message })

                        return
                    }

                    res.status(204).send()
                })
            } catch (error) {
                let status = 500

                if (error instanceof ContentError || error instanceof TypeError)
                    status = 406

                res.status(status).json({ error: error.constructor.name, message: error.message })
            }
        })

        server.listen(8000, () => console.log('server is up'))
    })
    .catch(error => console.error(error))