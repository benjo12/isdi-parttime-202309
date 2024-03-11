import { validate, errors } from "com";
import { User, Event } from "../data/models.js";

const { NotFoundError, SystemError } = errors;

export default async function retrieveEvent(userId) {
  validate.id(userId, "user id");

  let user;
  try {
    // Validar si el usuario existe
    user = await User.findById(userId);
  } catch (error) {
    throw new SystemError(error.message);
  }

  if (!user) {
    throw new NotFoundError("user not found");
  }

  let fullEvents;
  try {
    // Si el usuario existe, proceder con la búsqueda de eventos asociados
    fullEvents = await Event.find({ user: userId })
      .sort({ date: 1, time: 1 }) // Ordena los eventos por fecha en orden ascendente
      .populate("service")
      .select("-__v")
      .exec();
         
  } catch (error) {
    throw new SystemError(error.message);
  }

  if (!fullEvents) {
    return [];
  } else {
    const eventDetails = fullEvents.map((event) => {
      return {
        id: event._id.toString(),
        name: event.service.name,
        date: event.date,
        time: event.time,
      };
    });

    return eventDetails;
  }
}
