import validate from './helpers/validate'

function updatePostText(postId, text, callback) {
    validate.text(postId, 'post id')
    validate.text(text, 'text')
    validate.function(callback, 'callback')

    // TODO call api
}

export default updatePostText