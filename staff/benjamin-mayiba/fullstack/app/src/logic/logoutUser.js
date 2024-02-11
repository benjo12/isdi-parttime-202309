import { validate } from 'com'

export default function logoutUser(callback) {
    validate.function(callback, 'callback')

    this.token = null
    this.sessionUserId = null

    callback(null)
}

