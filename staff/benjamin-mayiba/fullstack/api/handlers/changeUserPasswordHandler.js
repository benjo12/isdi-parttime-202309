import jwt from 'jsonwebtoken'
const { JsonWebTokenError } = jwt

import logic from '../logic/index.js'
import { NotFoundError, ContentError, CredentialsError, TokenError } from '../logic/errors.js'


export default (req, res) =>{
   try{
       const token = req.headers.authorization.substring(7)
       const { sub: userId } = jwt.verify(token, process.env.JWT_SECRET)
       
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
        else if (error instanceof JsonWebTokenError) {
            status = 401

            error = new TokenError(error.message)
        }   
       res.status(status).json({error: error.constructor.name, message: error.message})
   }
}
