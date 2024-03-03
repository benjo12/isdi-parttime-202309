import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
import {expect} from 'chai'
import random from './helpers/random.js'
import {User} from '../data/models.js'
import retrieveUser from './retrieveUser.js'
import { errors } from 'com'

const {NotFoundError} = errors
const { ObjectId } = mongoose.Types

describe('retrieveUser', () =>{
   before(async ()=> await mongoose.connect(process.env.PRUEBA_MONGODB_URL))

   beforeEach(async () => await User.deleteMany())

   it('succeeds on existing user', async () =>{
        const name = random.name()
        const email = random.email()
        const password = random.password()

       const userCreated =  await User.create({name, email, password})
       const user = await retrieveUser(userCreated.id)
       expect(user).to.exist
       expect(user.name).to.equal(name)
       expect(user.email).to.be.undefined
       expect(user.password).to.be.undefined
       expect(user.id).to.be.undefined
   })

   it('fails on non-existing user', async () =>{
     try {
        await retrieveUser(new ObjectId().toString())
        throw new Error('should not reach this point')
     } catch(error) {
        expect(error).to.be.instanceOf(NotFoundError)
        expect(error.message).to.equal('user not found')
     }

   })

})
