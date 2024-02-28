import jwt from 'jsonwebtoken'

import logic from "../logic/index.js";
import { errors } from "com";

const { NotFoundError, ContentError, TokenError } = errors;

export default async (req, res) => {
  try {
    const token = req.headers.authorization.substring(7)
   const { sub: userId } = jwt.verify(token, process.env.JWT_SECRET)

    const user = await logic.retrieveUser(userId);

    res.json(user);
  } catch (error) {
    let status = 500;

    if (error instanceof NotFoundError) status = 404;
    else if (error instanceof ContentError || error instanceof TypeError){
      status = 406;
      
    }else if (error instanceof JsonWebTokenError) {
       status = 401
        error = new TokenError(error.message)
     }  
    res.status(status).json({ error: error.constructor.name, message: error.message });   
  }
};
