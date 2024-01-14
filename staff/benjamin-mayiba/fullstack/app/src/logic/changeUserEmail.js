import validate from './helpers/validate'
import context from './context'

function changeUserEmail(newEmail, newEmailConfirm, password, callback) {
  validate.email(newEmail)
  validate.email(newEmailConfirm)
  validate.password(password)
  validate.function(callback, 'callback')
  
  const req = {
    method: 'POST',
    headers: {
       Authorization: `Bearer ${context.sessionUserId}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ newEmail, newEmailConfirm, password })
  }

  fetch(`${import.meta.env.VITE_API_URL}/users/change-email`, req)   
    .then(res => {
       
      if (!res.ok) {
        res.json()
          .then(body => callback(new Error(body.message)))
          .catch(error => callback(error))
          
        return
      }
      
      callback(null)
    })
    .catch(error =>{
      
      callback(error)
    })
      
    
}

export default changeUserEmail