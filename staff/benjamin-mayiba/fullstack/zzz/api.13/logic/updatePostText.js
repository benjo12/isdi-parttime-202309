import { User, Post } from '../data/models.js'
import {validate, errors } from 'com'
const { NotFoundError, ForbiddenError, SystemError } = errors


function updatePostText(userId, postId, text) {
    validate.id(userId, 'user id')
    validate.id(postId, 'post id')
    validate.text(text, 'text')

    return User.findById(userId)
        .catch(error => {
            throw new SystemError(error.message)
        })
        .then(user => {
            if (!user) {
                throw new NotFoundError('user not found')
            }

            return Post.findOne({ _id: postId, author: user.id })
                .catch(error => {
                    throw new SystemError(error.message)
                })
                .then(post => {
                    if (!post) {
                        throw new NotFoundError('post not found')
                    }

                    post.text = text

                    return post.save()
                        .catch(error => {
                            throw new SystemError(error.message)
                        })
                })
        })
}

export default updatePostText