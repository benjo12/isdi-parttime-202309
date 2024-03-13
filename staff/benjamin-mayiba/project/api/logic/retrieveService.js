import { validate, errors } from "com";
import { Service, User } from "../data/models.js";

const { NotFoundError, SystemError } = errors;

export default async function retrieveService(userId) {
  validate.id(userId, "user id");

  let user;
  try {
    // Buscar usuario
    user = await User.findById(userId);
  } catch (error) {
    throw new SystemError(error.message);
  }

  if (!user) {
    throw new NotFoundError("user not found");
  }

  let services;
  try {
    // Buscar servicios asociados al usuario
    services = await Service.find({ author: userId }).exec();
  } catch (error) {
    throw new SystemError(error.message);
  }

  if (!services || services.length === 0) {
    //throw new NotFoundError("service not found");
  return []
  }else{
   // Crear un nuevo arreglo de objetos con id y nombre de servicio
  const formattedServices = services.map((service) => ({
    id: service._id.toString(), // Convertir ObjectId a string
    name: service.name, // Incluir nombre del servicio
    description: service.description,
  }));

  return formattedServices;

  }

}
