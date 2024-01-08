const retrievePosts = require('./retrievePosts.js')

try {
    retrievePosts('730thx7n4n4', (error, posts) => {
        if (error) {
            console.error(error)

            return
        }

        console.log('retrieved', posts)
    })
} catch (error) {
    console.error(error)
}