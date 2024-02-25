import context from './context'
import { validate, errors } from 'com'
const { SystemError } = errors

  function loginUser(email, password){
    validate.email(email)
    validate.password(password)

    return (async () => {
        const req = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        }

        let res

        try {
            res = await fetch(`${import.meta.env.VITE_API_URL}/users/auth`, req)
        } catch (error) {
            throw new SystemError(error.message)
        }

        if (!res.ok) {
            let body

            try {
                body = await res.json()
            } catch (error) {
                throw new SystemError(error.message)
            }

            throw new errors[body.error](body.message)
        }

        try {
            const userId = await res.json()

            

            context.sessionUserId = userId
           
        } catch (error) {
            throw new SystemError(error.message)
        }
    })()
}
export default loginUser