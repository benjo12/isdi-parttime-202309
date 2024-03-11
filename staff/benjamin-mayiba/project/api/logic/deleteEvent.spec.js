import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
import {expect} from 'chai'
import deleteEvent from './deleteEvent.js'
import random from './helpers/random.js'
import {User,Event, Service} from '../data/models.js'


import { errors } from 'com'

const {NotFoundError} = errors
const { ObjectId } = mongoose.Types

describe('deleteEvent', () =>{
     before(async () => await mongoose.connect(process.env.PRUEBA_MONGODB_URL))

    beforeEach(async () => await User.deleteMany())
    beforeEach(async () => await Event.deleteMany())
    beforeEach(async () => await Service.deleteMany())


    it('succeeds on existing user and event', async ()=>{
        const name = random.name()
        const email = random.email()
        const password = random.password()

        const nameService = random.name()
        const description = random.description()
        
        const date = random.date()
        const time = random.time()

        const user = await User.create({name, email, password})
        const service = await Service.create({author: user._id, name: nameService, description: description})
        const event = await Event.create({user: user._id.toString(), service: service._id.toString(), date: date, time: time})

        await deleteEvent(user._id.toString(), event._id.toString())

        const eventDeleted = await Event.findById(event._id)
        expect(eventDeleted).to.be.null
        expect(user.reminders).to.not.include(event._id.toString())
    })

    it('fails on non-existing events', async() =>{
        const name = random.name()
        const email = random.email()
        const password = random.password()

        const id = new ObjectId().toString()

        const user = await User.create({name, email, password})
        
       
       try {
          await deleteEvent(user._id.toString(), id)
          throw new Error('should not reach this point')
       } catch (error) {
          expect(error).to.be.instanceOf(NotFoundError)
          expect(error.message).to.equal('event not found')
       }

    })

    
    it('fails on non-existing user', async() =>{
        

        const id = new ObjectId().toString()

        const user = new ObjectId().toString()
        
       
       try {
          await deleteEvent(user, id)
          throw new Error('should not reach this point')
       } catch (error) {
          expect(error).to.be.instanceOf(NotFoundError)
          expect(error.message).to.equal('user not found')
       }

    })
})

