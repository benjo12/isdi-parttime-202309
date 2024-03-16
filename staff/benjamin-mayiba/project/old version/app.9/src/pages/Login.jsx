import logic from "../logic";

import { useState } from "react";

export default function Login(props) {
  console.log("Login");

  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const emailInput = event.target.querySelector("#email-input");
    const passwordInput = event.target.querySelector("#password-input");

    const email = emailInput.value;
    const password = passwordInput.value;

    // console.log(email, password)
    try {
      await logic.loginUser(email, password);

      props.onSuccess();
    } catch (error) {
      setError("Error : " + error.message);
    }
  };

  function handleRegisterClick(event) {
    event.preventDefault();

    // console.log('register click')
    props.onRegisterClick();
  }

  return (
    <div className="view login-container">
      {error && <p>{error}</p>}
      {!error && (
        <div>
          <h1>Login</h1>

          <form className="form form-login" onSubmit={handleSubmit}>
            <label htmlFor="email-input">E-mail</label>
            <input id="email-input" type="email" />

            <label htmlFor="password-input">Password</label>
            <input type="password" id="password-input" />

            <button type="submit">Login</button>
          </form>
         
          <a className="link" href="" onClick={handleRegisterClick}>
            Register
          </a>
        </div>
      )}
    </div>
  );
}
