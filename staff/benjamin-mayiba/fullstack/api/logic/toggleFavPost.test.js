import mongoose from 'mongoose'

import toggleFavPost from './toggleFavPost.js'

mongoose.connect('mongodb://127.0.0.1:27017/test')
        .then(()=>{
          try{
              toggleFavPost('65898c9a9a021cf5ab44f35a', '658b084c4893a653ea1ee52b', error =>{
                 if(error){
                 console.error(error)
                     return
                 }
              console.log('post favorited')
              } )
         
          }catch(error){
           console.error(error)
          }


       })
       .catch(error => console.error(error))
             