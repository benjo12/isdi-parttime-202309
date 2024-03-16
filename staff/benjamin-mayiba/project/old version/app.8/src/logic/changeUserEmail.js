import { validate, errors } from "com";
import context from "./context";

const { SystemError } = errors;

export default function changeUserEmail(newEmail, newEmailConfirm, password) {
  validate.email(newEmail);
  validate.email(newEmailConfirm);
  validate.password(password);

  // Crear la solicitud HTTP
  return (async () => {
    const req = {
      method: "PATCH", 
      headers: {
        Authorization: `Bearer ${context.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newEmail, newEmailConfirm, password }),
    };
    let res;

    try {
        // Realizar la solicitud a la API
      res = await fetch( `${import.meta.env.VITE_API_URL}/users/change-email`, req );
      
      // Manejar errores de conexión y lanzar un SystemError en caso de error
    } catch (error) {
      throw new SystemError(error.message);
    }
   // Manejar errores de respuesta del servidor
    if (!res.ok) {
      let body;

      try {
        body = await res.json();
      } catch (error) {
        throw new SystemError(error.message);
      }

      throw new errors[body.error](body.message);
    }
  })();
}
