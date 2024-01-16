import logic from '../logic'

import { Button, Form, Field, Container } from '../library'
import { useState } from 'react'

// eslint-disable-next-line react/prop-types
export default function Profile({ onChangeEmail, onChangePassword }) {

    const [successMessage, setSuccessMessage] = useState(null)
    console.log('Profile')

    const handleChangeEmailSubmit = (event) => {
        event.preventDefault()

        const newEmail = event.target.querySelector('#new-email-input').value
        const newEmailConfirm = event.target.querySelector('#new-email-confirm-input').value
        const password = event.target.querySelector('#password-input').value
         
        try {
            logic.changeUserEmail(newEmail, newEmailConfirm, password, error => {
                if (error) {
                    alert(error.message)
                    return
                }
                  // Limpiar los campos después de la actualización exitosa
                    event.target.querySelector('#new-email-input').value = ''
                    event.target.querySelector('#new-email-confirm-input').value = ''
                    event.target.querySelector('#password-input').value = ''

                setSuccessMessage('E-mail succefully updated')
                    
            
                onChangeEmail()

            
            })

        } catch (error) {
            alert(error.message)
        }
    }

    const handleChangePasswordSubmit = (event) => {
        event.preventDefault()

        const password = event.target.querySelector('#password-input').value
        const newPassword = event.target.querySelector('#new-password-input').value
        const newPasswordConfirm = event.target.querySelector('#new-password-confirm-input').value

        try {
            logic.changeUserPassword(password, newPassword, newPasswordConfirm, error => {

                if (error) {
                    alert(error.message)
                    return
                }

                            
                    // Limpiar los campos después de la actualización exitosa
                    event.target.querySelector('#password-input').value = ''
                    event.target.querySelector('#new-password-input').value = ''
                    event.target.querySelector('#new-password-confirm-input').value = ''
                    
                    setSuccessMessage('Password succefully updated')

                    onChangePassword()
            
            })
        } catch (error) {
            alert(error.message)
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
            <Field id="password-input" type="password">Password</Field>

            <Button type="submit">Update e-mail</Button>
        </Form>

        <h2>Update password</h2>

        <Form onSubmit={handleChangePasswordSubmit}>

            <Field id="password-input" type="password">Current password</Field>
            <Field id="new-password-input" type="password">New password</Field>
            <Field id="new-password-confirm-input" type="password">Confirm new password</Field>

            <Button type="submit">Update password</Button>
        </Form>
    </Container>
}
