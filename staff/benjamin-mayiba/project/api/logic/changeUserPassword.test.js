import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'
import changeUserPassword from './changeUserPassword.js'

(async () =>{
    await mongoose.connect(process.env.MONGODB_URL)
   
    try{
       await changeUserPassword('65df84fab4327e0d70c56111', '234234234', '123123123', '123123123')
         console.log('password succefully changed')
                     
    }catch(error){
      console.log(error)
    }
   
})()
