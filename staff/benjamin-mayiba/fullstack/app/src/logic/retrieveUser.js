import { validate, errors } from 'com'
import context from './context'

const { SystemError } = errors

function retrieveUser() {

    const req = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${context.token}`
        }
    }

    return fetch(`${import.meta.env.VITE_API_URL}/users`, req)
            .catch(error => {throw SystemError(error.message)})  // error de conexion
            .then(res => {
                if (!res.ok) {
                    return res.json() // objeto json
                       .catch(error => {throw SystemError(error.message)})
                       .then(body => {throw new errors[body.error](body.message)})       
                }
                return res.json()
                  .catch(error => {throw SystemError(error.message)})
            })
            
}

export default retrieveUser