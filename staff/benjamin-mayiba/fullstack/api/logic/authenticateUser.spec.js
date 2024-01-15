const mongoose = require('mongoose')

const authenticateUser = require('./authenticateUser')

const { SystemError, NotFoundError, CredentialsError } = require('./errors')

describe('authenticateUser', () => {
    let expect

    before(() =>
        import('chai')
            .then(chai => expect = chai.expect)
            .then(() => mongoose.connect('mongodb://127.0.0.1:27017/test'))
    )

    it('succeeds on correct credentials', done => {
        authenticateUser('le@chuga.com', '123123123', (error, userId) => {
            if (error) {
                done(error)

                return
            }

            expect(userId).to.be.a('string')
            expect(userId).to.have.lengthOf(24)
            expect(userId).to.equal('658499c142b60911811021e9')

            done()
        })
    })

    it('fails on wrong email', done => {
        debugger
        authenticateUser('le@chuga2.com', '123123123', (error, userId) => {
            try {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('user not found')
                expect(userId).to.be.undefined

                done()
            } catch (error) {
                done(error)
            }
        })
    })

    after(() => mongoose.disconnect())
})