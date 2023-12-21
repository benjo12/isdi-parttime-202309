import { validateText } from '../utils/validators'

function toggleFavPost(postId, callback) {
    validateText(postId, 'post id')

    // TODO call api
}

export default toggleFavPost