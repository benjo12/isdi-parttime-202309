const logic = require('../logic')
const { NotFoundError, ContentError, CredentialsError } = require('../logic/errors')

module.exports = (req, res) =>{
   try{
       const userId = req.headers.authorization.substring(7)
       const {password, newPassword, newPasswordConfirm } = req.body
       
       logic.changeUserPassword(userId, password, newPassword, newPasswordConfirm, error =>{
                          if(error){
                             let status = 500
                                if(error instanceof NotFoundError)
                                    status = 404
                              else if(error instanceof CredentialsError)
                                  status = 401
                              res.status(status).json({error: error.constructor.name, message: error.message})
                              return
                          }
              res.status(200).send()
       })
       
   
   }catch(error){
       let status = 500
       if(error instanceof ContentError || error instanceof TypeError)
           status = 406
       res.status(status).json({error: error.constructor.name, message: error.message})
   }
}
