import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
import createService from './createService.js'

(async () =>{
   
  await mongoose.connect(process.env.MONGODB_URL)
   
    try{
      const serviceId =   await createService('65df88309553a9a72adf53a1', 'Baile', 'Mover el cuerpo')
       
        console.log('service created', serviceId)
   
    }catch(error){
       console.log(error)
    }

})()