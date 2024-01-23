import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
import { expect } from 'chai'
import random from './helpers/random.js'

import changeUserPassword from './changeUserPassword.js'
import { User } from '../data/models.js'
import { NotFoundError, CredentialsError, ContentError } from './errors.js'

const { ObjectId } = mongoose.Types

describe('changeUserPassword', () =>{
    before(() => mongoose.connect(process.env.PRUEBA_MONGODB_URL))

    beforeEach(() => User.deleteMany())

    it('succeeds on correct password', () =>{
        const name = random.name()
        const email = random.email()
        const password = random.password()

        const newPassword = random.password()
        const newPasswordConfirm = newPassword
        return User.create({name, email, password})
          .then(user =>{

            return changeUserPassword(user.id, password, newPassword, newPasswordConfirm)
               .then(() =>{
                
                expect(user.password).to.equal(password)
                expect(newPassword).to.equal(newPasswordConfirm)
                expect(password).to.not.equal(newPassword)
               })
            
          })
    })

    it('fails on wrong password', () =>{
        const password = random.password()

        const newPassword = random.password()
        const newPasswordConfirm = random.password()

        return changeUserPassword(new ObjectId().toString(), password, newPassword, newPasswordConfirm)
              .then(() => {throw new Error('should not reach this point')})
              .catch(error =>{
                if(error instanceof NotFoundError)
                   expect(error.message).to.equal('user not found')

                else if(error instanceof CredentialsError)
                   expect(error.message).to.equal('Wrong credentials')
                else if(error instanceof ContentError)   
                   expect(error.message).to.equal('New password and its confirmation do not match')
                
                else 
                  // Fail the test with a clear message
                    expect.fail(`Unexpected error type: ${error.constructor.name}`);
            
              })

    })

    after(() => mongoose.disconnect())
})