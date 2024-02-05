import logic from '../logic'

import { Button, Form, Field, Container } from '../library'
import { useState } from 'react'
import { useContext } from '../hooks'

// eslint-disable-next-line react/prop-types
export default function Profile({ onChangeEmail, onChangePassword }) {

    const [successMessage, setSuccessMessage] = useState(null)
    console.log('Profile')

    const context = useContext()

    const handleChangeEmailSubmit = (event) => {
        event.preventDefault()

        const newEmailInput = event.target.querySelector('#new-email-input')
        const newEmailConfirmInput = event.target.querySelector('#new-email-confirm-input')
        const passwordInput = event.target.querySelector('#email-password-input')

        const newEmail = newEmailInput.value
        const newEmailConfirm = newEmailConfirmInput.value
        const password = passwordInput.value
         
        try {
            logic.changeUserEmail(newEmail, newEmailConfirm, password, error => {
                if (error) {
                    context.handleError(error)
                    return
                }
                onChangeEmail()
                console.log('email changed')
                 
                setSuccessMessage('E-mail succefully updated')
                    
            
            })

        } catch (error) {
            context.handleError(error)
        }
    }

    const handleChangePasswordSubmit = (event) => {
        event.preventDefault()

        const passwordInput = event.target.querySelector('#current-password-input')
        const newPasswordInput = event.target.querySelector('#new-password-input')
        const newPasswordConfirmInput = event.target.querySelector('#new-password-confirm-input')

        const password = passwordInput.value
        const newPassword = newPasswordInput.value
        const newPasswordConfirm = newPasswordConfirmInput.value

        try {
            logic.changeUserPassword(password, newPassword, newPasswordConfirm, error => {
                 
                if(error) {
                    context.handleError(error)
                    return
                }

                onChangePassword()
                alert('password changed')
                            
                setSuccessMessage('Password succefully updated')
            
            })
        } catch(error) {
            context.handleError(error)
        }
    }

    return <Container>

        {successMessage && (
            <div className="success-message-container">
                <div className="success-message">{successMessage}</div>
            </div>
        )}
        <h2>Update e-mail</h2>

        <Form onSubmit={handleChangeEmailSubmit}>

            <Field id="new-email-input" type="email">New e-mail</Field>
            <Field id="new-email-confirm-input" type="email">Confirm new e-mail</Field>
            <Field id="email-password-input" type="password">Password</Field>

            <Button type="submit">Update e-mail</Button>
        </Form>

        <h2>Update password</h2>

        <Form onSubmit={handleChangePasswordSubmit}>

            <Field id="current-password-input" type="password">Current password</Field>
            <Field id="new-password-input" type="password">New password</Field>
            <Field id="new-password-confirm-input" type="password">Confirm new password</Field>

            <Button type="submit">Update password</Button>
        </Form>
    </Container>
}
