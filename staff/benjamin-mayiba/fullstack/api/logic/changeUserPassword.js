const {User} = require("../data/models")
const validate = require('./helpers/validate')
const {SystemError, NotFoundError, ContentError} = require("./errors")

function changeUserPassword(email, newPassword, newPasswordConfirm, password, callback){
  validate.email(email, 'email')
  validate.text(newPassword, 'new password')
  validate.text(newPasswordConfirm, 'new password confirm')
  validate.text(password, 'password')
  validate.function(callback, 'callback')
              
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