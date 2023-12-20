import React from 'react'
import Login from './views/Login'
import Register from './views/Register'
import Home from './views/Home'

function App() {
  console.log('App')

  const [view, setView] = React.useState('login')

  function handleRegisterShow() {
    setView('register')
  }

  function handleLoginShow() {
    setView('login')
  }

  function handleHomeShow() {
    setView('home')
  }

  return <>
    {view === 'login' && <Login onRegisterClick={handleRegisterShow} onSuccess={handleHomeShow} />}
    {view === 'register' && <Register onLoginClick={handleLoginShow} onSuccess={handleLoginShow} />}
    {view === 'home' && <Home onLogoutClick={handleLoginShow} />}
  </>
}

export default App