import { Button, Container, Form, Field } from "../library"
import logic from "../logic"

export default function ({onPublish, onCancel }){

    const handleSubmit = event => {
        event.preventDefault()

        const image = event.target.image.value
        const text = event.target.text.value

        try {
            
            logic.publishPost(image, text, error =>{

                if(error){
                    alert(error.message)

                    return
                }

                onPublish()
            })
        } catch (error) {
            alert(error.message)
        }
    }

    const handleCancel = event => {
    event.preventDefault()

    onCancel()
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



    