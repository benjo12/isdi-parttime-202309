import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'

import retrieveUser from './retrieveUser.js'

(async () =>{
    await mongoose.connect(process.env.MONGODB_URL)

    try {
        const user = await retrieveUser('65cd25d856588d95e5a811d2')
        console.log('retrieved', user)
    } catch (error) {
        console.error(error)
    }

})()
