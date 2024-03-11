import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
import changeUserEmail from './changeUserEmail.js'

(async () =>{
    await mongoose.connect(process.env.MONGODB_URL)
   
    try{
       await changeUserEmail('65dfa80449d98300510faaa7', 'bon@gamin.com','bon@gamin.com', '123123123')
         console.log('Email changed')
                     
    }catch(error){
      console.log(error)
    }
   
})()
