import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'

import changeUserPassword from './changeUserPassword.js'

mongoose.connect(process.env.TEST_MONGODB_URL)
  .then(() =>{
    try{
        changeUserPassword('65c3e1cb25fc79c7ddb55dad', '234234234', '123123123', '123123123')
          .then(() => console.log('Password changed'))
          .catch(error => console.error(error))
    }catch(error){
       console.error(error)
    }

  })
  .catch(error => console.error(error))