const changeUserEmail = require('./changeUserEmail')

try {
    changeUserEmail('box@size.com','cala@bacin.com', 'cala@bacin.com', '123123123', error =>{
        if(error){
            console.error(error)

            return
        }

        console.log('Email changed')
    })
    
} catch (error) {
    console.error(error)
}