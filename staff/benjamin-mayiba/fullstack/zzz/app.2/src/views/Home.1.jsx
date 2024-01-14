import React from 'react'

import logic from '../logic'

import { Button, Link } from '../library'
import { Post } from '../components'

function Home(props) {
    console.log('Home')

    const [view, setView] = React.useState(null)
    const [name, setName] = React.useState(null)
    const [posts, setPosts] = React.useState(null)
    const [favs, setFavs] = React.useState(null)

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

    function refreshPosts() {
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
    }

    React.useEffect(() => {
        console.log('Home -> effect (posts)')

        refreshPosts()
    }, [view])

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
                        setView(null)

                        window.scrollTo(0, 0)
                    })
                } catch (error) {
                    alert(error.message)
                }
            })
        } catch (error) {
            alert(error.message)
        }
    }

    function handleFavPostsClick(event) {
        event.preventDefault()

        try {
            logic.retrieveFavPosts((error, favs) => {
                if (error) {
                    alert(error.message)

                    return
                }

                favs.reverse()

                setFavs(favs)
                setView('favs')
            })
        } catch (error) {
            alert(error.message)
        }
    }

    return <div>
        <header className="header">
            <h1><Link onClick={handleHomeClick}>Home</Link></h1>

            <div>
                <Link onClick={handleProfileClick}>{name}</Link> <Link onClick={handleFavPostsClick}>Favs</Link> <Button onClick={handleLogoutClick}>Logout</Button>
            </div>
        </header>

        {view === 'profile' && <div className="container">
            <h2>Update e-mail</h2>

            <form className="form">
                <label htmlFor="new-email-input">New e-mail</label>
                <input className="input" id="new-email-input" type="email" />

                <label htmlFor="new-email-confirm-input">Confirm new e-mail</label>
                <input className="input" id="new-email-confirm-input" type="email" />

                <label htmlFor="password-input">Password</label>
                <input className="input" type="password" id="password-input" />

                <Button type="submit">Update e-mail</Button>
            </form>

            <h2>Update password</h2>

            <form className="form">
                <label htmlFor="password-input">Current password</label>
                <input className="input" type="password" id="password-input" />

                <label htmlFor="new-password-input">New password</label>
                <input className="input" id="new-password-input" type="password" />

                <label htmlFor="new-password-confirm-input">Confirm new password</label>
                <input className="input" id="new-password-confirm-input" type="password" />

                <Button type="submit">Update password</Button>
            </form>
        </div>}

        {(view === null || view === 'new-post') && posts !== null && <div className="posts">
            {posts.map(post => <Post key={post.id} post={post} onToggleLikeClick={refreshPosts} onToggleFavClick={refreshPosts} />)}
        </div>}

        {view === 'favs' && favs !== null && <div className="posts">
            {favs.map(post => <Post key={post.id} post={post} onToggleLikeClick={refreshPosts} onToggleFavClick={refreshPosts} />)}
        </div>}

        <footer className="footer">
            {view === 'new-post' && <div className="container new-post">
                <h2>New post</h2>

                <form className="form" onSubmit={handleNewPostSubmit}>
                    <label htmlFor="image-input">Image</label>
                    <input className="input" type="url" id="image-input" />

                    <label htmlFor="text-input">Text</label>
                    <input className="input" type="text" id="text-input" />

                    <Button type="submit">Post</Button>
                    <Button onClick={handleCancelNewPostClick}>Cancel</Button>
                </form>
            </div>}

            {view !== 'new-post' && <Button onClick={handleNewPostClick}>+</Button>}
        </footer>
    </div>
}

export default Home