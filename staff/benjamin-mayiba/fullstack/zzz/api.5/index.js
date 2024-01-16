require('dotenv').config()

const mongoose = require('mongoose')
const express = require('express')

const cors = require('./utils/cors')

const {
    registerUserHandler,
    authenticateUserHandler,
    retrieveUserHandler,
    retrievePostsHandler,
    createPostHandler,
    toggleLikePostHandler,
    toggleFavPostHandler,
    retrieveFavPostsHandler,
    changeUserEmailHandler,
    changeUserPasswordHandler
} = require('./handlers')

mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        const server = express()

        server.get('/', (req, res) => res.send('Hello, World!'))

        const jsonBodyParser = express.json()

        server.use(cors)

        server.post('/users', jsonBodyParser, registerUserHandler)

        server.post('/users/auth', jsonBodyParser, authenticateUserHandler)
        server.post('/users/change-email', jsonBodyParser,changeUserEmailHandler)
        server.post('/users/change-password', jsonBodyParser, changeUserPasswordHandler)


        server.get('/users', retrieveUserHandler)

        server.get('/posts', retrievePostsHandler)

        server.post('/posts', jsonBodyParser, createPostHandler)

        server.patch('/posts/:postId/likes', toggleLikePostHandler)

        server.patch('/posts/:postId/favs', toggleFavPostHandler)

        server.get('/posts/favs', retrieveFavPostsHandler)
        

        server.listen(process.env.PORT, () => console.log(`server running on port ${process.env.PORT}`))
    })
    .catch(error => console.error(error))