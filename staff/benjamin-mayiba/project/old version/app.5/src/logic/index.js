import registerUser from './registerUser'
import loginUser from './loginUser'
import retrieveUser from './retrieveUser'
import createService from './createService'
import createEvent from './createEvent'
import retrieveServices from './retrieveServices'
import retrieveEvent from './retrieveEvent'
import isUserLoggedIn from './isUserLoggedIn'
import logoutUser from './logoutUser'

const logic = {
    registerUser,
    loginUser,
    retrieveUser,
    createService,
    createEvent,
    retrieveServices,
    retrieveEvent,
    isUserLoggedIn,
    logoutUser
    
}

export default logic