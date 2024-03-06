import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
import deleteService from './deleteService.js'

(async () =>{
     await mongoose.connect(process.env.MONGODB_URL)
   
    try{
      await deleteService('65df88309553a9a72adf53a1', '65e1cf30225b4ac43864a665')
        console.log('service deleted')
    }catch(error){
      console.log(error)
    }

})()