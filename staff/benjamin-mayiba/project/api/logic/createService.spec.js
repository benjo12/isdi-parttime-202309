import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
import {expect} from 'chai'
import random from './helpers/random.js'
import {User, Service} from '../data/models.js'
import createService from './createService.js'
import { errors } from 'com'

const {NotFoundError} = errors
const { ObjectId } = mongoose.Types

describe('createService', () =>{
    before(async () => await mongoose.connect(process.env.PRUEBA_MONGODB_URL))

    beforeEach(async ()=> await User.deleteMany())

    it('succeeds on existing user', async () =>{
        const name = random.name()
        const email = random.email()
        const password = random.password()

        const nameService = random.name()
        const description = random.description()

        const user = await User.create({name, email, password})
        const serviceId = await createService(user.id, nameService, description)
        const service = await Service.findOne({author: user.id})
        expect(service.name).to.equal(nameService)
        expect(service.description).to.equal(description)

    })

    it('fails on non-existing user', async () =>{
        const nameService = random.name()
        const description = random.description()
        const id = new ObjectId().toString()

        try {
            await createService(id, nameService, description)
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.equal('user not found')
        }
    })
})