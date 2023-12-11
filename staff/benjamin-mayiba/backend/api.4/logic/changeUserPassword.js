const CSV = require('../utils/CSV')
const {validateText, validateFunction } = require('../utils/validators')

function changeUserPassword(email, newPassword, newPasswordConfirm, password, callback){
              validateText(email, 'email')
              validateText(newPassword, 'new password')
              validateText(newPasswordConfirm, 'new password confirm')
              validateText(password, 'password')
              validateFunction(callback, 'callback')

              CSV.loadAsObject('./data/users.csv', (error, users)=>{
                          if(error){
                            callback(error)

                            return
                          }

                          let user = users.find(user => user.email === email)

                          if(!user || user.password !== password){
                            callback(new Error('wrong credentials'))
                            return
                          }

                          if(newPassword !== newPasswordConfirm ){
                            callback(new Error('new password and its confirmation do not match'))
                          }

                          users = users.filter(user => user.email !== email)

                          user.password = newPassword

                          users.push(user)

                          CSV.saveFromObject('./data/users.csv', users, error =>{
                                 if(error){

                                    callback(error)
                                 }

                                 callback(null)
                          })


              })

}

module.exports = changeUserPassword