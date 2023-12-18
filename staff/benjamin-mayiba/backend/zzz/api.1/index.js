    const fs = require('fs')

    // fs.readFile('./helloworld.txt', 'utf8', (error, content) =>{
    //     if(error){
    //         console.error(error)

    //         return
    //     }

    //     console.log(content)
    // })
    // fs.writeFile('./holamundo.txt', 'Hola, Mundo!', error =>{

    //     if(error){
    //         console.error(error)

    //         return
    //     }

    //     console.log('Saved')

    // } )

    fs.readFile('./users.csv', 'utf8', (error, content) =>{
        if(error){
            console.error(error)

            return
        }

        const users = []

        const lines = content.split('\r\n')
        
        const fields = lines[0].split(',')

        for(let i = 1; i< lines.length; i++){
                const line = lines[i]

                const values = line.split(',')

                const user = {}

                for(const j in fields){

                    const field = fields[j]
                    user[field] = values[j]
                }

                users.push(user)
        }

        console.log(users)
    })


    console.log('continue...')