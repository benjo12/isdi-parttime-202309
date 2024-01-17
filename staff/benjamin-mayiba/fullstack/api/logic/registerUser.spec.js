import mongoose from 'mongoose'
import { expect } from 'chai'

import registerUser from './registerUser.js'
import { SystemError, NotFoundError, CredentialsError, DuplicityError } from './errors.js'
import { User } from '../data/models.js'

describe('registerUser', () => {
    before(() => mongoose.connect('mongodb://127.0.0.1:27017/test'))

    //beforeEach(() => User.deleteMany())
     beforeEach(async () => {
        // Eliminar solo el usuario de prueba antes de cada prueba
        await User.deleteOne({ email: 'chat@noire.com' });
    });

    it('succeds on new user', () => {
        return registerUser('Ji Rafa', 'ji@rafa.com', '123123123')
    })

    it('fails on already existing user', () => {
        return User.create({ name: 'Le On', email: 'le@on.com', password: '123123123' })
            .then(() => {
                return registerUser('Le On', 'le@on.com', '123123123')
                    .catch(error => {
                        expect(error).to.be.instanceOf(DuplicityError)
                        expect(error.message).to.equal('user already exists')
                    })
            })
    })

    after(() => mongoose.disconnect())
})