import bcrypt from 'bcryptjs'
import { User } from '../data/models.js'
import { validate, errors } from 'com'

const { SystemError, NotFoundError, CredentialsError, ContentError } = errors

function changeUserEmail(userId, newEmail, newEmailConfirm, password) {
    validate.id(userId, 'user id')
    validate.email(newEmail, 'new email')
    validate.email(newEmailConfirm, 'new email confirm')
    validate.text(password, 'password')

    return User.findById(userId)
        .catch(error => {
            throw new SystemError(error.message)
        })
        .then(user => {
            if (!user) {
                throw new NotFoundError('user not found')
            }

            if (newEmail !== newEmailConfirm) {
                throw new ContentError('new email and its confirmation do not match')
            }

            return bcrypt.compare(password, user.password)
                .catch(error => {
                    throw new SystemError(error.message)
                })
                .then(match => {
                    if (!match) {
                        throw new CredentialsError('wrong password')
                    }

                    user.email = newEmail
                    return user.save()
                        .catch(error => {
                            throw new SystemError(error.message)
                        })
                })
        })
}

export default changeUserEmail
