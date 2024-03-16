import { validate, errors } from "com";
import context from "./context";

const { SystemError } = errors;

export default function changeUserPassword(password, newPassword, newPasswordConfirm) {
  validate.password(password, 'password')
    validate.password(newPassword, 'new password')
    validate.password(newPasswordConfirm, 'new password confirm')
 
 // Crear la solicitud HTTP
  return (async () => {
    const req = {
      method: "PATCH", 
      headers: {
        Authorization: `Bearer ${context.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({password, newPassword, newPasswordConfirm  }),
    };
    let res;

    try {
        // Realizar la solicitud a la API
      res = await fetch(`${import.meta.env.VITE_API_URL}/users/change-password`,req);
    
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
