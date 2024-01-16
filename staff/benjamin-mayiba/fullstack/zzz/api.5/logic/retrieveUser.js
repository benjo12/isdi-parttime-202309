const validate = require('./helpers/validate')

const { User } = require('../data/models')
const { SystemError, NotFoundError } = require('./errors')

function retrieveUser(userId, callback) {
    validate.id(userId, 'user id')
    validate.function(callback, 'callback')

    User.findById(userId, 'name').lean()
        .then(user => {
            if (!user) {
                callback(new NotFoundError('user not found'))

                return
            }

            delete user._id

            callback(null, user)
        })
        .catch(error => callback(new SystemError(error.message)))
}

module.exports = retrieveUser