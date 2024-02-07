import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'

import retrieveUser from './retrieveUser.js'

(async () => {
    await mongoose.connect(process.env.TEST_MONGODB_URL)

    try {
        const user = await retrieveUser('65c3e1cb25fc79c7ddb55dad')

        console.log('retrieved', user)
    } catch (error) {
        console.error(error)
    }
})()