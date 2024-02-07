import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
import { expect } from 'chai'
import random from './helpers/random.js'

import bcrypt from 'bcryptjs'
import { User } from '../data/models.js'
import changeUserEmail from './changeUserEmail.js'
import { errors } from 'com'
const { NotFoundError, CredentialsError, ContentError } = errors

const { ObjectId } = mongoose.Types

describe('changeUserEmail', () =>{
    before(() => mongoose.connect(process.env.PRUEBA_MONGODB_URL))

    beforeEach(() => User.deleteMany())
    
    it('succeeds on correct email changed', () =>{
        const name = random.name()
        const email = random.email()
        const password = random.password()
        const newEmail = random.email()
        const newEmailConfirm = newEmail


         return bcrypt.hash(password, 8)
            .then(hash => User.create({ name, email, password: hash }))
            .then(user => {
               return changeUserEmail(user.id, newEmail, newEmailConfirm, password)
                     .then(() => {
                        return User.findById(user.id) // Buscar el usuario actualizado en la base de datos
                           .then(updatedUser => {
                                 expect(updatedUser.password).to.equal(user.password)
                                 expect(updatedUser.email).to.equal(newEmail)
                                 expect(updatedUser.email).to.not.equal(email)
                           })
                     })
    })


       
    })

    it('fails on wrong email changed', () =>{
        const password = random.password()
        const newEmail = random.email()
        const newEmailconfirm = random.email()

        return changeUserEmail(new ObjectId().toString(), newEmail, newEmailconfirm, password)
           .then(() => {throw new Error('should not reach this point')})
           .catch(error =>{
              if(error instanceof NotFoundError)
                  expect(error.message).to.equal('user not found')
               else if(error instanceof CredentialsError)
                   expect(error.message).to.equal('wrong credentials')
                else if(error instanceof ContentError)
                     expect(error.message).to.equal('new email and its confirmation do not match')     
                
           })
    })

    after(() => mongoose.disconnect())
})