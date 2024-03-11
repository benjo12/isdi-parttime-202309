import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
import { expect } from 'chai'
import random from './helpers/random.js'
import bcrypt from 'bcryptjs'

import changeUserPassword from './changeUserPassword.js'
import { User } from '../data/models.js'
import { errors } from 'com'

const { NotFoundError, CredentialsError, ContentError } = errors
const { ObjectId } = mongoose.Types

describe('changeUserPassword', () => {
    before(async () => {
        await mongoose.connect(process.env.PRUEBA_MONGODB_URL)
    })

    beforeEach(async () => {
        await User.deleteMany()
    })

    it('succeeds on correct password', async () => {
        const name = random.name()
        const email = random.email()
        const password = random.password()

        // Hashear la contraseña antes de guardarla en la base de datos
        const hash = await bcrypt.hash(password, 8)
        const user = await User.create({ name, email, password: hash })

        const newPassword = random.password()
        const newPasswordConfirm = newPassword

        await changeUserPassword(user.id, password, newPassword, newPasswordConfirm)

        expect(newPassword).to.equal(newPasswordConfirm)
        expect(password).to.not.equal(newPassword)

        // Recuperar el usuario actualizado de la base de datos para verificar la contraseña hasheada
        const updatedUser = await User.findById(user.id)
        const match = await bcrypt.compare(newPassword, updatedUser.password)
        expect(match).to.be.true
    })

    it('fails on wrong password', async () => {
       const name = random.name()
        const email = random.email()
        const password = random.password()

        // Hashear la contraseña antes de guardarla en la base de datos
        const hash = await bcrypt.hash(password, 8)
        const user = await User.create({ name, email, password: hash })

        const newPassword = random.password()
        const newPasswordConfirm = random.password()

        try {
            // Se espera que esta llamada falle con la contraseña incorrecta
            await changeUserPassword(user.id, newPassword, newPassword, newPasswordConfirm)
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.be.instanceOf(CredentialsError)
            expect(error.message).to.equal('wrong credentials')
        }
    })

    
    it('fails on wrong password confirmation', async () => {
       const name = random.name()
        const email = random.email()
        const password = random.password()

        // Hashear la contraseña antes de guardarla en la base de datos
        const hash = await bcrypt.hash(password, 8)
        const user = await User.create({ name, email, password: hash })

        const newPassword = random.password()
        const newPasswordConfirm = random.password()

        try {
            // Se espera que esta llamada falle con la contraseña incorrecta
            await changeUserPassword(user.id, password, newPassword, newPasswordConfirm)
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.be.instanceOf(ContentError)
            expect(error.message).to.equal('new password and its confirmation do not match')
        }
    })


    after(async () => {
        await mongoose.disconnect()
    })
})
