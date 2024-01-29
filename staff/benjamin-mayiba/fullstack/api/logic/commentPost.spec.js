import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
import { expect } from 'chai'
import { NotFoundError } from './errors.js'
import random from './helpers/random.js'
import commentPost from './commentPost.js'
import {User, Post } from '../data/models.js'

const {ObjectId } = mongoose.Types


describe('commentPost', () =>{
    before(() => mongoose.connect(process.env.PRUEBA_MONGODB_URL))
   
    beforeEach(() => User.deleteMany())
   
    it('succeeds on existing user and post', () => {
    const name = random.name();
    const email = random.email();
    const password = random.password();

    const image = random.image();
    const text = random.text();
    const comment = random.text();

    // Crear un nuevo usuario
    return User.create({ name, email, password })
        .then(user => {
            // Crear un nuevo post con el usuario recién creado
            return Post.create({ author: user.id, image, text })
                .then(post => {
                    // Agregar un comentario al post recién creado
                    return commentPost(user.id, post.id, comment)
                        .then(postWithComment => {
                            // Verificar que se haya agregado el comentario correctamente
                            expect(postWithComment.comments.length).to.be.greaterThan(0);
                            // Verificar que el último comentario agregado sea igual al comentario creado
                            expect(postWithComment.comments[postWithComment.comments.length - 1].text).to.equal(comment);
                        });
                });
        });
});

   
   it('fails on non-existing user', () =>{
        const comment = random.text()
        const userId = new ObjectId().toString()
        const postId = new ObjectId().toString()

        return commentPost(userId, postId, comment)
              .then(() => {throw new Error('should not reach this point')})
              .catch(error =>{
                expect(error).to.be.instanceof(NotFoundError)
                expect(error.message).to.equal('user not found')
              })
   })

   it('fails on non-existing post', () =>{
        
        const comment = random.text()
        const postId = new ObjectId().toString()

        return User.create({name: random.name(), email: random.email, password: random.password()})
                 .then(user =>{
                     return commentPost(user.id, postId, comment)
                         .then(() => {throw new Error('should not reach this point')})
                         .catch(error =>{
                                expect(error).to.be.instanceof(NotFoundError)
                                expect(error.message).to.equal('post not found')
                         })
                         
                 })
   })
 after(() => mongoose.disconnect())
})