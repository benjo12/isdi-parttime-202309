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

        const newEmail = event.target.querySelector('#new-email-input').value
        const newEmailConfirm = event.target.querySelector('#new-email-confirm-input').value
        const password = event.target.querySelector('#email-password-input').value
         
        try {
            logic.changeUserEmail(newEmail, newEmailConfirm, password, error => {
                if (error) {
                    context.handleError(error)
                    return
                }
                  // Limpiar los campos después de la actualización exitosa
                    event.target.querySelector('#new-email-input').value = ''
                    event.target.querySelector('#new-email-confirm-input').value = ''
                    event.target.querySelector('#email-password-input').value = ''

                setSuccessMessage('E-mail succefully updated')
                    
            
                onChangeEmail()

            
            })

        } catch (error) {
            context.handleError(error)
        }
    }

    const handleChangePasswordSubmit = (event) => {
        event.preventDefault()

        const password = event.target.querySelector('#current-password-input').value
        const newPassword = event.target.querySelector('#new-password-input').value
        const newPasswordConfirm = event.target.querySelector('#new-password-confirm-input').value

        try {
            logic.changeUserPassword(password, newPassword, newPasswordConfirm, error => {

                if(error) {
                    context.handleError(error)
                    return
                }

                            
                    // Limpiar los campos después de la actualización exitosa
                    event.target.querySelector('#current-password-input').value = ''
                    event.target.querySelector('#new-password-input').value = ''
                    event.target.querySelector('#new-password-confirm-input').value = ''
                    alert('email changed')
                    setSuccessMessage('Password succefully updated')

                    onChangePassword()
            
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
