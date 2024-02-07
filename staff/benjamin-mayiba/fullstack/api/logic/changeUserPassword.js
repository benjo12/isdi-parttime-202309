import bcrypt from 'bcryptjs'
import { User } from '../data/models.js'
import { validate, errors } from 'com'

const { SystemError, NotFoundError, CredentialsError, ContentError } = errors


function changeUserPassword(userId, password, newPassword, newPasswordConfirm) {
    validate.id(userId, 'user id')
    validate.password(password, 'password')
    validate.password(newPassword, 'new password')
    validate.password(newPasswordConfirm, 'new password confirm')

    return User.findById(userId)
        .then(user => {
            if (!user) {
                throw new NotFoundError('user not found')
            }

            return bcrypt.compare(password, user.password)
                .then(matchPassword => {
                    if (!matchPassword) {
                        throw new CredentialsError('wrong credentials')
                    }

                    if (newPassword !== newPasswordConfirm) {
                        throw new ContentError('new password and its confirmation do not match')
                    }

                    return bcrypt.hash(newPassword, 8)
                        .then(hashedPassword => {
                            user.password = hashedPassword
                            return user.save()
                        })
                })
        })
        .catch(error => {
            throw new SystemError(error.message)
        })
}

export default changeUserPassword
