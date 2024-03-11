import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
import retrieveEvent from './retrieveEvent.js'

(async () =>{
  await mongoose.connect(process.env.MONGODB_URL)
   
    try{
       const event = await retrieveEvent('65df870db9cc2e56782c467e')
       console.log('event retrieved:', event)
    }catch(error){
        console.log(error)
    }
   
     // Cerrar la conexión a la base de datos después de haber terminado
  // mongoose.disconnect();

})()