import {User, Post } from '../data/models.js'
import validate from './helpers/validate.js'
import { SystemError, NotFoundError } from './errors.js'

function deletePost(userId, postId){
       validate.id(userId, 'user id')
       validate.id(postId, 'post id')

       return User.findById(userId)
          .catch(error => {throw new SystemError(error.message)})
          .then(user =>{
            if(!user)
               throw new NotFoundError('user not found')
               
               return Post.deleteOne({ _id: postId })
                  .then(() => {})
                 
          })
}
export default deletePost