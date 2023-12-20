// REGISTER

function Register(props) {
    console.log('Register')

    // LOGIN LINK
    function handleLoginClick(event) {
        event.preventDefault()

        props.onLoginClick()
        // Pasamos el elemento 'props' con el método de click de Login

    }

    // FORM
    function handleSubmit(event) {
        event.preventDefault()

        const nameInput = event.target.querySelector('#name')
        const emailInput = event.target.querySelector('#email')
        const passwordInput = event.target.querySelector('#password')

        const name = nameInput.value
        const email = emailInput.value
        const password = passwordInput.value

        try {
            logic.registerUser(name, email, password, error => {
                if (error) {
                    alert(error.message)
                    // Nos traemos todos los errores recogidos de los callback mediante ALERT

                    return
                }

                props.onSuccess()
                // Nos redirige a la vista de 'login' en APP
            })

        } catch (error) {
            alert(error.message)
        }
    }

    // TEMPLATE
    return <div className="view">
        <h1>Register</h1>

        <form className="form" onSubmit={handleSubmit}>
            <label htmlFor="name">Username</label>
            <input id="name" type="text" />

            <label htmlFor="email">Email</label>
            <input id="email" type="text" />

            <label htmlFor="password">Password</label>
            <input id="password" type="password" />

            <button className="button-submit">Register</button>
        </form>

        <p>Go back to login!</p>
        <a href="" onClick={handleLoginClick}>Login</a>
    </div>
}