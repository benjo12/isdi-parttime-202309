var registerView = document.getElementById('register-view')

registerView.style.display = 'none'

var registerLoginLink = registerView.querySelector('a')

registerLoginLink.onclick = function (event) {
    event.preventDefault()

    registerView.style.display = 'none'
    loginView.style.display = 'block'
}

var registerForm = registerView.querySelector('form')

registerForm.onsubmit = function (event) {
    event.preventDefault()

    var nameInput = registerForm.querySelector('#name-input')
    var emailInput = registerForm.querySelector('#email-input')
    var passwordInput = registerForm.querySelector('#password-input')

    var name = nameInput.value
    var email = emailInput.value
    var password = passwordInput.value

    try {
        registerUser(name, email, password)

        nameInput.value = ''
        emailInput.value = ''
        passwordInput.value = ''

        registerView.style.display = 'none'
        loginView.style.display = 'block'
    } catch (error) {
        alert(error.message)
    }
}

// login

var loginView = document.getElementById('login-view')
var loginRegisterLink = loginView.querySelector('a')

loginRegisterLink.onclick = function (event) {
    event.preventDefault()

    loginView.style.display = 'none'
    registerView.style.display = 'block'
}

var loginForm = loginView.querySelector('form')

var emailLoggedIn = null

loginForm.onsubmit = function (event) {
    event.preventDefault()

    var emailInput = loginForm.querySelector('#email-input')
    var passwordInput = loginForm.querySelector('#password-input')

    var email = emailInput.value
    var password = passwordInput.value

    try {
        authenticateUser(email, password)

        emailInput.value = ''
        passwordInput.value = ''

        var homeTitle = homeView.querySelector('h1')

        var user = retrieveUser(email)

        homeTitle.innerText = 'Hello, ' + user.name + '!'

        emailLoggedIn = email

        loginView.style.display = 'none'
        homeView.style.display = 'block'
    } catch (error) {
        alert(error.message)
    }
}

// home

var homeView = document.getElementById('home-view')

homeView.style.display = 'none'

var logoutButton = homeView.querySelector('#logout-button')

logoutButton.onclick = function () {
    homeView.style.display = 'none'
    loginView.style.display = 'block'
}

var changeEmailForm = homeView.querySelector('#change-email-form')

changeEmailForm.onsubmit = function (event) {
    event.preventDefault()

    var newEmailInput = changeEmailForm.querySelector('#new-email-input')
    var newEmailConfirmInput = changeEmailForm.querySelector('#new-email-confirm-input')
    var passwordInput = changeEmailForm.querySelector('#password-input')

    var newEmail = newEmailInput.value
    var newEmailConfirm = newEmailConfirmInput.value
    var password = passwordInput.value

    try {
        changeUserEmail(emailLoggedIn, newEmail, newEmailConfirm, password)

        emailLoggedIn = newEmail

        alert('E-mail changed')

        newEmailInput.value = ''
        newEmailConfirmInput.value = ''
        passwordInput.value = ''
    } catch (error) {
        alert(error.message)
    }
}

var changePasswordForm = homeView.querySelector('#change-password-form')

changePasswordForm.onsubmit = function (event) {
    event.preventDefault()

    var passwordInput = changePasswordForm.querySelector('#password-input')
    var newPasswordInput = changePasswordForm.querySelector('#new-password-input')
    var newPasswordConfirmInput = changePasswordForm.querySelector('#new-password-confirm-input')

    var password = passwordInput.value
    var newPassword = newPasswordInput.value
    var newPasswordConfirm = newPasswordConfirmInput.value

    try {
        changeUserPassword(emailLoggedIn, newPassword, newPasswordConfirm, password)

        alert('Password changed')

        passwordInput.value = ''
        newPasswordInput.value = ''
        newPasswordConfirmInput.value = ''
    } catch (error) {
        alert(error.message)
    }
}