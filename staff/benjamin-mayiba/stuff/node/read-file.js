const fs = require('fs')

fs.readFile('./helloworld.txt', 'utf8', (error, content) => {
    debugger
    if (error) {
        console.error('ERROR', error.message)

        return
    }

    console.log(content)
})

console.log('continue...')