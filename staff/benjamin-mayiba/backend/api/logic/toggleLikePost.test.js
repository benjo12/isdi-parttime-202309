const mongoose = require('mongoose')

const toggleLikePost =  require('./toggleLikePost')

mongoose.connect('mongodb://127.0.0.1:27017/test')
     .then(()=>{     
        try {
            toggleLikePost('65898c9a9a021cf5ab44f35a', '658acf3c086e86846b984996', error =>{
                if(error){
                    console.error(error)

                    return
                }

                console.log('post like toggled')
            })
        } catch (error) {
            console.error(error)
        }

     })
     .catch(error => console.error(error))
