import { User } from '../data/models.js'
import { validate, errors } from 'com'

const { SystemError, DuplicityError } = errors


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
