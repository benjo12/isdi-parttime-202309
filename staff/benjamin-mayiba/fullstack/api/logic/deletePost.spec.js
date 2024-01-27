import dotenv from 'dotenv'
 dotenv.config()
import mongoose from 'mongoose'

import {expect} from 'chai'
import deletePost from './deletePost.js'

import {User, Post} from '../data/models.js'
import random from './helpers/random.js'
import {NotFoundError, ForbiddenError } from './errors.js'

const  {ObjectId} = mongoose.Types

describe('deletePost', () =>{
    before(()=> mongoose.connect(process.env.PRUEBA_MONGODB_URL))
   
    beforeEach(() => User.deleteMany())
   
    it('succeeds on existing user and its posts', () => {
    const name = random.name();
    const email = random.email();
    const password = random.password();
    const image = random.image();
    const text = random.text();

    let createdPost;

    return User.create({ name, email, password })
        .then(user => {
            // Create a post for the user
            return Post.create({ author: user.id, image, text })
                .then(post => {
                    createdPost = post
                    // Delete the post
                    return deletePost(user.id, post.id)
                        .then(() => {
                            // Verify that the post has been deleted
                            return Post.findById(post.id)
                                .then(deletedPost => {
                                    expect(deletedPost).to.not.exist
                                })
                        })
                })
        })
})
   
   it('fails on non-existing user', () => {
    const image = random.image();
    const text = random.text();
    const nonExistingUserId = new ObjectId().toString();
    const postId = new ObjectId().toString();

    return deletePost(nonExistingUserId, postId)
        .then(() => {
            throw new Error('should not reach this point');
        })
        .catch(error => {
            if (error instanceof NotFoundError) {
                expect(error.message).to.equal('user not found');
            }
            if (error instanceof ForbiddenError) {
                expect(error.message).to.equal('you do not have permission to delete this post');
            }
        })
})


after(() => mongoose.disconnect())
})