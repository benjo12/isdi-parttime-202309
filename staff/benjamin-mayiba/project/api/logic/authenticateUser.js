import { validate, errors } from 'com'
import { User } from '../data/models.js'
const { SystemError, CredentialsError, NotFoundError } = errors

export default function authenticateUser(email, password){
    validate.email(email, 'email')
     validate.password(password, 'password')
     
   return (async () => {
        let user

        try {
            user = await User.findOne({ email })
            if(!user)
               throw new NotFoundError('user not found')
        } catch (error) {
            throw new SystemError(error.message)
        }

         if (user.password !== password) 
            
            throw new CredentialsError('wrong password')

        return user.id
    })()
}
