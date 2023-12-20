
import { useState } from 'react'

import { Button,Form,  Field } from '../library'

import logic from '../logic'

function Post({post, onToggleLikeClick, onToggleFavClick, onPostTextUpdate, onPostComment}) {
       console.log('post')

       const [view, setView] = useState(null)
       const [comment, setComment] = useState(null)

    const handleToggleLikeClick = () => {
        try {
            logic.toggleLikePost(post.id, error => {
                if (error) {
                    alert(error.message)

                    return
                }

                onToggleLikeClick()
            })
        } catch (error) {
            alert(error.message)
        }
    }

    const handleToggleFavClick = () => {
        try {
            logic.toggleFavPost(post.id, error => {
                if (error) {
                    alert(error.message)

                    return
                }

                onToggleFavClick()
            })
        } catch (error) {
            alert(error.message)
        }
    }

    const handleCommentClick = () => setComment('new comment')
    const handleCommentCancel = () => setComment(null)
    
    const handleEditClick = () => setView('edit')

    const handleEditCancelClick = () => setView(null)

    const handleEditSubmit = event =>{
          event.preventDefault()

          const text = event.target.text.value

          try {

            logic.updatePostText(post.id, text, error =>{
                if(error){
                  alert(error.message)

                  return
                }
                onPostTextUpdate()
                setView(null)
            })
            
          } catch (error) {

            alert(error.message)
            
          }
    }

    const handleCommentSubmit = (event) =>{
        event.preventDefault()

        const newComment = event.target.text.value

        try {

            logic.commentPost(post.id, newComment, error =>{
                if(error){
                    alert(error.message)

                    return
                }

                onPostComment()
                setComment(null)
            })
            
        } catch (error) {
            alert(error.message)
        }
    }

    return (
    <article className="post">
      <h2>{post.author.name}</h2>
      <img className="post-image" src={post.image} />

      {view === null && <p>{post.text}</p>}
      {view === 'edit' && (
        <Form onSubmit={handleEditSubmit}>
          <Field id="text" value={post.text} />
          <Button type="submit">Save</Button>
          <Button onClick={handleEditCancelClick}>Cancel</Button>
        </Form>
      )}

      {comment === 'new comment' && (
        <Form onSubmit={handleCommentSubmit}>
          <Field id="text" value={comment}></Field>
          <Button type="submit">publish</Button>
          <Button onClick={handleCommentCancel}>✏️</Button>
        </Form>
      )}
         {/* Sección de comentarios */}
          {/* Verifica si existen comentarios en el post y si hay al menos uno */}
      {post.comments && post.comments.length > 0 && (
        <div className="post-comments">
         {/* Título de la sección de comentarios */}
          <h3>Comments:</h3>
          {/* Lista de comentarios */}
          <ul>
          {/* Mapea sobre cada comentario en el array de comentarios */}
            {post.comments.map((comment, index) => (
              <li key={index}>{comment}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="post-actions">
        <Button onClick={handleToggleLikeClick}>{post.liked ? '❤️' : '🤍'} {post.likes.length} likes</Button>
        <Button onClick={handleToggleFavClick}>{post.fav ? '⭐️' : '✩'}</Button>
        {logic.sessionUserId === post.author.id && view === null && <Button onClick={handleEditClick}>✏️</Button>}
        <Button onClick={handleCommentClick}>💭</Button>
      </div>
    </article>
  );
}


export default Post