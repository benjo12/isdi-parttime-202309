const createPost = require('./createPost')

try {
    createPost('730thx7n4n4', 'https://cdn2.vectorstock.com/i/1000x1000/81/46/hello-world-code-vector-22928146.jpg', 'Hello, World!', error => {
        if (error) {
            console.error(error)

            return
        }

        console.log('created')
    })
} catch (error) {
    console.error(error)
}