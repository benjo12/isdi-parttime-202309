import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
import retrieveUserPosts from './retrieveUserPosts.js'



mongoose.connect(process.env.TEST_MONGODB_URL)
    .then(() =>{
        try{
            retrieveUserPosts('65aae1db78e21a8709d53a47')
                .then(posts => console.log('posts found', posts))
                .catch(error => console.error(error))
        }catch(error){
             console.error(error)
        }
    })
    .catch(error => console.error(error))