import { validate, errors } from 'com'
import context from './context'

const { SystemError } = errors

function changeUserEmail(newEmail, newEmailConfirm, password) {
  validate.email(newEmail)
  validate.email(newEmailConfirm)
  validate.password(password)

  const req = {
    method: 'PATCH', // Aquí se debe corregir a 'PATCH'
    headers: {
      Authorization: `Bearer ${context.token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ newEmail, newEmailConfirm, password })
  }

  return fetch(`${import.meta.env.VITE_API_URL}/users/change-email`, req)
    .catch(error => { throw new SystemError(error.message) })  // maneja errores conexión 
    .then(res => {  
      if (!res.ok) {
        return res.json()
          .catch(error => { throw new SystemError(error.message) })
          .then(body => { throw new errors[body.error](body.message) });     
      }
    });
}

export default changeUserEmail;
