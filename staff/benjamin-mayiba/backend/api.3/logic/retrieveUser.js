const CSV = require('../utils/CSV')
const {validateText, validateFunction } = require('../utils/validators')

function retrieveUser(userId, callback){
  validateText(userId, 'user id')
  validateFunction(callback, 'callback')

  CSV.loadAsObject('./data/users.csv', (error, users)=>{
    if(error){
        callback(error)

        return
    }
    let user = users.find(user => user.id === userId) 
    
    if(!user){
        callback(new Error('user not found'))
        return
    }
    callback(null, user)
  })
}

module.exports = retrieveUser