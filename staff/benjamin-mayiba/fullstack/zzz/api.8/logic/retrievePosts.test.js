import mongoose from 'mongoose'

import retrievePosts from './retrievePosts.js'

 mongoose.connect("mongodb://127.0.0.1:27017/test")
    .then(()=>{
       try {
            retrievePosts('65898c9a9a021cf5ab44f35a', (error, posts) =>{
                if(error){
                    console.error(error)
                    return
                }
                console.log('retrieved posts', posts)
            })
        
       } catch (error) {
          console.error(error)
       }
    })
    .catch(error => console.error(error))