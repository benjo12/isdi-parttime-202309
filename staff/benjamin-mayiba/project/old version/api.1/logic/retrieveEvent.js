import { validate, errors } from 'com';
import { Service, User, Event } from '../data/models.js';

const { NotFoundError, SystemError } = errors;

export default async function retrieveEvent(userId, serviceId) {
    validate.id(userId, 'user id');
    validate.id(serviceId, 'serviceId');
   
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new NotFoundError('user not found');
        }

        const service = await Service.findById(serviceId);
        if (!service) {
            throw new NotFoundError('service not found');
        }

       const fullEvent = await Event.find({ user: userId, service: serviceId }).populate('service').select('-__v').exec();
                              
                              
                              

       
        if (fullEvent.length === 0) {
            throw new NotFoundError('Event not found');
        }
       
        const eventDetails = fullEvent.map(event => {
            return {
                name: event.service.name,
                date: event.date,
                time: event.time
            };
        });

        return eventDetails;
    } catch (error) {
        throw new SystemError(error.message);
    }
}