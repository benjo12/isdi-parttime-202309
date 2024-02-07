import mongoose from 'mongoose'

import authenticateUser from './authenticateUser.js'

mongoose.connect('mongodb://127.0.0.1:27017/test')
    .then(() => {
        try {
            authenticateUser('que@rubin.com','234234234')
                .then(userId => {
                    console.log('user authenticated', userId)
                })
                .catch(error => console.error(error))
        } catch (error) {
            console.log(error)
        }
    })
    .catch(error => console.error(error))