const retrievePosts = require('./retrievePosts.js')

try {
    retrievePosts('6ttz1tptn2c0', (error, posts) => {
        if (error) {
            console.error(error)

            return
        }

        console.log('retrieved', posts)
    })
} catch (error) {
    console.error(error)
}