import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
import retrieveEvent from './retrieveEvent.js'

(async () =>{
  await mongoose.connect(process.env.MONGODB_URL)
   
    try{
       const event = await retrieveEvent('65cd2bc1b744ba93c2af2011', '65d3a0e8eaee7024897bfbf9')
       console.log('event retrieved:', event)
    }catch(error){
        console.log(error)
    }
   
     // Cerrar la conexión a la base de datos después de haber terminado
  // mongoose.disconnect();

})()