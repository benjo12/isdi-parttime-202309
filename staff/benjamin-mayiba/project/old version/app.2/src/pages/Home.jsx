import logic from '../logic'
import { useState, useEffect } from 'react'

export default function Home(props){

  const [name, setName] = useState(null)
     
  const handleLogoutClick = event =>{
    event.preventDefault()
    props.onLogout()
  }

  useEffect(() => {
    (async() => {
      try {
        const user = await logic.retrieveUser()
        setName(user.name)
      } catch (error) {
        alert(error.message)
      } 
    })()
  },[])

  return (
      <div>
      <header className='header'>

        <div>
          <h1>Bienvenid@, <a href=''>{name}</a></h1>
        </div>
        <a href=''><button className='btn' onClick={handleLogoutClick}>Logout</button></a>
        
      </header>
  
      </div>
  )
}
