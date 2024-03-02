import { User, Event } from '../data/models.js'

import {validate, errors } from 'com'

const {SystemError, NotFoundError } = errors

export default async  function deleteEvent(userId, eventId){
           validate.id(userId, 'user id')
           validate.id(eventId, 'event id')
   
    let user
    try{
        user = await User.findById(userId)
    }catch(error){
        throw new SystemError(error.message)
    }
   
    if(!user){
       throw new NotFoundError('user not found')
    }
   
    let event
   
    try{
        event = await Event.findById(eventId)
    }catch(error){
        throw new SystemError(error.message)
    }
   
    if(!event){
       throw new NotFoundError('event not found')
    }
   
    try{
       await Event.deleteOne({_id: eventId})
    }catch(error){
      throw new SystemError(error.message)
    }
   
    let posEventId = user.reminders.indexOf(eventId)
    user.reminders.splice(posEventId,1)
   
    try{
       await user.save()
    }catch(error){
      throw new SystemError(error.message)
    }
}