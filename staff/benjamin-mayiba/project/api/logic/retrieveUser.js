import { User } from "../data/models.js";
import {validate, errors } from 'com'

const {NotFoundError, SystemError } = errors

export default async function retrieveUser(userId){
    validate.id(userId, 'user id')
     
     let user
   try {
     user = await User.findById(userId,'name').lean()   
   }catch (error) {

       throw new SystemError(error.message)
   }

   if(!user)
    throw new NotFoundError('user not found')
    
    delete user._id
    return user 
}