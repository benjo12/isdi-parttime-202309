import { validate, errors } from 'com'
import context from './context'

const { SystemError } = errors

function changeUserPassword(password, newPassword, newPasswordConfirm) {
    // Validar las contraseñas
    validate.password(password, 'password')
    validate.password(newPassword, 'new password')
    validate.password(newPasswordConfirm, 'new password confirm')

    // Crear la solicitud HTTP
    const req = {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${String(context.token)}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password, newPassword, newPasswordConfirm })
    }

    // Realizar la solicitud a la API
    return fetch(`${import.meta.env.VITE_API_URL}/users/change-password`, req)
        // Manejar errores de conexión y lanzar un SystemError en caso de error
        .catch(error => {throw new SystemError(error.message)})
        .then(res => {
            // Manejar errores de respuesta del servidor
            if(!res.ok) {
                return res.json()
                    .catch(error => {throw new SystemError(error.message)})
                    .then(body => { throw new errors[body.error](body.message)})
            }
            // No se devuelve nada en caso de éxito
        })
}

export default changeUserPassword;
