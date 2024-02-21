import logic from "../logic/index.js";
import { errors } from "com";

const { NotFoundError, ContentError } = errors;

export default async (req, res) => {
  try {
    const { email, password } = req.body;
    const userId = await logic.authenticateUser(email, password);
    res.json(userId);
  } catch (error) {
    let status = 500;
    if (error instanceof NotFoundError) {
      status = 404;
    } else if (error instanceof CredentialsError) {
      status = 401;
    } else if (error instanceof ContentError || error instanceof TypeError) {
      status = 406;
    }
    res.status(status).json({ error: error.constructor.name, message: error.message });     
  }
};
