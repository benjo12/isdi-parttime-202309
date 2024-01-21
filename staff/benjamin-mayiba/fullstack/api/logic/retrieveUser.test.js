import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'

import retrieveUser from './retrieveUser.js'

mongoose.connect(process.env.TEST_MONGODB_URL)
    .then(() => {
        try {
            retrieveUser('65aae1db78e21a8709d53a47')
                .then(user => console.log('retrieved', user))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))