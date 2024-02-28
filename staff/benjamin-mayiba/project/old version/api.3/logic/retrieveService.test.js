import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
import retrieveService from './retrieveService.js'

(async () =>{
  await mongoose.connect(process.env.MONGODB_URL)
   
    try{
       const service = await retrieveService('65cd25d856588d95e5a811d2')
       console.log('service retrieved:', service)
    }catch(error){
        console.log(error)
    }
   
     // Cerrar la conexión a la base de datos después de haber terminado
   mongoose.disconnect();

})()