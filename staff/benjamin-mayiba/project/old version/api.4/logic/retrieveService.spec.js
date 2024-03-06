import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
import {expect} from 'chai'
import random from './helpers/random.js'
import {User, Service} from '../data/models.js'
import retrieveService from './retrieveService.js'
import { errors } from 'com'

const {NotFoundError} = errors
const { ObjectId } = mongoose.Types

describe('retrieveService', () =>{
    before(async () => await mongoose.connect(process.env.PRUEBA_MONGODB_URL))

    beforeEach(async () => await User.deleteMany())
    beforeEach(async () => await Service.deleteMany())

    it('succeeds on existing user and service', async () =>{
        const name = random.name()
        const email = random.email()
        const password = random.password()

        const nameService1 = random.name()
        const description1 = random.description()

        const nameService2 = random.name()
        const description2 = random.description()

        const user = await User.create({name, email, password})
        const createdService1 = await Service.create({author: user._id, name: nameService1, description: description1})
        const createdService2 = await Service.create({author: user._id, name: nameService2, description: description2})

         const services = await retrieveService(user._id.toString())
         expect(services).to.be.instanceOf(Array)
         expect(services.length).to.equal(2)
          
          // Verificar el primer servicio
         expect(services[0].id).to.be.a('string')
         expect(services[0].name).to.equal(nameService1)
         expect(services[0].description).to.equal(description1)
         
         // Verificar el segundo servicio
         expect(services[1].id).to.be.a('string')
         expect(services[1].name).to.equal(nameService2)
         expect(services[1].description).to.equal(description2)


    })

    it('fails on non-existing user', async () =>{
        const id = new ObjectId().toString()

        try {
            await retrieveService(id)

            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.equal('user not found')
        }
    })

    it('fails on non-existing service', async () =>{
         const name = random.name()
        const email = random.email()
        const password = random.password()

        const user = await User.create({name, email, password})


        try {
            await retrieveService(user._id.toString())

            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.equal('service not found')
        }
    })
})