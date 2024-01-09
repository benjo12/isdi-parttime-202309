const mongoose = require('mongoose')

const registerUser = require('./registerUser')

mongoose.connect('mongodb://127.0.0.1:27017/test')
   .then(()=>{
    try {
    registerUser('Bon Gamin', 'bon@gamin.com', '234234234', error => {
        if (error) {
            console.error(error)

            return
        }

        console.log('user registered')
    })
} catch (error) {
    console.log(error)
}

   })
   .catch(error => console.error(error))

