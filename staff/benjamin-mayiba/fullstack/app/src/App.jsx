import { useState } from 'react'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Feedback from './components/Feedback'

import Context from './Context'

import { ContentError, DuplicityError, NotFoundError } from './logic/errors'

function App() {
  console.log('App')

  const [view, setView] = useState('login')
  const [level, setLevel ] = useState(null)
  const [message, setMessage ] = useState(null)

  const handleRegisterShow = () => {
    setView('register')
    setMessage(null)
    setLevel(null)
  }

  const handleLoginShow = () => {
    setView('login')
    setMessage(null)
    setLevel(null)
  }

  const handleHomeShow = () => {
    setView('home')
    setMessage(null)
    setLevel(null)
  }

  const handleError = error => {
    let level = 'fatal'

    if (error instanceof TypeError || error instanceof RangeError || error instanceof ContentError)
      level = 'warn'
    else if (error instanceof DuplicityError || error instanceof NotFoundError)
      level = 'error'

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

      {view === 'login' && <Login onRegisterClick={handleRegisterShow} onSuccess={handleHomeShow} />}
      {view === 'register' && <Register onLoginClick={handleLoginShow} onSuccess={handleLoginShow} />}
      {view === 'home' && <Home onLogoutClick={handleLoginShow} />}
    </Context.Provider>
  </>
}

export default App

