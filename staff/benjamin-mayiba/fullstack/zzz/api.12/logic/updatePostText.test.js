 import dotenv from 'dotenv'
    dotenv.config()

    import mongoose from 'mongoose'
    import updatePostText from './updatePostText.js'

mongoose.connect(process.env.TEST_MONGODB_URL)
    .then(() =>{
          try{
              updatePostText('65aae2180464dc7255686602', '65aae3f530032d765d0f38c9', 'aguacate de temporada')
                 .then(() => console.log('text updated'))
                 .catch(error => console.error(error))
         
          }catch(error){
             
            console.error(error)
         
          }

     })
     .catch(error => console.error(error))
