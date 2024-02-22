import dotenv from 'dotenv'
dotenv.config()

import createEvent from './createEvent.js'
import mongoose from 'mongoose'

(async () =>{
   await mongoose.connect(process.env.MONGODB_URL)

   try {
       // Supongamos que 'date' y 'time' son strings en un formato específico
       await createEvent('65d65acb74fec91ed48814de', '65d4f2fda59da005e452d4a4', '2024-10-20', '11:30');
       console.log('Event created successfully');
   } catch (error) {
       console.log(error);
   }

   // Cerrar la conexión a la base de datos después de haber terminado
   mongoose.disconnect();
})();
