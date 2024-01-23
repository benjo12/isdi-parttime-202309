import validate from './helpers/validate.js'
import { DuplicityError, SystemError } from './errors.js'

import { User } from '../data/models.js'

function registerUser(name, email, password) {
    validate.text(name, 'name')
    validate.email(email, 'email')
    validate.text(password, 'password')

    return User.create({ name, email, password })
        .catch(error => {
            if (error.code === 11000)
                throw new DuplicityError('user already exists')

            throw new SystemError(error.message)
        })
        .then(user => { })
}

export default registerUser