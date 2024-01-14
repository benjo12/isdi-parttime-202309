const registerUserHandler = require('./registerUserHandler')
const authenticateUserHandler = require('./authenticateUserHandler')
const retrieveUserHandler = require('./retrieveUserHandler')
const retrievePostsHandler = require('./retrievePostsHandler')
const createPostHandler = require('./createPostHandler')
const toggleLikePostHandler = require('./toggleLikePostHandler')
const toggleFavPostHandler = require('./toggleFavPostHandler')
const retrieveFavPostsHandler = require('./retrieveFavPostsHandler')
const changeUserEmailHandler = require('./changeUserEmailHandler')

module.exports = {
    registerUserHandler,
    authenticateUserHandler,
    retrieveUserHandler,
    retrievePostsHandler,
    createPostHandler,
    toggleLikePostHandler,
    toggleFavPostHandler,
    retrieveFavPostsHandler,
    changeUserEmailHandler
}