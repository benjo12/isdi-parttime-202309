import mongoose from 'mongoose'
import { expect } from 'chai'

import authenticateUser from './authenticateUser.js'
import { SystemError, NotFoundError, CredentialsError } from './errors.js'

describe('authenticateUser', () => {
    before(() => mongoose.connect('mongodb://127.0.0.1:27017/test'))

    it('succeeds on correct credentials', done => {
        // debugger
        authenticateUser('le@chuga.com', '123123123', (error, userId) => {
            if (error) {
                done(error)

                return
            }

            try {
                expect(userId).to.be.a('number')
                expect(userId).to.have.lengthOf(24)
                expect(userId).to.equal('6589723a2f54e0241e364128')

                done()
            } catch (error) {
                done(error)
            }
        })
    })

    it('fails on wrong email', done => {
        // debugger
        authenticateUser('le@chuga2.com', '123123123', (error, userId) => {
            try {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal(' user not found')
                expect(userId).to.be.undefined

                done()
            } catch (error) {
                done(error)
            }
        })
    })

    after(() => mongoose.disconnect())
})