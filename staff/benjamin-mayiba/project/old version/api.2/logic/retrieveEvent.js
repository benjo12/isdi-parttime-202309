import { validate, errors } from 'com';
import { User, Event } from '../data/models.js';

const { NotFoundError, SystemError } = errors;

export default async function retrieveEvent(userId) {
    validate.id(userId, 'user id');

    try {
        // Validar si el usuario existe
        const user = await User.findById(userId);
        if (!user) {
            throw new NotFoundError('user not found');
        }

        // Si el usuario existe, proceder con la búsqueda de eventos asociados
        const fullEvents = await Event.find({ user: userId }).populate('service').select('-__v').exec();

        if (!fullEvents) {
            return []
        }else{

                const eventDetails = fullEvents.map(event => {
                return {
                    name: event.service.name,
                    date: event.date,
                    time: event.time
                };
            });

            return eventDetails;
        }

       
    } catch (error) {
        
        throw new SystemError(error.message);
       
    }
}
