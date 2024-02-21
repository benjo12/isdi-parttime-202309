import { validate, errors } from 'com';
import { Service, User } from '../data/models.js';

const { NotFoundError, SystemError } = errors;

export default async function retrieveService(userId) {
    validate.id(userId, 'user id');

    try {
        // Buscar usuario
        const user = await User.findById(userId)
        if(!user){
             throw new NotFoundError('user not found');
        }
       
        // Buscar servicios asociados al usuario
        const services = await Service.find({ author: userId }).populate('author', 'name').select('-__v').lean();


        if (!services || services.length === 0) {
            throw new NotFoundError('service not found');
        }

        // Convertir _id en id para cada servicio y para el autor utilizando forEach
        services.forEach(service => {
           
            service.id = service._id.toString();

            if (service.author && service.author._id) {
                service.author.id = service.author._id.toString();
                delete service.author._id;
            }
           
            delete service._id;
           

        });

        return services;
    } catch (error) {
        throw new SystemError(error.message);
    }
}