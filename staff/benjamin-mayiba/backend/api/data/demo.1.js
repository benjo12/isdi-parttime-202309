const mongoose = require('mongoose')

const { Schema, model, ObjectId } = mongoose

const user = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    favs: [{
        type: ObjectId,
        ref: 'Post'
    }]

})

const post = new Schema({
    author: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },
    image: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    likes:[{
        type: ObjectId,
        ref: 'User'
    }]
    
})

const User = model('User', user)   
const Post = model('Post', post) 

mongoose.connect('mongodb://127.0.0.1:27017/test')
    .then(() =>{
        // const pepito = new User({name: 'Pepito Grillo', email: 'pepito@grillo.com', password: '123123123'})

        // pepito.save()
        // .then(()=> console.log('user created'))
        // .catch(error => console.error(error))

        // const post = new Post({author: '6586f85b5d7e04abd02973a1', image: 'https://pepito.com/image', text: 'Hola, Pepito!'})
        // post.save()
        // .then(() => console.log('post created'))
        // .catch(error => console.error(error))

        // Post.findById('658716812b64763feed3c7ac')
        //      .then(post =>{
        //         post.likes.push('658716812b64763feed3c7ac')

        //         post.save()
        //         .then(() => console.log('post liked'))
        //         .catch(error => console.log(error))

        //      })
        //      .catch(error => console.error(error))

        
         User.findById('6586f85b5d7e04abd02973a1')
              .then(user =>{
                 user.favs.push('65845e4f5958c7e732ea2839')

                user.save()
                .then(() => console.log('post favorited'))
                .catch(error => console.log(error))

             })
             .catch(error => console.error(error))

        

    })
    .catch(error => console.log(error))