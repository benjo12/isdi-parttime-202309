import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
import { expect } from 'chai'
import random from './helpers/random.js'
import bcrypt from 'bcryptjs'

import authenticateUser from './authenticateUser.js'
import { User } from '../data/models.js'

import { errors} from 'com'

const { NotFoundError, CredentialsError } = errors

describe('authenticateUser', () =>{
    before(async () => await mongoose.connect(process.env.PRUEBA_MONGODB_URL))

    beforeEach(async () => await User.deleteMany())

    it('succeeds on correct credentials', async () =>{
        const name = random.name()
        const email = random.email()
        const password = random.password()

        const hash = await bcrypt.hash(password, 8)
        const user = await User.create({name, email, password: hash })
        const userId = await authenticateUser(email, password)

        expect(userId).to.be.a('string')
        expect(userId).to.have.lengthOf(24)
        expect(userId).to.equal(user.id)
    })

    it('fails on wrong email', async () =>{
         const name = random.name()
        const email = random.email()
        const email2 = random.email()
        const password = random.password()

        const hash = await bcrypt.hash(password, 8)
        const user = await User.create({name, email, password: hash })

        try {
            const userId = await authenticateUser(email2, password)

            throw new Error('should not reach this point')

        } catch (error) {
            
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.equal('user not found')
        }

    })

    it('fails on wrong password', async () =>{
        const name = random.name()
        const email = random.email()
        const password = random.password()
         const password2 = random.password()

         const hash = await bcrypt.hash(password, 8)
         const userId = await User.create({name, email, password: hash})

         try {
            const userId = await authenticateUser(email, password2)
             throw new Error('should not reach this point')
         } catch (error) {

            expect(error).to.be.instanceOf(CredentialsError)
            expect(error.message).to.equal('wrong password')
            
         }
    })
})