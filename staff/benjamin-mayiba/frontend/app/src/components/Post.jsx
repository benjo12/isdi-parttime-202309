import { Button } from '../library'
import logic from '../logic'

function Post(props) {
    const post = props.post

    function handleToggleLikeClick() {
        try {
            logic.toggleLikePost(post.id, error => {
                if (error) {
                    alert(error.message)

                    return
                }

                props.onToggleLikeClick()
            })
        } catch (error) {
            alert(error.message)
        }
    }

    function handleToggleFavClick() {
        try {
            logic.toggleFavPost(post.id, error => {
                if (error) {
                    alert(error.message)

                    return
                }

                props.onToggleFavClick()
            })
        } catch (error) {
            alert(error.message)
        }
    }

    return <article className="post">
        <h2>{post.author}</h2>
        <img className="post-image" src={post.image} />
        <p>{post.text}</p>
        <div className="post-actions">
            <Button onClick={handleToggleLikeClick}>{post.liked ? '❤️' : '🤍'} {post.likes.length} likes</Button>
            <Button onClick={handleToggleFavClick}>{post.fav ? '⭐️' : '✩'}</Button>
        </div>
    </article>
}

export default Post