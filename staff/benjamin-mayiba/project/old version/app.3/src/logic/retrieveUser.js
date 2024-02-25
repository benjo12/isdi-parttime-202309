import context from './context'
import { errors } from 'com'

const { SystemError } = errors

export default function retrieveUser(){

    return (async () =>{
        const req = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${context.sessionUserId}`
            }
        }

        let res

        try {
            res = await fetch(`${import.meta.env.VITE_API_URL}/users`, req)
        } catch (error) {
            throw new SystemError(error.message) // error de conexion
        }

        if(!res.ok){
            let body
             try {
                body = await res.json() // objeto json
             } catch (error) {
                throw new SystemError(error.message)
             }
             throw new errors[body.error](body.message);
        }

        try {
            const user = await res.json()

            return user
        } catch (error) {
            throw new SystemError(error.message)
        }

    })()
}