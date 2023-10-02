var registerView = document.getElementById("register");

registerView.style.display = "none";

var registerLoginLink = registerView.querySelector("a");

registerLoginLink.onclick = function (event) {
  event.preventDefault();

  registerView.style.display = "none";
  loginView.style.display = "block";
};

var registerForm = registerView.querySelector("form");

registerForm.onsubmit = function (event) {
  event.preventDefault();

  var nameInput = registerForm.querySelector("#name");
  var emailInput = registerForm.querySelector("#email");
  var passwordInput = registerForm.querySelector("#password");

  var name = nameInput.value;
  var email = emailInput.value;
  var password = passwordInput.value;

  try {
    registerUser(name, email, password);

    nameInput.value = "";
    emailInput.value = "";
    passwordInput.value = "";

    registerView.style.display = "none";
    loginView.style.display = "block";
  } catch (error) {
    alert(error.message);
  }
};

// login

var loginView = document.getElementById("login");
var loginRegisterLink = loginView.querySelector("a");

loginRegisterLink.onclick = function (event) {
  event.preventDefault();

  loginView.style.display = "none";
  registerView.style.display = "block";
};

var loginForm = loginView.querySelector("form");

loginForm.onsubmit = function (event) {
  event.preventDefault();

  var emailInput = loginForm.querySelector("#email");
  var passwordInput = loginForm.querySelector("#password");

  var email = emailInput.value;
  var password = passwordInput.value;

  try {
    authenticateUser(email, password);

    emailInput.value = "";
    passwordInput.value = "";

    var homeTitle = homeView.querySelector("h1");

    var user = retrieveUser(email);

    homeTitle.innerText = "Hello, " + user.name + "!";

    loginView.style.display = "none";
    homeView.style.display = "block";
  } catch (error) {
    alert(error.message);
  }
};

// home

var homeView = document.getElementById("home");

homeView.style.display = "none";

// Empiezo aqui

var logoutButton = document.getElementById("logout");
var emailForm = document.getElementById("emailForm");
var emailLink = document.getElementById("emailLink");
var passwordForm = document.getElementById("passwordForm");
var passwordLink = document.getElementById("passwordLink");

// Initially hide emailForm and passwordForm
emailForm.style.display = "block";
passwordForm.style.display = "none";

logoutButton.onclick = function (event) {
  event.preventDefault();
  homeView.style.display = "none";
  loginView.style.display = "block";
};
// email process
emailLink.onclick = function (event) {
  event.preventDefault();
  emailForm.style.display = "block";
  passwordForm.style.display = "none";
};
emailForm.onsubmit = function (event) {
  event.preventDefault();

  var emailInput = emailForm.querySelector("#email");
  var newEmailInput = emailForm.querySelector("#newemail");

  var email = emailInput.value;
  var newEmail = newEmailInput.value;
  try {
    validateText(email, "email");
    validateText(newEmail, "new email");
    changeEmail(email, newEmail);

    emailInput.value = " ";
    newEmailInput.value = " ";

    homeView.style.display = "none";
    loginView.style.display = "block";
  } catch (error) {
    alert(error.message);
  }
};

passwordLink.onclick = function (event) {
  event.preventDefault();
  emailForm.style.display = "none";
  passwordForm.style.display = "block";
};

passwordForm.onsubmit = function (event){
  event.preventDefault();

  var passwordInput = passwordForm.querySelector("#password")
  var newPasswordInput = passwordForm.querySelector("#newpassword")
  var confirmPasswordInput = passwordForm.querySelector("#confirmpassword")

  var password = passwordInput.value
  var newPassword = newPasswordInput.value
  var confirmPassword = confirmPasswordInput.value

  try {

    validateText(password, "Password")
    validateText(newPassword , "New password")
    validateText(confirmPassword , "Confirm password")

    changePassword(password,newPassword,confirmPassword)

    passwordInput.value = ''
    newPasswordInput.value = ''
    confirmPasswordInput.value = ''

    homeView.style.display = "none"
    loginView.style.display = "block"
  } catch (error) {
    alert(error.message)
  }

}
// TODO show user name logged in when entering in Home (Hello, >name<!)
