
import { useState } from 'react'

import { Button,Form,  Field } from '../library'

import logic from '../logic'

function Post({post, onToggleLikeClick, onToggleFavClick, onPostTextUpdate}) {
       console.log('post')

       const [view, setView] = useState(null)

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

    return <article className="post">
        <h2>{post.author.name}</h2>
        <img className="post-image" src={post.image} />

        {view === null && <p>{post.text}</p>}
        {view === 'edit' && <Form onSubmit={handleEditSubmit}>
        <Field id="text" value={post.text} />
        <Button type="submit">Save</Button>
        <Button onClick={handleEditCancelClick}>Cancel</Button>     
        </Form>}

        <div className="post-actions">
            <Button onClick={handleToggleLikeClick}>{post.liked ? '❤️' : '🤍'} {post.likes.length} likes</Button>
            <Button onClick={handleToggleFavClick}>{post.fav ? '⭐️' : '✩'}</Button>
            {logic.sessionUserId === post.author.id && view === null && <Button onClick={handleEditClick}>✏️</Button>}
        </div>
    </article>
}

export default Post