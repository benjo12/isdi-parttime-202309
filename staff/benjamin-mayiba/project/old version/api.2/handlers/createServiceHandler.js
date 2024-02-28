import logic from "../logic/index.js";
import { errors } from "com";

const { NotFoundError, ContentError } = errors;

export default async (req, res) => {
  try {
    const userId = req.headers.authorization.substring(7);

    const { name, description } = req.body;

    const serviceId = await logic.createService(userId, name, description);
    res.json(serviceId);
  } catch (error) {
    let status = 500;
    if (error instanceof NotFoundError) {
      status = 404;
    } else if (error instanceof ContentError || error instanceof TypeError) {
      status = 406;
    }

    res.status(status).json({ error: error.constructor.name, message: error.message });   
  }
};
