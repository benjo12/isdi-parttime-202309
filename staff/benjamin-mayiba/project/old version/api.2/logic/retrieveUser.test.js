import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'

import retrieveUser from './retrieveUser.js'

(async () =>{
    await mongoose.connect(process.env.MONGODB_URL)

    try {
        const user = await retrieveUser('65cd2bc1b744ba93c2af2011')
        console.log('retrieved', user)
    } catch (error) {
        console.error(error)
    }

})()
