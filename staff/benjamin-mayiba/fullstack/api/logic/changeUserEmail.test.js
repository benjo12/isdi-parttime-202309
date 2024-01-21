import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
import changeUserEmail from './changeUserEmail.js'

mongoose.connect(process.env.TEST_MONGODB_URL)
         .then(() =>{
            try{
              changeUserEmail('65aae1db78e21a8709d53a47', 'bon@gamin.com','bon@gamin.com', '234234234')
                     .then(() => console.log('Email changed'))
                      .catch(error => console.error(error))                   
            }catch(error){
                console.error(error)
            }
       
          })
          .catch(error =>console.error(error))