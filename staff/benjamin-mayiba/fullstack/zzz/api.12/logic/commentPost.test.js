import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
import commentPost from './commentPost.js'

mongoose.connect(process.env.TEST_MONGODB_URL)
         .then(() =>{
             try{
               commentPost('65aae190fb970849c7146d03', '65aae2e86bea9fb8ae40a327', 'Esto va por Miguel y Belen!!')
                      .then(name => console.log('post commented', name))
                      .catch(error => console.error(error))
             
             }catch(error){
                 console.error(error)
             
             }

       })
        .catch(error => console.error(error))



//         import { User, Post } from '../data/models.js'
// import { SystemError, NotFoundError } from './errors.js'
// import validate from './helpers/validate.js'

// function commentPost(userId, postId, comment) {
//     validate.id(userId, 'user id')
//     validate.id(postId, 'post id')
//     validate.text(comment, 'comment')

//     Encontrar el usuario por ID
//     return User.findById(userId)
//         .catch(error => {
//             throw new SystemError(error.message)
//         })
//         .then(user => {
//             if (!user) {
//                 throw new NotFoundError('user not found')
//             }

//             Encontrar el post por ID
//             return Post.findById(postId)
//                 .catch(error => {
//                     throw new SystemError(error.message);
//                 })
//                 .then(post => {
//                     if (!post) {
//                         throw new NotFoundError('post not found')
//                     }

//                     Añadir el comentario al post
//                     post.comments.push(comment)

//                     Guardar el post actualizado y devolver la promesa
//                     return post.save()
//                         .catch(error => {
//                             throw new SystemError(error.message)
//                         })
//                 })
//         })
// }

// export default commentPost
