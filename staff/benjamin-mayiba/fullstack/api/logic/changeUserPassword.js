const {User} = require("../data/models")
const {validateText, validateFunction} = require("./helpers/validators")
const {SystemError, NotFoundError, ContentError} = require("./errors")

function changeUserPassword(email, newPassword, newPasswordConfirm, password, callback){
  validateText(email, 'email')
  validateText(newPassword, 'new password')
  validateText(newPasswordConfirm, 'new password confirm')
  validateText(password, 'password')
  validateFunction(callback, 'callback')
              
    User.findOne({email})
        .then(user =>{
           if(!user){
           callback(new NotFoundError('user not found'))
               return
           }
            if(user.password !== password){
                callback(new ContentError('wrong credentials'))
                return
            }
            if(newPassword !== newPasswordConfirm ){
              callback(new ContentError('new password do not match its confirmation'))
                return
            }
           
             user.password = newPassword
             user.save()
             .then(() => callback(null))
              .catch(error => callback(new SystemError(error.message)))
         })
        .catch(error => callback(new SystemError(error.message)))

}

module.exports = changeUserPassword