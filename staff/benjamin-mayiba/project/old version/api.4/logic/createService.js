import { validate, errors } from "com";
import { User, Service } from "../data/models.js";

const { SystemError, NotFoundError } = errors;

export default async function createService(userId, name, description) {
  // Validar los argumentos de entrada
  validate.id(userId, "userId");
  validate.text(name, "name");
  validate.text(description, "description");

  let user;
  try {
    // Buscar al usuario por su ID
     user = await User.findById(userId);
  } catch (error) {
    // Manejar errores y lanzar un SystemError
    throw new SystemError(error.message);
  }

  if (!user) {
    throw new NotFoundError("user not found");
  }
    let serviceId
  try {
    // Crear el servicio asociado al usuario encontrado
     serviceId = await Service.create({
      author: userId,
      name,
      description,
    });
  } catch (error) {
    throw new SystemError(error.message);
  }
  return serviceId;
}
