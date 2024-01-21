import { User } from '../data/models.js'
import validate from './helpers/validate.js'
import { SystemError, NotFoundError, CredentialsError, ContentError } from './errors.js'

function changeUserPassword(userId, password, newPassword, newPasswordConfirm) {
    validate.id(userId, 'user id')
    validate.text(password, 'password')
    validate.text(newPassword, 'new password')
    validate.text(newPasswordConfirm, 'new password confirm')

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) {
                throw new NotFoundError('user not found')
            }
            if (newPassword !== newPasswordConfirm) {
                throw new ContentError('New password and its confirmation do not match')
            }
            if (user.password !== password) {
                throw new CredentialsError('Wrong credentials')
            }
            user.password = newPassword

            return user.save()
                .catch(error => { throw new SystemError(error.message) })
        })
}

export default changeUserPassword
