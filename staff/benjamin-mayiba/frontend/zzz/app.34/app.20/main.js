// logic

const logic = new Logic

// react

const root = ReactDOM.createRoot(document.getElementById('root'))

const h1 = React.createElement('h1', null, 'Login')

const emailLabel = React.createElement('label', { htmlFor: 'email-input' }, 'E-mail')
const emailInput = React.createElement('input', { id: 'email-input', type: 'email' })

const passwordLabel = React.createElement('label', { htmlFor: 'password-input' }, 'Password')
const passwordInput = React.createElement('input', { id: 'password-input', type: 'password' })

const button = React.createElement('button', { type: 'submit' }, 'Login')

const form = React.createElement('form', { className: 'form' }, emailLabel, emailInput, passwordLabel, passwordInput, button)

const a = React.createElement('a', { href: '' }, 'Register')

const loginView = React.createElement('div', { className: 'view' }, h1, form, a)

root.render(loginView)