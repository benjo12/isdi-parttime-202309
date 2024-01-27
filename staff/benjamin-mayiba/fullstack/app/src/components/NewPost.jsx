import { Button, Container, Form, Field } from "../library"
import logic from "../logic"

export default function (props){

    const handleSubmit = event => {
        event.preventDefault()

        const image = event.target.image.value
        const text = event.target.text.value

        try {
            
            logic.publishPost(image, text, error =>{

                if(error){
                    props.onError(error)

                    return
                }

                props.onPublish()
            })
        } catch (error) {
            props.onError(error)
        }
    }

    const handleCancel = event => {
    event.preventDefault()

    props.onCancel()
}
  return <Container className="new-post">
            <h2>New post</h2>
             
             <Form onSubmit={handleSubmit}>
               <Field id="image" type="url">Image</Field>
               <Field id="text">Text</Field>

               <Button type="submit">Post</Button>
               <Button onClick={handleCancel}></Button>
             
             </Form >
  
        </Container>


    
}



    