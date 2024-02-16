import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'
import authenticateUser from './authenticateUser.js'

(async () =>{
    await mongoose.connect('mongodb://127.0.0.1:27017/project')
   
    try{
      const userId = await authenticateUser('ben@jamin.com', '123123123')
                     console.log('user authenticated', userId)
                     
    }catch(error){
      console.log(error)
    }
   
})()
