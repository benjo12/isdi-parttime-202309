import dotenv from 'dotenv'
dotenv.config()

import { expect } from 'chai'
import mongoose from 'mongoose'
import retrieveUserPosts from './retrieveUserPosts.js'
import { User, Post } from '../data/models.js'
import random from './helpers/random.js'
import { errors } from 'com'

const { NotFoundError } = errors

const { ObjectId } = mongoose.Types

describe('retrieveUserPosts', () => {
    before(() => mongoose.connect(process.env.PRUEBA_MONGODB_URL))
   
    beforeEach(() => User.deleteMany())
   
    it('succeeds on existing user and posts', () => {
        const name = random.name()
        const email = random.email()
        const password = random.password()
       
        return User.create({name, email, password})    
            .then(user => {
                const posts = [
                    {
                        author: user.id,
                        image: random.image(),
                        text: random.text()
                    },
                    {
                        author: user.id,
                        image: random.image(),
                        text: random.text()
                    }
                ]

                return Post.create(posts)
                    .then(() => retrieveUserPosts(user.id))
                    .then(posts => {
                        expect(posts).to.exist
                        expect(posts).to.be.instanceOf(Array)  
                        expect(posts).to.have.lengthOf(2)  
                       
                        posts.forEach(post => {
                            expect(post.author.id).to.equal(user.id)
                        })
                    })
            })
    })
   
    it('fails on non-existing user', () => {
        return retrieveUserPosts(new ObjectId().toString())
            .then(posts => {
                throw new Error('should not reach this point')
            })
            .catch(error => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('user not found')
            })
    })
   
    after(() => mongoose.disconnect())
})
