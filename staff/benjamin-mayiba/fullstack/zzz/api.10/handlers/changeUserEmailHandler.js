import logic from '../logic/index.js'
import { NotFoundError, ContentError, CredentialsError } from '../logic/errors.js'

export default (req, res) => {
  try {
    const userId = req.headers.authorization.substring(7)
    const { newEmail, newEmailConfirm, password } = req.body
    
    logic.changeUserEmail(userId, newEmail, newEmailConfirm, password, error => {
      if (error) {
        let status = 500
        if (error instanceof NotFoundError)
          status = 404
        else if (error instanceof CredentialsError)
          status = 401

        res.status(status).json({ error: error.constructor.name, message: error.message })
        return
      }

      res.status(204).send()
    })
  } catch (error) {
    let status = 500
    if (error instanceof ContentError || error instanceof TypeError)
      status = 406

    res.status(status).json({ error: error.constructor.name, message: error.message })
  }
}
