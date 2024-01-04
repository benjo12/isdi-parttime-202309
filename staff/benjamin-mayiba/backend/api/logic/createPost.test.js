const mongoose = require('mongoose')
const createPost = require('./createPost')

mongoose.connect('mongodb://127.0.0.1:27017/test')
    .then(()=>{

                try {
                createPost('65898c9a9a021cf5ab44f35a', 'http://image.com/123', 'Hola, Popeye!', error => {
                    if (error) {
                        console.error(error)

                        return
                    }

                    console.log('Post created')
                })
            } catch (error) {
                console.error(error)
            }
    })
    .catch(error => console.error(error))

