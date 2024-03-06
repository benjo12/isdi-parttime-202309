import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
import {expect} from 'chai'
import random from './helpers/random.js'
import {User, Service, Event} from '../data/models.js'
import retrieveEvent from './retrieveEvent.js'
import { errors } from 'com'

const {NotFoundError} = errors
const { ObjectId } = mongoose.Types

describe('retrieveEvent', () =>{
    before(async () => await mongoose.connect(process.env.PRUEBA_MONGODB_URL))

    beforeEach(async () => await User.deleteMany())
    beforeEach(async () => await Service.deleteMany())
    beforeEach(async () => await Event.deleteMany())



    it('succeeds on existing user and event', async () =>{
        const name = random.name()
        const email = random.email()
        const password = random.password()

        const date1 = random.date()
        const time1 = random.time()

        const date2 = random.date()  
        const time2 = random.time()

        const nameService = random.name()
        const description = random.description()

        const user = await User.create({name, email, password})
        const serviceId = await Service.create({author: user._id, name: nameService, description: description})
        const event1 = await Event.create({user: user._id.toString(), service: serviceId, date: date1, time: time1})
        const event2 = await Event.create({user: user._id.toString(), service: serviceId, date: date2, time: time2})

        const events = await retrieveEvent(user._id.toString())
        expect(events).to.be.instanceOf(Array)
        expect(events.length).to.equal(2)
        
        
        expect(events[0].name).to.equal(nameService)
        expect(events[0].date).to.equal(date1)
        expect(events[0].time).to.equal(time1)

        
        expect(events[1].name).to.equal(nameService)
        expect(events[1].date).to.equal(date2)
        expect(events[1].time).to.equal(time2)
    })

    
    it('fails on non-existing user', async () =>{
        const id = new ObjectId().toString()

        try {
            await retrieveEvent(id)

            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.equal('user not found')
        }
    })
})