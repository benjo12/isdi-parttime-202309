import dotenv from 'dotenv'
dotenv.config()

import createEvent from './createEvent.js'
import mongoose from 'mongoose'

(async () =>{
   await mongoose.connect(process.env.MONGODB_URL)

   try {
       // Supongamos que 'date' y 'time' son strings en un formato específico
       await createEvent('65cd2bc1b744ba93c2af2011', '65d3a0e8eaee7024897bfbf9', '2024-02-20', '14:30');
       console.log('Event created successfully');
   } catch (error) {
       console.log(error);
   }

   // Cerrar la conexión a la base de datos después de haber terminado
   mongoose.disconnect();
})();
