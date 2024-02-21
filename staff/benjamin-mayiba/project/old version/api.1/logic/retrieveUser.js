import { User } from "../data/models.js";
import {validate, errors } from 'com'

const {NotFoundError, SystemError } = errors

export default async function retrieveUser(userId){
    validate.id(userId, 'user id')

   try {
    const user = await User.findById(userId,'name').lean()

    if(!user)
        throw new NotFoundError('user not found')
        
    delete user._id
    return user    
   }catch (error) {

       throw new SystemError(error.message)
   }
}