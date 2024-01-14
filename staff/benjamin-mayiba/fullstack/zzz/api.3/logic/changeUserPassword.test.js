const mongoose = require('mongoose')
const changeUserPassword = require('./changeUserPassword')

mongoose.connect('mongodb://127.0.0.1:27017/test')
         .then(() =>{

                try{

                    changeUserPassword('bon@gamin.com', '234234234', '234234234', '123123123', error =>{
                        if(error){
                            console.error(error)
                            return
                        }
                        console.log('Password changed')
                    })          
                }catch(error){

                    console.error(error)
                }
       
          })
          .catch(error =>console.error(error))