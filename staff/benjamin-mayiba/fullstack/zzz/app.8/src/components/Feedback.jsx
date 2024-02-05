import { Container, Button } from "../library"
import './Feedback.css'

const Feedback = props => {
    return <Container className={`container--horizontal Feedback Feedback--${props.level}`}>
        <p>{props.message}</p>
        <Button onClick={props.onAccepted}>Accept</Button>
    </Container>
}

export default Feedback