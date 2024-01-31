import { useState } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'

import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Feedback from './components/Feedback'

import Context from './Context'

import logic from './logic'

import { errors } from 'com'
const { ContentError, DuplicityError, NotFoundError, TokenError } = errors

function App() {
  console.log('App')

  const [view, setView] = useState('login')
  const [level, setLevel] = useState(null)
  const [message, setMessage] = useState(null)

  const navigate = useNavigate()

  const handleRegisterShow = () => {
    navigate('/register')
    setMessage(null)
    setLevel(null)
  }

  const handleLoginShow = () => {
    navigate('/login')
    setMessage(null)
    setLevel(null)
  }

  const handleHomeShow = () => {
    navigate('/')
    setMessage(null)
    setLevel(null)
  }

  const handleError = error => {
    let level = 'fatal'

    if (error instanceof TypeError || error instanceof RangeError || error instanceof ContentError)
      level = 'warn'
    else if (error instanceof DuplicityError || error instanceof NotFoundError)
      level = 'error'
       else if(error instanceof TokenError){
        logic.logoutUser(() => navigate('/login'))
       }

    //   alert(error.message)
    setLevel(level)
    setMessage(error.message)

    console2.log(error.message, level)
  }

  const handleFeedbackAccepted = () => {
    setMessage(null)
    setLevel(null)
  }

  const context = { handleError }

  return <>
    <Context.Provider value={context}>
      {message && <Feedback level={level} message={message} onAccepted={handleFeedbackAccepted} />}
        <Routes>
        <Route path='/login' element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <Login onRegisterClick={handleRegisterShow} onSuccess={handleHomeShow} />} />
        <Route path='/register' element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <Register onLoginClick={handleLoginShow} onSuccess={handleLoginShow} />} />
        <Route path='/' element={logic.isUserLoggedIn() ? <Home onLogoutClick={handleLoginShow} /> : <Navigate to="/login" />} />
        </Routes>
    </Context.Provider>
  </>
}

export default App