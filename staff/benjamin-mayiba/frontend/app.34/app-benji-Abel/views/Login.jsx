// LOGIN

function Login(props) {
    console.log('Login')

    // REGISTER LINK
    function handleRegisterClick(event) {
        event.preventDefault()

        props.onRegisterClick()
        // Pasamos el elemento 'props' con el método de click de Register
    }

    // FORM
    function handleSubmit(event) {
        event.preventDefault()

        const emailInput = event.target.querySelector('#email')
        const passwordInput = event.target.querySelector('#password')
        // Usamos 'target' porque todo (event) del DOM apunta a un sitio, en este caso, al formulario del componente Login

        const email = emailInput.value
        const password = passwordInput.value

        try {
            logic.loginUser(email, password, error => {
                if (error) {
                    alert(error.message)
                    // Nos traemos todos los errores recogidos de los callback mediante ALERT

                    return
                }

                props.onSuccess()
                // Nos redirige a la vista de 'home' en APP
            })

        } catch (error) {
            alert(error.message)
        }
    }

    // TEMPLATE
    return <div className="view">
        <h1>Login</h1>

        <form className="form" onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input id="email" type="text" />

            <label htmlFor="password">Password</label>
            <input id="password" type="password" />

            <button className="button-submit">Login</button>
        </form>

        <p>Don't have an account yet?</p>
        <a href="" onClick={(handleRegisterClick)}>Create one here!</a>
    </div>
}