import logic from "../logic";
import { useState } from "react";

export default function Register(props) {
  const [error, setError] = useState(null);
  console.log("Register");

  const  handleSubmit = async (event) => {
    event.preventDefault();

    const nameInput = event.target.querySelector("#name-input");
    const emailInput = event.target.querySelector("#email-input");
    const passwordInput = event.target.querySelector("#password-input");

    const name = nameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;

    // console.log(name, email, password)

    try {
      await logic.registerUser(name, email, password);

      props.onSuccess();
    } catch (error) {
      setError("Error : " + error.message);
    }
  }

  function handleLoginClick(event) {
    event.preventDefault();

    // console.log('login click')
    props.onLoginClick();
  }

  return (
    <div className="view">
      {error && <p>{error}</p>}
      {!error && (
        <div>
          <h1>Register</h1>

          <form className="form form-register" onSubmit={handleSubmit}>
            <label className="label" htmlFor="name-input">Name</label>
            <input className="input" id="name-input" type="text" />

            <label className="label" htmlFor="email-input">E-mail</label>
            <input className="input" id="email-input" type="email" />

            <label className="label"  htmlFor="password-input">Password</label>
            <input className="input"  type="password" id="password-input" />

            <button className="button" type="submit">Register</button>
          </form>

          <a className="link" href="" onClick={handleLoginClick}>
            Login
          </a>
        </div>
      )}
    </div>
  );
}
