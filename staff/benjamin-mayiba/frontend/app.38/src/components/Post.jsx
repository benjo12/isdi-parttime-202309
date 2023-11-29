import { Button } from "../library"

function Post(props){

    const post = props.post

    function handleToggleLikeButtonClick() {
        props.onToggleLikeClick(post.id)
    }

    function handleToggleFavButtonClick() {
        props.onToggleFavClick(post.id)
    }

    return <article className="post">
        <h2>{post.author}</h2>
        <img className="post-image" src={post.image} />
        <p>{post.text}</p>
        <Button onClick={handleToggleLikeButtonClick}>{post.liked ? '❤️' : '🤍'} {post.likes.length} likes</Button>
        <Button onClick={handleToggleFavButtonClick}>{post.fav ? '⭐️' : '✩'}</Button>
    </article>
}

export default Post