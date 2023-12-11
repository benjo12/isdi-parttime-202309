const retrieveUser = require('./retrieveUser')

try {
    retrieveUser('amhkljhnhc4', (error, user) =>{
     if(error){
        console.error(error)

        return
     }
     console.log('user found', user)
    })
    
} catch (error) {
    console.log(error)
}