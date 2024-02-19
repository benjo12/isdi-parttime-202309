import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
import createService from './createService.js'

(async () =>{
   
  await mongoose.connect(process.env.MONGODB_URL)
   
    try{
      const serviceId =   await createService('65cd2bc1b744ba93c2af2011', 'Gym', 'Hay que ponerse en forma')
       
        console.log('service created', serviceId)
   
    }catch(error){
       console.log(error)
    }

})()