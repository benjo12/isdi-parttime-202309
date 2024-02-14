import { User } from '../data/models.js'
import validate from './helpers/validate.js'
import { SystemError, DuplicityError } from './errors.js'

export default async function registerUser(name, email, password) {
    validate.text(name, 'name')
    validate.email(email, 'email')
    validate.password(password, 'password')

    try {
        await User.create({ name, email, password })
    } catch (error) {
        if (error.code === 11000) {
            throw new DuplicityError('user already exists')
        }
        throw new SystemError(error.message)
    }
}
