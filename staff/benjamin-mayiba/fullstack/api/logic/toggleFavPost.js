const { NotFoundError, SystemError } = require("./errors");
const { validateId, validateFunction } = require("./helpers/validators");

const { User, Post } = require('../data/models')

function toggleFavPost(userId, postId, callback) {
    validateId(userId, 'user id')
    validateId(postId, 'post id')
    validateFunction(callback, 'callback')

    User.findById(userId)
        .then(user => {
            if (!user) {
                callback(new NotFoundError('user not found'))
                return
            }

            const postIndex = user.favs.indexOf(postId)

            if (postIndex < 0) {

                user.favs.push(postId)   
            } else {
                
                user.favs.splice(postIndex, 1)
            }
            
            user.save()
                .then(() => callback(null))
                .catch(error => callback(new SystemError(error.message)))
        })
        .catch(error => callback(new SystemError(error.message)))
}

module.exports = toggleFavPost