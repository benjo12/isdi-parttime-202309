import dotenv from 'dotenv'
dotenv.config()

import createEvent from './createEvent.js'
import mongoose from 'mongoose'

(async () =>{
   await mongoose.connect(process.env.MONGODB_URL)

   try {
       // Supongamos que 'date' y 'time' son strings en un formato específico
       await createEvent('65dfa80449d98300510faaa7', '65ea2c97f206789c90bfb622', '2024-03-10', '17:30');
       console.log('Event created successfully');
   } catch (error) {
       console.log(error);
   }

   // Cerrar la conexión a la base de datos después de haber terminado
   mongoose.disconnect();
})();
