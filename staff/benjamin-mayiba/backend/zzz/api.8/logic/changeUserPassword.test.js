const changeUserPassword = require('./changeUserPassword')

try {
    changeUserPassword('zana@horia.com', '123123123', '123123123', '234234234', error =>{

           if(error){
            console.error(error)

            return
           }

           console.log('Password changed')
    })
    
} catch (error) {
    console.error(error)
}