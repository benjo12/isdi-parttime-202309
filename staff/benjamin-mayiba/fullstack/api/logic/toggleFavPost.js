import { NotFoundError, SystemError } from './errors.js'
import validate from './helpers/validate.js'
import { User, Post } from '../data/models.js'

function toggleFavPost(userId, postId, callback) {
    validate.text(userId, 'user id')
    validate.text(postId, 'post id')
    validate.function(callback, 'callback')

    User.findById(userId)
        .then(user => {
            if (!user) {
                callback(new NotFoundError('user not found'))

                return
            }

            Post.findById(postId).lean()
                .then(post => {
                    if (!post) {
                        callback(new NotFoundError('post not found'))

                        return
                    }

                    const index = user.favs.findIndex(postObjectId => postObjectId.toString() === postId)

                    if (index < 0)
                        user.favs.push(postId)
                    else
                        user.favs.splice(index, 1)

                    user.save()
                        .then(() => callback(null))
                        .catch(error => callback(new SystemError(error.message)))
                })
                .catch(error => callback(new SystemError(error.message)))
        })
        .catch(error => callback(new SystemError(error.message)))
}

export default toggleFavPost