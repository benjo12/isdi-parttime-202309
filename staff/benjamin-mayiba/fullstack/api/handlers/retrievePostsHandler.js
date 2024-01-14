const logic = require('../logic')
const { NotFoundError, ContentError } = require('../logic/errors')

module.exports = (req, res) => {
    try {
        const userId = req.headers.authorization.substring(7)

        logic.retrievePosts(userId, (error, posts) => {
            if (error) {
                let status = 500

                if (error instanceof NotFoundError)
                    status = 404

                res.status(status).json({ error: error.constructor.name, message: error.message })

                return
            }

            res.json(posts)
        })
    } catch (error) {
        let status = 500

        if (error instanceof ContentError || error instanceof TypeError)
            status = 406

        res.status(status).json({ error: error.constructor.name, message: error.message })
    }
}