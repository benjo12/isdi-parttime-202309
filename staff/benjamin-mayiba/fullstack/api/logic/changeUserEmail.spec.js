import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
import { expect } from 'chai'
import random from './helpers/random.js'

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

        return User.create({name, email, password})
           .then(user =>{
                return changeUserEmail(user.id, newEmail, newEmailConfirm, password)
                   .then(() =>{
                      expect(user.password).to.equal(password)
                      expect(newEmail).to.equal(newEmailConfirm)
                      expect(email).to.not.equal(newEmail)
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
                   expect(error.message).to.equal('Wrong credentials')
                else if(error instanceof ContentError)
                     expect(error.message).to.equal('new email and its confirmation do not match')     
                else 
                  // Fail the test with a clear message
                    expect.fail(`Unexpected error type: ${error.constructor.name}`); 
           })
    })

    after(() => mongoose.disconnect())
})