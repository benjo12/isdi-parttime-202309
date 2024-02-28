import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
import retrieveEvent from './retrieveEvent.js'

(async () =>{
  await mongoose.connect(process.env.MONGODB_URL)
   
    try{
       const event = await retrieveEvent('65cd25d856588d95e5a811d2', '65d3a0e8eaee7024897bfbf9')
       console.log('event retrieved:', event)
    }catch(error){
        console.log(error)
    }
   
     // Cerrar la conexión a la base de datos después de haber terminado
  // mongoose.disconnect();

})()