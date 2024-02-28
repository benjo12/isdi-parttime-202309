 
import { validate, errors } from 'com';
import { User, Service, Event } from '../data/models.js'

const { SystemError, NotFoundError } = errors

export default async function createEvent(userId,serviceId, date, time){
      validate.id(userId, 'user id')
      validate.id(serviceId, 'service id')
      validate.text(date, 'date')
      validate.text(time, 'time')
   
    try{
        const user = await User.findById(userId)
             if(!user){
                 throw new NotFoundError('user not found')
             }
        const service = await Service.findById(serviceId)
           if(!service){
                 throw new NotFoundError('service not found')
             }
        const event = await Event.create({user:userId, service: serviceId, date, time})
        user.reminders.push(event.id)
        await user.save()
    }catch(error){
         throw new SystemError(error.message)
    }


}