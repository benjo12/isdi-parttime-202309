import logic from '../logic'
import { useState, useEffect } from 'react'

export default function Profile({onChangeEmail, onChangePassword}){

    const [successMessage, setSuccessMessage] = useState('')
    const [error, setError] = useState(null);

    const [newEmail, setNewEmail] = useState('')
    const [confirmEmail, setConfirmEmail] = useState('')
    const [passwordEmail, setPasswordEmail ] = useState('')

    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')

    console.log('Profile')

    const handleChangeEmailSubmit = async(event) =>{
        event.preventDefault()

        try {
            await logic.changeUserEmail(newEmail, confirmEmail, passwordEmail)
            setSuccessMessage('E-mail successfully updated')

        } catch (error) {
            setError("Error : " + error.message);
        }
    }
    
    const handleChangePasswordSubmit = async(event) =>{
        event.preventDefault()

        try {
            await logic.changeUserPassword(currentPassword, newPassword, passwordConfirm)
            setSuccessMessage('Password successfully updated')

        } catch (error) {
            setError("Error : " + error.message);
        }
    }

    useEffect(() => {
        if (successMessage) {
            // Restablecer los campos del formulario
            setNewEmail('')
            setConfirmEmail('')
            setPasswordEmail('')
            setCurrentPassword('')
            setNewPassword('')
            setPasswordConfirm('')
        }
    }, [successMessage])

    return (
        <div className="container">

            {error && <p>{error}</p>}
            {!error && successMessage && <p>{successMessage}</p>} 
            {!error && !successMessage && (
                <div>
                    <br/>
                    <form className="form" onSubmit={handleChangeEmailSubmit}>
                        <label htmlFor="new-email-input">New e-mail</label>
                        <input className="input" id="new-email-input" type="email" value={newEmail} onChange={e => setNewEmail(e.target.value)} />
                        <label htmlFor="new-email-confirm-input">Confirm new e-mail</label>
                        <input className="input" id="new-email-confirm-input" type="email" value={confirmEmail} onChange={e => setConfirmEmail(e.target.value)} />
                        <label htmlFor="password-input">Password</label>
                        <input className="input" type="password" id="password-input" value={passwordEmail} onChange={e => setPasswordEmail(e.target.value)} />
                        <button type="submit">Update e-mail</button>
                    </form>
                    <br/>
                    <form className="form" onSubmit={handleChangePasswordSubmit}>
                        <label htmlFor="password-input">Current password</label>
                        <input className="input" type="password" id="password-input" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} />
                        <label htmlFor="new-password-input">New password</label>
                        <input className="input" id="new-password-input" type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
                        <label htmlFor="new-password-confirm-input">Confirm new password</label>
                        <input className="input" id="new-password-confirm-input" type="password" value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)} />
                        <button type="submit">Update password</button>
                    </form>
                </div>
            )}
        </div>
    )
}
