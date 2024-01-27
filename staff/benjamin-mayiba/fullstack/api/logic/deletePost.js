import { User, Post } from '../data/models.js';
import validate from './helpers/validate.js';
import { SystemError, NotFoundError, ForbiddenError } from './errors.js';

function deletePost(userId, postId) {
    validate.id(userId, 'user id');
    validate.id(postId, 'post id');

    return User.findById(userId)
        .catch(error => {
            throw new SystemError(error.message);
        })
        .then(user => {
            if (!user) {
                throw new NotFoundError('user not found');
            }

            return Post.findOne({ _id: postId, author: user._id })
                .then(post => {
                    if (!post) {
                        throw new NotFoundError('post not found');
                    }

                    // Check if the post belongs to the user
                    if (post.author.toString() !== user._id.toString()) {
                        throw new ForbiddenError('you do not have permission to delete this post');
                    }

                    // Delete the post
                    return Post.deleteOne({ _id: postId });
                });
        });
}

export default deletePost;
