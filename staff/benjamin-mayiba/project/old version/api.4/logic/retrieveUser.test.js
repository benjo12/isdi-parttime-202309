import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'

import retrieveUser from './retrieveUser.js'

(async () =>{
    await mongoose.connect(process.env.MONGODB_URL)

    try {
        const user = await retrieveUser('65df870db9cc2e56782c467e')
        console.log('retrieved', user)
    } catch (error) {
        console.error(error)
    }

})()
