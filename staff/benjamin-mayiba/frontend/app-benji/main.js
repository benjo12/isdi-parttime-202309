// storage

var users = [];

// Register

var registerView = document.getElementById("register");
var exitView = document.getElementById("exit");

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

  var user = {};

  user.name = name;
  user.email = email;
  user.password = password;

  // TO DO check user is new, otherwise show error

  var userFound = users.find(function (userCheked) {
    return (
      userCheked.name === user.name &&
      userCheked.email === user.email &&
      userCheked.password === user.password
    );
  });
  if (userFound) {
    alert("Error,this user already exists");
  } else {
    users.push(user);
  }

  nameInput.value = "";
  emailInput.value = "";
  passwordInput.value = "";
};

//login

var loginView = document.getElementById("login");

var loginRegisterLink = loginView.querySelector("a");

loginRegisterLink.onclick = function (event) {
  event.preventDefault();

  loginView.style.display = "none";
  registerView.style.display = "block";
};

// start home
var homeView = document.getElementById("home");

var h1View = homeView.querySelector("h1");

homeView.style.display = "none";
// end home

// TODO implement login functionality

var registerLoginForm = loginView.querySelector("form");

registerLoginForm.onsubmit = function (event) {
  event.preventDefault();
  var nameToDisplay = "";
  var emailLoginInput = registerLoginForm.querySelector("#email");
  var passwordLoginInput = registerLoginForm.querySelector("#password");

  var emailLogin = emailLoginInput.value;
  var passwordLogin = passwordLoginInput.value;

  var userLogged = users.find(function (user) {
    return user.email === emailLogin && user.password === passwordLogin;
  });

  if (userLogged) {
    nameToDisplay = userLogged.name;
    //console.log(`Hello,  ${nameToDisplay}`)
    //h1View.textContent = 'Hello, ' + nameToDisplay // Update the h1View content
    exitView.textContent = "Hello, " + nameToDisplay;

    //homeView.style.display = 'block';
  } else {
    alert("User is not registered. Please register the user first.");
  }

  emailLoginInput.value = "";
  passwordLoginInput.value = "";
};

// home
/*
var homeView = document.getElementById('home')

var h1View = homeView.querySelector('h1')
var h1Content = h1View.textContent
   
homeView.style.display = 'none' */

// TODO show user name logged in when entering in Home (Hello, >name<!)
