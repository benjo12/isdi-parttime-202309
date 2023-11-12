function Home(props) {
  console.log("Home");

  // useState es un hook que te permite añadir estado a los componentes funcionales

  // Estado para la vista actual
  const viewState = React.useState(null);

  const view = viewState[0];
  const setView = viewState[1];

  // Estado para los posts favoritos .
  // setFavPosts es la función que se utiliza para actualizar el valor de favPosts.
  const [favPosts, setFavPosts] = React.useState(null);

  // Estado para la marca de tiempo
  const timestampState = React.useState(null);
  //const timestamp = timestampState[0]
  const setTimestamp = timestampState[1];

  // Función para manejar el clic en el botón de logout
  function handleLogoutClick() {
    logic.logoutUser();

    props.onLogoutClick();
  }

  // Variables para el nombre y el usuario
  let name = null;
  let user = null;

  // Intentar obtener el usuario actual
  try {
    user = logic.retrieveUser();
    name = user.name;
  } catch (error) {
    alert(error.message);
  }

  // Función para manejar el clic en el enlace del perfil
  function handleProfileClick(event) {
    event.preventDefault();

    setView("profile");
  }

  // Función para manejar el clic en el enlace de inicio
  function handleHomeClick(event) {
    event.preventDefault();

    setView(null);
  }

  // Función para manejar el clic en el botón de nuevo post
  function handleNewPostClick() {
    setView("new-post");
  }

  // Función para manejar el clic en el botón de cancelar nuevo post

  function handleCancelNewPostClick(event) {
    event.preventDefault();

    setView(null);
  }
  // start Fav implementation   TODO

  // Función para manejar el clic en el enlace de favoritos
  function handleFavClick(event) {
    event.preventDefault();

    setView("favorite");
  }

  // Efecto secundario para cargar los posts favoritos cuando la vista cambia a 'favorite'
  React.useEffect(() => {
    if (view === "favorite") {
      try {
        // Obtener los posts favoritos y actualizar el estado
        const loadedFavPosts = logic.retrieveFavPosts();
        setFavPosts(loadedFavPosts);

        setTimestamp(Date.now());
      } catch (error) {
        alert(error.message);
        // Volver a la vista principal (home)
        setView(null);
      }
    }
  }, [view]); // Este useEffect se ejecutará cada vez que cambie la vista

  // End

  let posts = null;

  try {
    posts = logic.retrievePosts();
    console.log(posts);

    posts.reverse();
  } catch (error) {
    alert(error.message);
  }

  function handleNewPostSubmit(event) {
    event.preventDefault();

    const imageInput = event.target.querySelector("#image-input");
    const textInput = event.target.querySelector("#text-input");

    const image = imageInput.value;
    const text = textInput.value;

    try {
      logic.publishPost(image, text);

      setView(null);
    } catch (error) {
      alert(error.message);
    }
  }

  function handleToggleLikePostClick(postId) {
    try {
      logic.toggleLikePost(postId);

      setTimestamp(Date.now());
    } catch (error) {
      alert(error.message);
    }
  }

  // Start TO DO
  function handleUpdateEmailSubmit(event) {
    event.preventDefault();

    const newEmailInput = event.target.querySelector("#new-email-input");
    const newEmailConfirmInput = event.target.querySelector(
      "#new-email-confirm-input"
    );
    const passwordInput = event.target.querySelector("#password-input");

    const newEmail = newEmailInput.value;
    const newEmailConfirm = newEmailConfirmInput.value;
    const password = passwordInput.value;

    try {
      logic.changeUserEmail(newEmail, newEmailConfirm, password);

      setView(null);
    } catch (error) {
      alert(error.message);
    }
  }

  function handleUpdatePasswordSubmit(event) {
    event.preventDefault();

    const passwordInput = event.target.querySelector("#password-input");
    const newPasswordInput = event.target.querySelector("#new-password-input");
    const newPasswordConfirmInput = event.target.querySelector(
      "#new-password-confirm-input"
    );

    const password = passwordInput.value;
    const newPassword = newPasswordInput.value;
    const newPasswordConfirm = newPasswordConfirmInput.value;

    try {
      logic.changeUserPassword(newPassword, newPasswordConfirm, password);

      setView(null);
    } catch (error) {
      alert(error.message);
    }
  }

  function handleFavPostClick(postId) {
    try {
      logic.toggleFavPost(postId);

      setTimestamp(Date.now());
    } catch (error) {
      alert(error.message);
    }
  }

  function handleDeletePostButtonClick(postId) {
    if (confirm("Are you sure you want to delete this post?")) {
      try {
        logic.deletePost(postId);

        setTimestamp(Date.now());
      } catch (error) {
        alert(error.message);
      }
    }
  }

  return (
    <div>
      <header className="home-header">
        <h1>
          <a href="" onClick={handleHomeClick}>
            Home
          </a>
        </h1>

        <div>
          <button onClick={handleNewPostClick}>+</button>{" "}
          <a href="" onClick={handleFavClick}>
            Fav
          </a>{" "}
          <a href="" onClick={handleProfileClick}>
            {name}
          </a>{" "}
          <button onClick={handleLogoutClick}>Logout</button>
        </div>
      </header>

      {view === "profile" && (
        <div className="view">
          <h2>Update e-mail</h2>

          <form className="form" onSubmit={handleUpdateEmailSubmit}>
            <label htmlFor="new-email-input">New e-mail</label>
            <input id="new-email-input" type="email" />

            <label htmlFor="new-email-confirm-input">Confirm new e-mail</label>
            <input id="new-email-confirm-input" type="email" />

            <label htmlFor="password-input">Password</label>
            <input type="password" id="password-input" />

            <button type="submit">Update e-mail</button>
          </form>

          <h2>Update password</h2>

          <form className="form" onSubmit={handleUpdatePasswordSubmit}>
            <label htmlFor="password-input">Current password</label>
            <input type="password" id="password-input" />

            <label htmlFor="new-password-input">New password</label>
            <input id="new-password-input" type="password" />

            <label htmlFor="new-password-confirm-input">
              Confirm new password
            </label>
            <input id="new-password-confirm-input" type="password" />

            <button type="submit">Update password</button>
          </form>
        </div>
      )}

      {view === "new-post" && (
        <div className="view">
          <h2>New post</h2>

          <form className="form" onSubmit={handleNewPostSubmit}>
            <label htmlFor="image-input">Image</label>
            <input type="url" id="image-input" />

            <label htmlFor="text-input">Text</label>
            <input type="text" id="text-input" />

            <button type="submit">Post</button>
            <button onClick={handleCancelNewPostClick}>Cancel</button>
          </form>
        </div>
      )}

      {view === "favorite" && favPosts !== null && (
        <div>
          <h1>Bienvenido al panel de favoritos</h1>

          {favPosts.map((post) => {
            function handleToggleLikeButtonClick() {
              handleToggleLikePostClick(post.id);
            }

            return (
              <article key={post.id} className="post">
                <h2>{post.author.name}</h2>
                <img className="post-image" src={post.image} />
                <p>{post.text}</p>
                <button onClick={handleToggleLikeButtonClick}>
                  {post.liked ? "❤️" : "🤍"} {post.likes.length} likes
                </button>
                <button onClick={() => handleFavPostClick(post.id)}>
                  {post.fav ? "✨" : "❤️"}Fav
                </button>
                {user && user.id && user.id === post.author.id && (
                  <button onClick={() => handleDeletePostButtonClick(post.id)}>
                    Delete post
                  </button>
                )}
              </article>
            );
          })}
        </div>
      )}

      {view !== "profile" && view !== "favorite" && posts !== null && (
        <div>
          {posts.map((post) => {
            function handleToggleLikeButtonClick() {
              handleToggleLikePostClick(post.id);
            }

            return (
              <article key={post.id} className="post">
                <h2>{post.author.name}</h2>
                <img className="post-image" src={post.image} />
                <p>{post.text}</p>
                <button onClick={handleToggleLikeButtonClick}>
                  {post.liked ? "❤️" : "🤍"} {post.likes.length} likes
                </button>
                <button onClick={() => handleFavPostClick(post.id)}>
                  {post.fav ? "✨" : "❤️"}Fav
                </button>
                {user && user.id && user.id === post.author.id && (
                  <button onClick={() => handleDeletePostButtonClick(post.id)}>
                    Delete post
                  </button>
                )}
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
