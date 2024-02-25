import { validate, errors } from 'com';
import { Service, User } from '../data/models.js';

const { NotFoundError, SystemError } = errors;

export default async function retrieveService(userId) {
    validate.id(userId, 'user id');

    try {
        // Buscar usuario
        const user = await User.findById(userId);
        if (!user) {
            throw new NotFoundError('user not found');
        }
       
        // Buscar servicios asociados al usuario
        const services = await Service.find({ author: userId }).exec();

        if (!services || services.length === 0) {
            throw new NotFoundError('service not found');
        }

        // Crear un nuevo arreglo de objetos con id y nombre de servicio
        const formattedServices = services.map(service => ({
            id: service._id.toString(), // Convertir ObjectId a string
            name: service.name, // Incluir nombre del servicio
            description: service.description,
        }));

        return formattedServices;
    } catch (error) {
        throw new SystemError(error.message);
    }
}