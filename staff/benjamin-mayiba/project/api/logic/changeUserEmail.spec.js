import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
import { expect } from 'chai'
import random from './helpers/random.js'

import bcrypt from 'bcryptjs'
import { User } from '../data/models.js'
import changeUserEmail from './changeUserEmail.js'
import { errors } from 'com'
const { CredentialsError, ContentError } = errors

const { ObjectId } = mongoose.Types

describe('changeUserEmail', () =>{
    before(() => mongoose.connect(process.env.PRUEBA_MONGODB_URL))

    beforeEach(() => User.deleteMany())
    
     it('succeeds on correct email changed', async () =>{
        const name = random.name()
        const email = random.email()
        const password = random.password()
        const newEmail = random.email()
        const newEmailConfirm = newEmail


         const hash = await bcrypt.hash(password, 8)
         const user = await User.create({ name, email, password: hash })
          await changeUserEmail(user.id, newEmail, newEmailConfirm, password)
            const updatedUser = await User.findById(user.id) // Buscar el usuario actualizado en la base de datos
            expect(updatedUser.password).to.equal(user.password)
            expect(updatedUser.email).to.equal(newEmail)
            expect(updatedUser.email).to.not.equal(email)
                     
    })



    it('fails on wrong password', async () => {
       const name = random.name()
        const email = random.email()
        const password = random.password()
        const wrongPassword = random.password()

        // Hashear la contraseña antes de guardarla en la base de datos
        const hash = await bcrypt.hash(password, 8)
        const user = await User.create({ name, email, password: hash })

        const newEmail = random.email()
        const newEmailConfirm = newEmail

        try {
            // Se espera que esta llamada falle con la contraseña incorrecta
            await changeUserEmail(user.id, newEmail, newEmailConfirm, wrongPassword)
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.be.instanceOf(CredentialsError)
            expect(error.message).to.equal('wrong password')
        }
    })

    it('fails on wrong email confirmation', async () => {
       const name = random.name()
        const email = random.email()
        const password = random.password()
        

        const hash = await bcrypt.hash(password, 8)
        const user = await User.create({ name, email, password: hash })

        const newEmail = random.email()
        const newEmailConfirm = random.email()

        try {
            
            await changeUserEmail(user.id, newEmail, newEmailConfirm, password)
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.be.instanceOf(ContentError)
            expect(error.message).to.equal('new email and its confirmation do not match')
        }
    })
    after(() => mongoose.disconnect())
})