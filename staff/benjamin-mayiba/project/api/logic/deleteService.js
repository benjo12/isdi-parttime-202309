import { User, Service, Event } from "../data/models.js";

import { validate, errors } from "com";

const { SystemError, NotFoundError } = errors;

export default async function deleteService(userId, serviceId) {
  validate.id(userId, "user id");
  validate.id(serviceId, "service id");

  let user;
  try {
    user = await User.findById(userId);
  } catch (error) {
    throw new SystemError(error.message);
  }

  if (!user) {
    throw new NotFoundError("user not found");
  }

  let service;

  try {
    service = await Service.findById(serviceId);
  } catch (error) {
    throw new SystemError(error.message);
  }

  if (!service) {
    throw new NotFoundError("service not found");
  }

  // Obtener los IDs de los eventos asociados al servicio
  let eventIdsToDelete;
  try {
    eventIdsToDelete = await Event.find({ service: serviceId }, { _id: 1 });
  } catch (error) {
    throw new SystemError(error.message);
  }
  // Extraer los IDs de los documentos
  let eventIdsArray = eventIdsToDelete.map((event) => event._id);
  // Convertir los IDs de los eventos a objetos ObjectId para la comparación
  let eventIds = eventIdsArray.map((eventId) => eventId.toString());

  // Eliminar los IDs de los eventos asociados al servicio de la lista de reminders del usuario
  user.reminders = user.reminders.filter((reminderId) => {
    // Verificar si el reminderId no está en la lista de eventIdsToDelete
    return !eventIds.includes(reminderId.toString());
  });

  // Guardar los cambios en el usuario
  try {
    await user.save();
  } catch (error) {
    throw new SystemError(error.message);
  }

  try {
    await Event.deleteMany({ user: userId, service: serviceId });
  } catch (error) {
    throw new SystemError(error.message);
  }

  try {
    await Service.deleteOne({ _id: serviceId });
  } catch (error) {
    throw new SystemError(error.message);
  }
}
