const mongoose = require('mongoose')
const changeUserEmail = require('./changeUserEmail')

mongoose.connect('mongodb://127.0.0.1:27017/test')
         .then(() =>{
            try{
              changeUserEmail('le@roy.com', 'bon@gamin.com','bon@gamin.com', '234234234', error =>{
                     if(error){
                     console.error(error)
                         return
                     }
                console.log('Email changed')
              })
           
            }catch(error){

                console.error(error)
            }
       
          })
          .catch(error =>console.error(error))