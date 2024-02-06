import { User, Post } from '../data/models.js'
import { validate, errors } from 'com'
const { NotFoundError, SystemError } = errors


function commentPost(userId, postId, comment){
         validate.id(userId, 'user id')
         validate.id(postId, 'post id')
         validate.text(comment, 'comment')

         return User.findById(userId)
                .catch(error => {throw new SystemError(error.message)})
                .then(user =>{
                    if(!user)
                        throw new NotFoundError('user not found')
                    const userName = user.name

                    return Post.findById(postId)
                        .catch(error => {throw new SystemError(error.message)})
                        .then(post =>{
                            if(!post)
                               throw new NotFoundError('post not found')
                               //userObjectId.toString() === postId
                                
                         const commentText = {
                                    author: userId,
                                    name: userName,
                                    text: comment
                                };
                          post.comments.push(commentText)
                            

                           return post.save()
                            .catch(error => {throw new SystemError(error.message)})
                            
                        })
                        

                })
                //.then(user => {user.name })

}
export default commentPost