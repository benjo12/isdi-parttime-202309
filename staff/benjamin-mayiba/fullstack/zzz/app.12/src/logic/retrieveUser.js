import { validate, errors } from 'com'
import context from './context'

const { SystemError } = errors

export default function retrieveUser() {

    return (async () =>{
        const req = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${context.token}`
        }
    }
        let res

        try {
            res = await fetch(`${import.meta.env.VITE_API_URL}/users`, req)
        } catch (error) {
            throw SystemError(error.message) // error de conexion
        }

        if(!res){
            let body 

            try {
                body = await res.json() // objeto json
            } catch (error) {
                throw SystemError(error.message)
            }
            throw new errors[body.error](body.message)
        }

        try {
            const user = await res.json()

            return user
            
        } catch (error) {
             throw new SystemError(error.message)
        }
            
    })()
}

