export default function Profile(){
      console.log('Profile')

        return <div className="container">
               {/* <h2>Update e-mail</h2>*/} 
             <br/>
            <form className="form">
                <label htmlFor="new-email-input">New e-mail</label>
                <input className="input" id="new-email-input" type="email" />

                <label htmlFor="new-email-confirm-input">Confirm new e-mail</label>
                <input className="input" id="new-email-confirm-input" type="email" />

                <label htmlFor="password-input">Password</label>
                <input className="input" type="password" id="password-input" />

                <button type="submit">Update e-mail</button>
            </form>
            <br/>

             {/* <h2>Update password</h2>*/} <br/>

            <form className="form">
                <label htmlFor="password-input">Current password</label>
                <input className="input" type="password" id="password-input" />

                <label htmlFor="new-password-input">New password</label>
                <input className="input" id="new-password-input" type="password" />

                <label htmlFor="new-password-confirm-input">Confirm new password</label>
                <input className="input" id="new-password-confirm-input" type="password" />

                <button type="submit">Update password</button>
            </form>
    </div>
}
