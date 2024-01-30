import { User } from '../data/models.js'
import { validate, errors } from 'com'
const { SystemError, NotFoundError, CredentialsError, ContentError } = errors

function changeUserPassword(userId, password, newPassword, newPasswordConfirm) {
    validate.id(userId, 'user id')
    validate.password(password, 'password')
    validate.password(newPassword, 'new password')
    validate.password(newPasswordConfirm, 'new password confirm')

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
