import mongoose from 'mongoose'

import retrievePosts from './retrievePosts.js'

mongoose.connect('mongodb://127.0.0.1:27017/test')
    .then(() => {
        try {
            retrievePosts('65aeb77a9583199bf5fd6d99')
                .then(posts => {
                    console.log('retrieved posts', posts)
                })
                .catch(error => {
                    console.error(error)
                })
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))