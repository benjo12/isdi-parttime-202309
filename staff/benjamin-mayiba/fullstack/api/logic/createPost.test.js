import mongoose from 'mongoose'

import createPost from './createPost.js'
import { User } from '../data/models.js'

mongoose.connect('mongodb://127.0.0.1:27017/test')
    .then(() => {
        try {
            createPost('65c2b7788c61deb37111c081', 'https://fastly.picsum.photos/id/1061/536/354.jpg?hmac=8cdmqmsElSk7dkolhCRglVqgKnGmq_OjxXZnsThorXc', 'my city!')
                .then(() => console.log('created'))
                .catch(error => console.error(error))
        } catch (error) {   
            console.error(error)
        }
    })
    .catch(error => console.error(error))