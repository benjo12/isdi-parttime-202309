import { validate, errors } from "com";
import { User, Service, Event } from "../data/models.js";

const { SystemError, NotFoundError } = errors;

export default async function createEvent(userId, serviceId, date, time) {
  validate.id(userId, "user id");
  validate.id(serviceId, "service id");
  validate.date(date, "date");
  validate.time(time, "time");

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

  try {
    const event = await Event.create({
      user: userId,
      service: serviceId,
      date,
      time,
    });
    user.reminders.push(event.id);
  } catch (error) {
    throw new SystemError(error.message);
  }

  try {
    await user.save();
  } catch (error) {
    throw new SystemError(error.message);
  }
}
