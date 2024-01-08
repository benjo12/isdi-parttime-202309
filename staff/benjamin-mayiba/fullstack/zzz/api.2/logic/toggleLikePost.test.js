const toggleLikePost =  require('./toggleLikePost')

try {
    toggleLikePost('2g7e6f4id6m8', '1h0mciutqx6o', error =>{
        if(error){
            console.error(error)

            return
        }

        console.log('post like toggled')
    })
} catch (error) {
    console.error(error)
}