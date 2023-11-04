function Home(props) {
  console.log("Home");

  const viewState = React.useState(null);

  const view = viewState[0];
  const setView = viewState[1];

  function handleLogoutClick() {
    logic.logoutUser();

    props.onLogoutClick();
  }

  let name = null;

  try {
    const user = logic.retrieveUser();
  } catch (error) {
    alert(error.message);
  }

  function handleProfileClick(event) {
    event.preventDefault();

    setView("profile");
  }

  function handleHomeClick(event) {
    event.preventDefault();
    setView(null);
  }

  function handleNewPostClick() {
    setView("new-post");
  }

  function handleCancelNewPostClick(event) {
    event.preventDefault();

    setView(null);
  }

  let posts = null;

  try {
    posts = logic.retrievePosts();

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

  return (
    <div>
      <header className="home-header">
        <h1>
          <a href="" onClick={handleHomeClick}>
            Home
          </a>
        </h1>

        <div>
          <button onClick={handleNewPostClick}>+</button>

          <a href="" onClick={handleProfileClick}>
            Profile
          </a>

          <button onClick={handleLogoutClick}>Logout</button>
        </div>
      </header>

      {view == "profile" && <div className="view">
          <h2>Update e-mail</h2>

          <form className="form">
            <label for="new-email-input">New e-mail</label>
            <input id="new-email-input" type="email" />

            <label for="new-email-confirm-input">Confirm new e-mail</label>
            <input id="new-email-confirm-input" type="email" />

            <label for="password-input">Password</label>
            <input type="password" id="password-input" />

            <button type="submit">Update e-mail</button>
          </form>

          <h2>Update password</h2>

          <form className="form">
            <label for="password-input">Current password</label>
            <input type="password" id="password-input" />

            <label for="new-password-input">New password</label>
            <input id="new-password-input" type="password" />

            <label for="new-password-confirm-input">Confirm new password</label>
            <input id="new-password-confirm-input" type="password" />

            <button type="submit">Update password</button>
          </form>
        </div>
      }

      {view === "new-post" && <div className="view">
          <h2>New post</h2>

          <form class="form" onSubmit={handleNewPostSubmit}>
            <label for="image-input">Image</label>
            <input type="url" id="image-input" />

            <label for="text-input">Text</label>
            <input type="text" id="text-input" />

            <button type="submit">Post</button>
            <button onClick={handleCancelNewPostClick}>Cancel</button>
          </form>
        </div>
      }

      {view !== "profile" && posts !== null && (
        <div>
          {posts.map((post, index) => (
            <article key={index} className="post">
              <h2>{post.author}</h2>
              <img className="post-image" src={post.image} />
              <p>{post.text}</p>
              <button>
                {post.isFav ? "❤️" : "🤍"} {post.likes.length} likes
              </button>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
