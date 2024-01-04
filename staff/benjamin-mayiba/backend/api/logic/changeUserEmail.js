const {User} = require("../data/models")
const {validateText, validateFunction} = require("./helpers/validators")
const {SystemError, NotFoundError, ContentError} = require("./errors")


function changeUserEmail(email, newEmail, newEmailConfirm , password, callback){

    validateText(email, 'email')
    validateText(newEmail, 'new email')
    validateText(newEmailConfirm, 'new email confirm')
    validateFunction(callback, 'callback')
   
    User.findOne({email})
        .then(user =>{
           if(!user){
           callback(new NotFoundError('user not found'))
               return
           }
            if(newEmail !== newEmailConfirm ){
              callback(new ContentError('new email and its confirmation do not match'))
                return
            }
            if(user.password !== password){
              callback(new ContentError('wrong credentials'))
                return  
            }
           
             user.email = newEmail
             user.save()
             .then(() => callback(null))
              .catch(error => callback(new SystemError(error.message)))
         })
        .catch(error => {
          callback(new SystemError(error.message))
        })
}

module.exports = changeUserEmail