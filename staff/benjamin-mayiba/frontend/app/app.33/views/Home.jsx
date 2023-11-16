function Home(props) {
    console.log('Home')

    const viewState = React.useState(null)
    const view = viewState[0]
    const setView = viewState[1]

    const timestampState = React.useState(null)
    //const timestamp = timestampState[0]
    const setTimestamp = timestampState[1]

    const nameState = React.useState(null)
    const name = nameState[0]
    const setName = nameState[1]

    const postsState = React.useState(null)
    const posts = postsState[0]
    const setPosts = postsState[1]

    const favsState = React.useState(null)
    const favs = favsState[0]
    const setFavs = favsState[1]

    function handleLogoutClick() {
        logic.logoutUser(error => {
            if (error) {
                alert(error.message)

                return
            }
        })

        props.onLogoutClick()
    }

    React.useEffect(() => {
        console.log('Home -> effect (name)')

        try {
            logic.retrieveUser((error, user) => {
                if (error) {
                    alert(error.message)

                    return
                }

                setName(user.name)
            })

        } catch (error) {
            alert(error.message)
        }
    }, [])

    function handleProfileClick(event) {
        event.preventDefault()

        setView('profile')
    }

    function handleHomeClick(event) {
        event.preventDefault()

        setView(null)
    }

    function handleNewPostClick() {
        setView('new-post')
    }

    function handleCancelNewPostClick(event) {
        event.preventDefault()

        setView(null)
    }

    React.useEffect(() => {
        console.log('Home -> effect (posts)')

        if (view === null || view === 'new-post')
            try {
                logic.retrievePosts((error, posts) => {
                    if (error) {
                        alert(error.message)

                        return
                    }

                    posts.reverse()

                    setPosts(posts)
                })
            } catch (error) {
                alert(error.message)
            }
        else if (view === 'favs')
            try {
                logic.retrieveFavPosts((error, favs) => {
                    if (error) {
                        alert(error.message)

                        return
                    }

                    favs.reverse()
                    setFavs(favs)
                })
            } catch (error) {
                alert(error.message)
            }
    }, [])

    function handleNewPostSubmit(event) {
        event.preventDefault()

        const imageInput = event.target.querySelector('#image-input')
        const textInput = event.target.querySelector('#text-input')

        const image = imageInput.value
        const text = textInput.value

        try {
            logic.publishPost(image, text)

            setView(null)

            // syncDelay(() => {
            //     logic.publishPost(image, text)

            //     setView(null)
            // }, 5)

            // asyncDelay(() => {
            //     logic.publishPost(image, text)

            //     setView(null)
            // }, 5)
        } catch (error) {
            alert(error.message)
        }
    }

    function handleToggleLikePostClick(postId) {
        try {
            logic.toggleLikePost(postId)

            setTimestamp(Date.now())
        } catch (error) {
            alert(error.message)
        }
    }

    function handleToggleFavPostClick(postId) {
        try {
            logic.toggleFavPost(postId)

            setTimestamp(Date.now())
        } catch (error) {
            alert(error.message)
        }
    }

    function handleFavPostsClick(event) {
        event.preventDefault()

        setView('favs')
    }

    return <div>
        <header className="home-header">
            <h1><a href="" onClick={handleHomeClick}>Home</a></h1>

            <div>
                <button onClick={handleNewPostClick}>+</button> <a href="" onClick={handleProfileClick}>{name}</a> <a href="" onClick={handleFavPostsClick}>Favs</a> <button onClick={handleLogoutClick}>Logout</button>
            </div>
        </header>

        {view === 'profile' && <div className="view">
            <h2>Update e-mail</h2>

            <form className="form">
                <label htmlFor="new-email-input">New e-mail</label>
                <input id="new-email-input" type="email" />

                <label htmlFor="new-email-confirm-input">Confirm new e-mail</label>
                <input id="new-email-confirm-input" type="email" />

                <label htmlFor="password-input">Password</label>
                <input type="password" id="password-input" />

                <button type="submit">Update e-mail</button>
            </form>

            <h2>Update password</h2>

            <form className="form">
                <label htmlFor="password-input">Current password</label>
                <input type="password" id="password-input" />

                <label htmlFor="new-password-input">New password</label>
                <input id="new-password-input" type="password" />

                <label htmlFor="new-password-confirm-input">Confirm new password</label>
                <input id="new-password-confirm-input" type="password" />

                <button type="submit">Update password</button>
            </form>
        </div>}

        {view === 'new-post' && <div className="view">
            <h2>New post</h2>

            <form className="form" onSubmit={handleNewPostSubmit}>
                <label htmlFor="image-input">Image</label>
                <input type="url" id="image-input" />

                <label htmlFor="text-input">Text</label>
                <input type="text" id="text-input" />

                <button type="submit">Post</button>
                <button onClick={handleCancelNewPostClick}>Cancel</button>
            </form>
        </div>}

        {(view === null || view === 'new-post') && posts !== null && <div>
            {posts.map((post) => {
                function handleToggleLikeButtonClick() {
                    handleToggleLikePostClick(post.id)
                }

                function handleToggleFavButtonClick() {
                    handleToggleFavPostClick(post.id)
                }

                return <article key={post.id} className="post">
                    <h2>{post.author}</h2>
                    <img className="post-image" src={post.image} />
                    <p>{post.text}</p>
                    <button onClick={handleToggleLikeButtonClick}>{post.liked ? '❤️' : '🤍'} {post.likes.length} likes</button>
                    <button onClick={handleToggleFavButtonClick}>{post.fav ? '⭐️' : '✩'}</button>
                </article>
            })}
        </div>}

        {view === 'favs' && favs !== null && <div>
            {favs.map((post) => {
                function handleToggleLikeButtonClick() {
                    handleToggleLikePostClick(post.id)
                }

                function handleToggleFavButtonClick() {
                    handleToggleFavPostClick(post.id)
                }

                return <article key={post.id} className="post">
                    <h2>{post.author}</h2>
                    <img className="post-image" src={post.image} />
                    <p>{post.text}</p>
                    <button onClick={handleToggleLikeButtonClick}>{post.liked ? '❤️' : '🤍'} {post.likes.length} likes</button>
                    <button onClick={handleToggleFavButtonClick}>{post.fav ? '⭐️' : '✩'}</button>
                </article>
            })}
        </div>}
    </div>
}