import bcrypt from 'bcryptjs'

import { validate, errors } from 'com'

import { User } from '../data/models.js'

const { SystemError, DuplicityError } = errors

function registerUser(name, email, password) {
    validate.text(name, 'name')
    validate.email(email, 'email')
    validate.password(password, 'password')

    return bcrypt.hash(password, 8)
      .catch(error => { throw new SystemError(error.message) })
      .then(hash =>
           User.create({ name, email, password: hash })
            .catch(error => {
                if (error.code === 11000)
                    throw new DuplicityError('user already exists')

                throw new SystemError(error.message)
            })
            .then(user => { })
      
      )

    
}

export default registerUser