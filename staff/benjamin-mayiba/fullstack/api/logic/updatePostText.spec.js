import dotenv from 'dotenv'
    dotenv.config()

   import mongoose from 'mongoose'
   import {expect } from 'chai'
  import updatePostText from './updatePostText.js'
  import random from './helpers/random.js'
  import {User, Post } from '../data/models.js'

const { ObjectId } = mongoose.Types
  import {NotFoundError} from './errors.js'

describe('updatePostText', () =>{
    before(() => mongoose.connect(process.env.PRUEBA_MONGODB_URL))
   
    beforeEach(() => User.deleteMany())
   
    it('succeeds on existing user and post', () =>{
          const name = random.name()
          const email = random.email()
          const password = random.password()
         
          const image = random.image()
          const text = random.text()
          const newText = random.text()
         
          return User.create({name, email, password})
                     .then(user =>{
                         return Post.create({author: user.id, image, text})
                                     .then(post =>{
                                             return updatePostText(user.id, post.id, newText)
                                                     return Post.findById(post.id)
                                                            .then(post =>{
                                                            expect(post.text).to.equal(newText)
                                                            expect(post.author).to.equal(user.id)
                                                        })
                         })
                     })
    })
   
    it('fails on non-existing post', () =>{
           const text = random.text()
        //    const userId = new ObjectId().toString()
           const postId = new ObjectId().toString()
          return User.create({ name: random.name(), email: random.email(), password: random.password() })
                   .then(user =>{
                    return updatePostText(user.id , postId, text)
                        .then(() => {throw new Error('should not reach this point')})
                        .catch(error =>{
                            expect(error).to.be.instanceof(NotFoundError)
                            expect(error.message).to.equal('post not found')
                        })
                   })
           
    })
   
    it('fails on non-existing user', () =>{
           const text = random.text()
           const userId = new ObjectId().toString()
           const postId = new ObjectId().toString()
           
           return updatePostText(userId , postId, text)
                .then(() => {throw new Error('should not reach this point')})
                .catch(error =>{
                     expect(error).to.be.instanceof(NotFoundError)
                     expect(error.message).to.equal('user not found')
               })
    })
after(() => mongoose.disconnect())
})