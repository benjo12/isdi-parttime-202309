const logic = require('../logic')
const { NotFoundError, ContentError, CredentialsError } = require('../logic/errors')

module.exports = (req, res) => {
    try {
        const { email, password } = req.body

        logic.authenticateUser(email, password, (error, userId) => {
            if (error) {
                let status = 500

                if (error instanceof NotFoundError)
                    status = 404
                else if (error instanceof CredentialsError)
                    status = 401

                res.status(status).json({ error: error.constructor.name, message: error.message })

                return
            }

            res.json(userId)
        })
    } catch (error) {
        let status = 500

        if (error instanceof ContentError || error instanceof TypeError)
            status = 406

        res.status(status).json({ error: error.constructor.name, message: error.message })
    }
}