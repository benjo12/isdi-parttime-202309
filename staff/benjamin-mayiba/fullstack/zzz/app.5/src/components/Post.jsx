
import { useState } from 'react'

import { Button,Form,  Field } from '../library'

import logic from '../logic'

function Post(props) {
       console.log('post')

       const [view, setView] = useState(null)

    const handleToggleLikeClick = () => {
        try {
            logic.toggleLikePost(props.post.id, error => {
                if (error) {
                    props.onError(error)

                    return
                }

                props.onToggleLikeClick()
            })
        } catch (error) {
            props.onError(error)
        }
    }

    const handleToggleFavClick = () => {
        try {
            logic.toggleFavPost(props.post.id, error => {
                if (error) {
                    props.onError(error)

                    return
                }

                props.onToggleFavClick()
            })
        } catch (error) {
            props.onError(error)
        }
    }

    const handleEditClick = () => setView('edit')

    const handleEditCancelClick = () => setView(null)

    const handleEditSubmit = event =>{
          event.preventDefault()

          const text = event.target.text.value

          try {

            logic.updatePostText(props.post.id, text, error =>{
                if(error){
                  props.onError(error)

                  return
                }
                props.onPostTextUpdate()
                setView(null)
            })
            
          } catch (error) {

            props.onError(error)
            
          }
    }

    return <article className="post">
        <h2>{props.post.author.name}</h2>
        <img className="post-image" src={props.post.image} />

        {view === null && <p>{props.post.text}</p>}
        {view === 'edit' && <Form onSubmit={handleEditSubmit}>
        <Field id="text" value={props.post.text} />
        <Button type="submit">Save</Button>
        <Button onClick={handleEditCancelClick}>Cancel</Button>     
        </Form>}

        <div className="post-actions">
            <Button onClick={handleToggleLikeClick}>{props.post.liked ? '❤️' : '🤍'} {props.post.likes.length} likes</Button>
            <Button onClick={handleToggleFavClick}>{props.post.fav ? '⭐️' : '✩'}</Button>
            {logic.sessionUserId === props.post.author.id && view === null && <Button onClick={handleEditClick}>✏️</Button>}
        </div>
    </article>
}

export default Post