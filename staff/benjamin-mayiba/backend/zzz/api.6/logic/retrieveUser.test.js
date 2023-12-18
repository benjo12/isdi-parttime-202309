const retrieveUser = require('./retrieveUser')

try {
    retrieveUser('6ttz1tptn2c0', (error, user) => {
        if (error) {
            console.error(error)

            return
        }

        console.log('retrieved', user)
    })
} catch (error) {
    console.error(error)
}