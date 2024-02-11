import registerUser from './registerUser'
import loginUser from './loginUser'
import logoutUser from './logoutUser'
import retrieveUser from './retrieveUser'
import changeUserEmail from './changeUserEmail'
import changeUserPassword from './changeUserPassword'
import isUserLoggedIn from './isUserLoggedIn'

import publishPost from './publishPost'
import retrieveFavPosts from './retrieveFavPosts'
import retrievePosts from './retrievePosts'
import toggleFavPost from './toggleFavPost'
import toggleLikePost from './toggleLikePost'
import updatePostText from './updatePostText'
import context from './context'

const logic = {
    registerUser,
    loginUser: loginUser.bind(context),
    logoutUser: logoutUser.bind(context),
    retrieveUser: retrieveUser.bind(context),
    changeUserEmail: changeUserEmail.bind(context),
    changeUserPassword: changeUserPassword.bind(context),
     isUserLoggedIn: isUserLoggedIn.bind(context),

    publishPost: publishPost.bind(context),
    retrieveFavPosts: retrieveFavPosts.bind(context),
    retrievePosts: retrievePosts.bind(context),
    toggleFavPost: toggleFavPost.bind(context),
    toggleLikePost: toggleLikePost.bind(context),
    updatePostText: updatePostText.bind(context)
}

export default logic