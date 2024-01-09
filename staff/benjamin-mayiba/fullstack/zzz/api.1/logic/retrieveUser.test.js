const retrieveUser = require('./retrieveUser')

try {
    retrieveUser('730thx7n4n4', (error, user) => {
        if (error) {
            console.error(error)

            return
        }

        console.log('retrieved', user)
    })
} catch (error) {
    console.error(error)
}