import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
import {expect} from 'chai'
import random from './helpers/random.js'
import {User, Service,Event} from '../data/models.js'
import createEvent from './createEvent.js'
import { errors } from 'com'

const {NotFoundError} = errors
const { ObjectId } = mongoose.Types

describe('createEvent', () =>{
     before(async () => await mongoose.connect(process.env.PRUEBA_MONGODB_URL))

    beforeEach(async ()=> await User.deleteMany())

    it('succeeds on existing user and service', async () =>{

        const name = random.name()
        const email = random.email()
        const password = random.password()

        const nameService = random.name()
        const description = random.description()

        const date = random.date()
        const time = random.time()

        const user = await User.create({name, email, password})
        const service = await Service.create({author: user._id, name: nameService, description: description})

        // Convierte el ObjectId a una cadena de texto
        const serviceId = service._id.toString();

        await createEvent(user.id, serviceId, date, time)

        const event = await Event.findOne({user: user.id, service: serviceId})
        expect(event.user.toString()).to.equal(user.id)
        expect(event.service.toString()).to.equal(serviceId)
        expect(event.date).to.equal(date)
        expect(event.time).to.equal(time)

    })

    it('fails on non-existing user', async () =>{
        const id = new ObjectId().toString()
        const idService = new ObjectId().toString()

        const date = random.date()
        const time = random.time()

        try {
            await createEvent(id, idService, date, time)
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.be.equal('user not found')
        }


    })

     it('fails on non-existing service', async () =>{
        const name = random.name()
        const email = random.email()
        const password = random.password()

        const idService = new ObjectId().toString()

        const date = random.date()
        const time = random.time()

        const user = await User.create({name, email, password})

        try {
            await createEvent(user._id.toString(), idService, date, time)
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.be.equal('service not found')
        }


    })
})