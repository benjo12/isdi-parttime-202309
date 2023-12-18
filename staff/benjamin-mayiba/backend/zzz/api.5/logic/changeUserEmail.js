const JSON = require('../utils/JSON')

const {validateText, validateFunction } = require('../utils/validators')

function changeUserEmail(email, newEmail, newEmailConfirm , password, callback){
    validateText(email, 'email')
    validateText(newEmail, 'new email')
    validateText(newEmailConfirm, 'new email confirm')
    validateFunction(callback, 'callback')

    JSON.parseFromFile('./data/users.json', (error, users) =>{

        if(error){
            callback(error)
            return
        }

        let user = users.find(user => user.email === email)

        if(!user || user.password !== password){
            callback(new Error('wrong credentials'))

            return
        }

        if(newEmail !== newEmailConfirm){

            callback(new Error('new email and its confirmation do not match'))

            return
        }

        // Eliminar el antiguo objeto de usuario del array
        users = users.filter(user => user.email !== email)

        user.email = newEmail

        users.push(user)

        JSON.stringifyToFile('./data/users.json', users, error =>{

            if(error){
                callback(error)

                return
            }

            callback(null)
        })

    })

}

module.exports = changeUserEmail