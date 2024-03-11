import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
import {expect} from 'chai'
import deleteService from './deleteService.js'
import random from './helpers/random.js'
import {User,Event, Service} from '../data/models.js'


import { errors } from 'com'

const {NotFoundError} = errors
const { ObjectId } = mongoose.Types

describe('deleteService', () =>{
    before(async () => await mongoose.connect(process.env.PRUEBA_MONGODB_URL))

    beforeEach(async () => await User.deleteMany())
    beforeEach(async () => await Event.deleteMany())
    beforeEach(async () => await Service.deleteMany())

    it('succeeds on existing user and service', async() =>{
        const name = random.name()
        const email = random.email()
        const password = random.password()

        const nameSerice = random.name()
        const description = random.description()

        const date = random.date()
        const time = random.time()

        const user = await User.create({name, email, password})
        const service = await Service.create({author: user._id, name: nameSerice, description: description})
        const event = await Event.create({user: user._id.toString(), service: service._id.toString(), date: date, time: time})
        
        await deleteService(user._id.toString(), service._id.toString())
        const serviceDeleted = await Service.findById(service._id)
        const eventDeleted = await Event.findById(event._id)
        
        expect(serviceDeleted).to.be.null
        expect(eventDeleted).to.be.null
        expect(user.reminders).to.not.include(event._id.toString())
    })

    it('fails on non-existing service', async() =>{
        const name = random.name()
        const email = random.email()
        const password = random.password()

        const serviceId = new ObjectId().toString()

        const user = await User.create({name, email, password})

        try {
            await deleteService(user._id.toString(), serviceId)
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.equal('service not found')
        }
    })

})