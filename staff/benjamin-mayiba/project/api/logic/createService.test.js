import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
import createService from './createService.js'

(async () =>{
   
  await mongoose.connect(process.env.MONGODB_URL)
   
    try{
      const serviceId =   await createService('65cd25d856588d95e5a811d2', 'Yoga', 'Mente pura, cuerpo sano')
       
        console.log('service created', serviceId)
   
    }catch(error){
       console.log(error)
    }

})()