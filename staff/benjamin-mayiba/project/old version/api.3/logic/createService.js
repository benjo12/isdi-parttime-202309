import { validate, errors } from 'com';
import { User, Service } from '../data/models.js';

const { SystemError, NotFoundError } = errors;

export default async function createService(userId, name, description) {
    try {
        // Validar los argumentos de entrada
        validate.id(userId, 'userId');
        validate.text(name, 'name');
        validate.text(description, 'description');

        // Buscar al usuario por su ID
        const user = await User.findById(userId);
        if (!user) {
            throw new NotFoundError('User not found');
        }

        // Crear el servicio asociado al usuario encontrado
        const serviceId = await Service.create({ author: userId, name, description });
             return serviceId
    } catch (error) {
        // Manejar errores y lanzar un SystemError
        throw new SystemError(error.message);
    }
}