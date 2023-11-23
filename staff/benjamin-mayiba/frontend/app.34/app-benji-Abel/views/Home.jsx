// HOME

function Home(props) {
  console.log('Home')

  // STATE VIEWS's
  const [view, setView] = React.useState(null)

  // STATE NAME (Profile) & ID (Posts-Favs)
  const [name, setName] = React.useState(null)
  const [id, setId] = React.useState(null)

  // STATE POSTS - FAVS
  const [posts, setPosts] = React.useState(null)
  const [favs, setFavs] = React.useState(null)

  // STATE & EFFECT - NAME
  React.useEffect(() => {
      console.log('Home -> Effect (name-id)')

      try {
          logic.retrieveUser((error, user) => {
              if (error) {
                  alert(error.message)

                  return
              }

              setName(user.name)
              // Guardamos en STATE el user para usar el "NAME"
              setId(user.id)
              // Guardamos en STATE el user para usar el "ID"
          })
      } catch (error) {
          alert(error.message)
      }
  }, [])

  // STATE & EFFECT - POSTS
  React.useEffect(() => {
      console.log('Home -> Effect (posts)')

      refreshPosts()
  }, [])

  // RENDER POSTS & FAVS POSTS
  function refreshPosts() {
      if (view === null || view === 'new-post') {
          try {
              logic.retrievePosts((error, posts) => {
                  if (error) {
                      alert(error.message)

                      return
                  }

                  posts.reverse()

                  setPosts(posts)
                  // Renderizamos la vista de los posts
              })
          } catch (error) {
              alert(error.message)
          }
      } else if (view === 'favs') {
          try {
              logic.retrieveFavUserPosts((error, favs) => {
                  if (error) {
                      alert(error.message)

                      return
                  }

                  favs.reverse()

                  setFavs(favs)
                  // Renderizamos la vista de los favoritos
              })
          } catch (error) {
              alert(error.message)
          }
      }
  }

  // LOGOUT
  function handleLogoutClick() {
      logic.logoutUser(error => {
          if (error) {
              alert(error.message)

              return
          }
      })

      props.onLogoutClick()
      // Mediante 'props' nos traemos de APP la función de cambiar la vista a 'LOGIN'
  }

  // SETTINGS BUTTON
  function handleProfileClick(event) {
      event.preventDefault()

      setView('profile')
      // Cambiamos la vista a 'profile'
  }

  // SETTINGS - CHANGE EMAIL
  function handleChangeEmailSubmit(event) {
      event.preventDefault()

      const newEmailInput = event.target.querySelector('#new-email')
      const confirmNewEmailInput = event.target.querySelector('#confirm-new-email')
      const passwordInput = event.target.querySelector('#password')

      const newEmail = newEmailInput.value
      const confirmNewEmail = confirmNewEmailInput.value
      const password = passwordInput.value

      try {
          logic.changeUserEmail(newEmail, confirmNewEmail, password, error => {
              if (error) {
                  alert(error.message)

                  return
              }

              alert('Email changed successfully!')

          })

      } catch (error) {
          alert(error.message)
      }
  }

  // SETTINGS - CHANGE PASSWORD
  function handleChangePasswordSubmit(event) {
      event.preventDefault()

      const passwordInput = event.target.querySelector('#current-password')
      const newPasswordInput = event.target.querySelector('#new-password')
      const againNewPasswordInput = event.target.querySelector('#again-new-password')

      const password = passwordInput.value
      const newPassword = newPasswordInput.value
      const againNewPassword = againNewPasswordInput.value

      try {
          logic.changeUserPassword(password, newPassword, againNewPassword, error => {
              if (error) {
                  alert(error.message)

                  return
              }

              alert('Password changed successfully!')
          })

      } catch (error) {
          alert(error.message)
      }
  }

  // HOME BUTTON
  function handleHomeClick(event) {
      event.preventDefault()

      setView(null)
      // Cambiamos la vista a 'null' - home
  }

  // LIST FAVS POSTS 
  function handleFavsPostsClick() {
      try {
          logic.retrieveFavUserPosts((error, favs) => {
              if (error) {
                  alert(error.message)

                  return
              }

              favs.reverse()

              setFavs(favs)
              // Estado de los favoritos
              setView('favs')
              // Cambiamos la vista a 'FAVS'

          })
      } catch (error) {
          alert(error.message)
      }
  }

  // NEW POST BUTTON
  function handleNewPostClick() {
      setView('new-post')
      // Cambiamos la vista a 'new-post'
  }

  // CANCEL NEW POST
  function handleCancelNewPostClick(event) {
      event.preventDefault()

      setView('null')
      // Cambiamos la vista a 'null' - home
  }

  // CREATE NEW POST
  function handleNewPostSubmit(event) {
      event.preventDefault()

      const imageInput = event.target.querySelector('#image-input')
      const textInput = event.target.querySelector('#text-input')

      const image = imageInput.value
      const text = textInput.value

      try {
          logic.publishPost(image, text, error => {
              if (error) {
                  alert(error.message)

                  return
              }

              try {
                  logic.retrievePosts((error, posts) => {
                      if (error) {
                          alert(error.message)

                          return
                      }

                      posts.reverse()

                      setPosts(posts)
                      // Estado de los posts
                      setView(null)
                      // Cambiamos la vista a "NULL" (los posts)
                  })
              } catch (error) {
                  alert(error.message)
              }
          })

      } catch (error) {
          alert(error.message)
      }
  }

  // LIKE BUTTON
  function handleToggleLikeClick(postId) {
      try {
          logic.toggleLikePost(postId, error => {
              if (error) {
                  alert(error.message)

                  return
              }

              refreshPosts()
              // Hacemos un repintado de los posts-favs
          })

      } catch (error) {
          alert(error.message)
      }
  }

  // DELETE BUTTON
  function handleToggleDeletePostClick(postId) {
      if (confirm('Are you sure that you want to delete this post?')) {

          try {
              logic.deletePost(postId, error => {
                  if (error) {
                      alert(error.message)

                      return
                  }

                  refreshPosts()
                  // Hacemos un repintado de los posts-favs
              })

          } catch (error) {
              alert(error.message)
          }
      }
  }

  // FAVS POST BUTTON
  function handleToggleFavPostClick(postId) {
      try {
          logic.toggleFavPost(postId, error => {
              if (error) {
                  alert(error.message)

                  return
              }

              refreshPosts()
              // Hacemos un repintado de los posts-favs
          })

      } catch (error) {
          alert(error.message)
      }
  }

  // TEMPLATE
  return <div className="home-view">

      <header className="home-header">
          <h1><a href="" onClick={handleHomeClick}>Home</a></h1>

          <div>
              <button className="button-submit" onClick={handleNewPostClick}>+</button> <a href="" onClick={handleProfileClick}>{name}</a> <button className="button-submit" onClick={handleFavsPostsClick}>Favs</button> <button className="button-submit" onClick={handleLogoutClick}>Logout ❌</button>
          </div>
      </header>

      {view === 'profile' && <div className="view">
          <h2>Changes credentials</h2>

          <form className="form" onSubmit={handleChangeEmailSubmit}>
              <h3>Change your email: </h3>

              <label htmlFor="new-email">New email</label>
              <input id="new-email" type="email" />

              <label htmlFor="confirm-new-email">Confirm new email</label>
              <input id="confirm-new-email" type="email" />

              <label htmlFor="password">Password</label>
              <input id="password" type="password" />

              <button className='button-submit' type="submit">Change Email</button>
          </form>

          <form className="form" onSubmit={handleChangePasswordSubmit}>
              <h3>Change your password: </h3>

              <label htmlFor="current-password">Actual password</label>
              <input id="current-password" type="password" />

              <label htmlFor="new-password">New password</label>
              <input id="new-password" type="password" />

              <label htmlFor="again-new-password">Confirm new password</label>
              <input id="again-new-password" type="password" />

              <button className='button-submit' type="submit">Change Password</button>
          </form>

      </div>}

      {view === 'new-post' && <div className="view">
          <h2>New Post</h2>

          <form className="form" onSubmit={handleNewPostSubmit}>
              <label htmlFor="image-input">Image</label>
              <input id="image-input" type="url" />

              <label htmlFor="text-input">Text</label>
              <input id="text-input" type="text" />

              <button className='button-submit' type="submit">Post</button>
              <button className='button-submit' onClick={handleCancelNewPostClick}>Cancel</button>
          </form>
      </div>}

      {view !== 'profile' && view !== 'favs' && posts !== null && <div className='view'>
          {posts.map((post) => <article key={post.id} className="post">
              <h2>{post.author.email}</h2>
              <img className='post-img' src={post.image} />
              <p>{post.text}</p>
              <div className="buttons-post">
                  <button className='button-submit' onClick={() => handleToggleLikeClick(post.id)}>{post.liked ? '❤️' : '🤍'} {post.likes.length} likes</button>
                  <button className='button-submit' onClick={() => handleToggleFavPostClick(post.id)}>{post.fav ? '⭐' : '☆'}Fav</button>
                  {post.author.id === id && (<button className='button-submit' onClick={() => handleToggleDeletePostClick(post.id)}>Delete post</button>)}
              </div>
          </article>)}
      </div>}

      {view === 'favs' && <div className="view">
          <h1>⭐ All your favorite posts ⭐</h1>
          {favs.map((fav) => <article key={fav.id} className="post">
              <h2>{fav.author.email}</h2>
              <img className="post-img" src={fav.image} />
              <p>{fav.text}</p>
              <div className="buttons-post">
                  <button className='button-submit' onClick={() => handleToggleLikeClick(fav.id)}>{fav.liked ? '❤️' : '🤍'} {fav.likes.length} likes</button>
                  <button className='button-submit' onClick={() => handleToggleFavPostClick(fav.id)}>{fav.fav ? '⭐' : '☆'}Fav</button>
                  {fav.author.id === id && (<button className='button-submit' onClick={() => handleToggleDeletePostClick(fav.id)}>Delete post</button>)}
              </div>
          </article>)}
      </div>}
  </div >
}