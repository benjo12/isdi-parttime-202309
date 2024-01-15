import validate from './helpers/validate'
import context from './context'

function changeUserPassword(password, newPassword, newPasswordConfirm,  callback) {
    validate.password(password, 'password')
    validate.password(newPassword, 'new password')
    validate.password(newPasswordConfirm, 'new password confirm')
    validate.function(callback, 'callback')

    // TODO call api
     const req = {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${String(context.sessionUserId)}`,
                'Content-Type': 'application/json'
            },
          body: JSON.stringify({password, newPassword, newPasswordConfirm})
      }
   
      fetch(`${import.meta.env.VITE_API_URL}/users/change-password`, req)
           .then(res =>{
                if(!res.ok){
                   res.json()
                   .then(body => callback(new Error(body.message)))
                   .catch(error => callback(error))
                   
                   return
                }
               callback(null)
           })
           .catch(error => callback(error))
}

export default changeUserPassword