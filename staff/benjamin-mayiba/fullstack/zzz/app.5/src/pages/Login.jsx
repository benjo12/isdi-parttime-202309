// eslint-disable-next-line no-unused-vars
import React from 'react'

import logic from '../logic'

import {Button, Link, Form, Field, Container} from '../library'



function Login(props) {
    console.log('Login')

    function handleSubmit(event) {
        event.preventDefault()

        const emailInput = event.target.querySelector('#email-input')
        const passwordInput = event.target.querySelector('#password-input')

        const email = emailInput.value
        const password = passwordInput.value

        try {
            logic.loginUser(email, password, error => {
                if (error) {
                    props.onError(error)

                    return
                }
                 //setTimeout(() => props.onSuccess(), 2000)
                 props.onSuccess()
            })
        } catch (error) {
            props.onError(error)
        }
    }

    function handleRegisterClick(event) {
        event.preventDefault()

        // eslint-disable-next-line react/prop-types
        props.onRegisterClick() 
    }

    return <Container>
        <h1>Login</h1>

        <Form onSubmit={handleSubmit}>
            <Field id="email-input" type='email'>E-mail</Field>
            
            <Field id="password-input" type='password'>Password</Field>
            
            <Button type="submit">Login</Button>
        </Form>

        <Link onClick={handleRegisterClick}>Register</Link>
    </Container>
}

export default Login