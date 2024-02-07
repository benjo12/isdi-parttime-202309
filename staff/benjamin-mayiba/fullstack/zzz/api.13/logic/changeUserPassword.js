import bcrypt from 'bcryptjs'
import { User } from '../data/models.js'
import { validate, errors } from 'com'

const { SystemError, NotFoundError, CredentialsError, ContentError } = errors

function changeUserPassword(userId, password, newPassword, newPasswordConfirm) {
    // Validar los parámetros
    validate.id(userId, 'user id')
    validate.password(password, 'password')
    validate.password(newPassword, 'new password')
    validate.password(newPasswordConfirm, 'new password confirm')

    // Encontrar al usuario por ID
    return User.findById(userId)
        .then(user => {
            if (!user) {
                throw new NotFoundError('User not found')
            }

            // Comparar la contraseña actual del usuario con la proporcionada
            return bcrypt.compare(password, user.password)
                .catch(error => { throw new SystemError(error.message) })
                .then(matchPassword => {
                    if (!matchPassword) {
                        throw new CredentialsError('Wrong credentials')
                    }

                    // Verificar si las nuevas contraseñas coinciden
                    if (newPassword !== newPasswordConfirm) {
                        throw new ContentError('New password and its confirmation do not match')
                    }

                    // Generar el hash para la nueva contraseña
                    return bcrypt.hash(newPassword, 8)
                        .catch(error => { throw new SystemError(error.message) })
                        .then(hashedPassword => {
                            // Asignar la nueva contraseña al usuario y guardar los cambios
                            user.password = hashedPassword
                            return user.save()
                                .catch(error => {
                                    throw new SystemError(error.message)
                                })
                        })
                })
        })
        .catch(error => {
            throw new SystemError(error.message)
        })
}

export default changeUserPassword
