import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
import deleteEvent from './deleteEvent.js'

(async () =>{
     await mongoose.connect(process.env.MONGODB_URL)
   
    try{
      await deleteEvent('65df88309553a9a72adf53a1', '65e1cf5a8a130d8297fad0ee')
        console.log('event deleted')
    }catch(error){
      console.log(error)
    }

})()