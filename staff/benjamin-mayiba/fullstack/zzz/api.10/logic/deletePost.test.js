import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
import deletePost from './deletePost.js'

mongoose.connect(process.env.TEST_MONGODB_URL)
       .then(() =>{
        try {
            deletePost('65acd73620c13e468093066f', '65acd73620c13e4680930673')
             .then(() => console.log('post deleted'))
             .catch(error => console.error(error))
            
        } catch (error) {
            console.error(error)
        }

       })
       .catch(error => console.error(error))