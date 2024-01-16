const {User} = require("../data/models")
const validate = require('./helpers/validate')
const {SystemError, NotFoundError, ContentError} = require("./errors")

function changeUserPassword(userId, password, newPassword, newPasswordConfirm, callback){
    validate.id(userId, 'user id')
    validate.text(password, 'password')
    validate.text(newPassword, 'new password')
    validate.text(newPasswordConfirm, 'new password confirm')
    validate.function(callback, 'callback')

    User.findById(userId)
        .then(user => {
            if (!user) {
                callback(new NotFoundError('User not found'))
                return;
            }
            if (newPassword !== newPasswordConfirm) {
                callback(new ContentError('New password and its confirmation do not match'))
                return;
            }
            if (user.password !== password) {
                callback(new CredentialsError('Wrong credentials'))
                return;
            }
            user.password = newPassword

            user.save()
                .then(() => callback(null))
                .catch(error => callback(new SystemError(error.message)))
        })
        .catch(error => callback(new SystemError(error.message)))

}

module.exports = changeUserPassword