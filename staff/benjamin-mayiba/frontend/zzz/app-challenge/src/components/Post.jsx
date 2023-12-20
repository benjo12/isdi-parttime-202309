import { Button } from '../library';
import logic from '../logic';
import { useState } from 'react';

function Post(props) {
    const post = props.post;
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(post.text);
    const [updatedText, setUpdatedText] = useState(props.post.text);
    const [commentText, setCommentText] = useState('');
    const [comments, setComments] = useState(post.comments || []);

    function handleToggleLikeClick() {
        try {
            logic.toggleLikePost(post.id, (error) => {
                if (error) {
                    alert(error.message);
                    return;
                }

                props.onToggleLikeClick();
            });
        } catch (error) {
            alert(error.message);
        }
    }

    function handleToggleFavClick() {
        try {
            logic.toggleFavPost(post.id, (error) => {
                if (error) {
                    alert(error.message);
                    return;
                }

                props.onToggleFavClick();
            });
        } catch (error) {
            alert(error.message);
        }
    }

    function handleEditClick() {
        setIsEditing(true);
    }

    function handleSaveEditClick() {
        logic.editPost(props.post.id, updatedText, (error) => {
            if (error) {
                alert(error.message);
                return;
            }

            setIsEditing(false);
            props.onEditSuccess();
        });
    }

    function handleCancelEditClick() {
        setIsEditing(false);
        setUpdatedText(post.text);
    }

    function handleCommentChange(e) {
        setCommentText(e.target.value);
    }

    function handleAddComment() {
        setComments([...comments, commentText]);
        setCommentText('');
    }

    return (
        <article className="post">
            <h2>{post.author}</h2>
            <img className="post-image" src={post.image} alt={post.text} />
            {isEditing ? (
                <textarea value={editedText} onChange={(e) => setEditedText(e.target.value)} />
            ) : (
                <div>
                    <p>{editedText}</p>
                    <div className="comments">
                        {comments.map((comment, index) => (
                            <div key={index}>{comment}</div>
                        ))}
                    </div>
                    <div>
                        <textarea value={commentText} onChange={handleCommentChange} />
                        <Button onClick={handleAddComment}>Add Comment</Button>
                    </div>
                </div>
            )}
            <div className="post-actions">
                {isEditing ? (
                    <>
                        <Button onClick={handleSaveEditClick}>Save</Button>
                        <Button onClick={handleCancelEditClick}>Cancel</Button>
                    </>
                ) : (
                    <>
                        <Button onClick={handleToggleLikeClick}>
                            {post.liked ? '❤️' : '🤍'} {post.likes.length} likes
                        </Button>
                        <Button onClick={handleToggleFavClick}>
                            {post.fav ? '⭐️' : '✩'}
                        </Button>
                        <Button onClick={handleEditClick}>Edit</Button>
                    </>
                )}
            </div>
        </article>
    );
}

export default Post;
