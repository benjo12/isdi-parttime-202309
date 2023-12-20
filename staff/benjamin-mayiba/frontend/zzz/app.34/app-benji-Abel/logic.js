// CLASS - LOGIC

class Logic {
    constructor() {
        this.sessionUserId = null
    }

    // [ - - - - - USERS - - - - - ]

    // REGISTER USER
    registerUser(name, email, password, callback) {
        validateText(name, 'name')
        validateText(email, 'email')
        validateText(password, 'password')

        db.users.findByEmail(email, (error, user) => {
            if (error) {
                callback(error) 

                return
            }

            if (user) {
                callback (new Error('user already exists'))

                return
            }

            db.users.insert(new User(null, name, email, password, []), error => {
                if (error) {
                    callback(error)

                    return
                }

                callback(null)
            })
        })
    }

    // LOGIN & AUTHENTICATE USER
    loginUser(email, password, callback) {
        validateText(email, 'email')
        validateText(password, 'password')

        db.users.findByEmail(email, (error, user) => {
            if (error) {
                callback(error)

                return
            }

            if (!user) {
                callback(new Error('user not found'))

                return
            }

            if (user.password !== password) {
                callback(new Error('wrong credentials'))

                return
            }

            this.sessionUserId = user.id  

            callback(null)
        })
    }

    // LOGOUT USER
    logoutUser(callback) {
        asyncDelay(() => {
            this.sessionUserId = null

            callback(null)
        }, 0.9)
    }

    // LOGIN LOGIC
    retrieveUser(callback) {
        db.users.findById(this.sessionUserId, (error, user) => {
            if (error) {
                callback(error) 

                return
            }

            if (!user) {
                callback(new Error('user not found'))

                return
            }

            delete user.password

            callback(null, user)
        })
    }

    // CHECK CHANGE EMAIL 
    changeUserEmail(newEmail, confirmNewEmail, password, callback) {
        validateText(newEmail, 'new email')
        validateText(confirmNewEmail, 'new email confirm')
        validateText(password, 'password')

        db.users.findById(this.sessionUserId, (error, user) => {
            if (error) {
                callback(error)

                return
            }

            if (!user || user.password !== password) {
                callback(new Error('wrong credentials'))

                return
            }

            if (newEmail !== confirmNewEmail) {
                callback(new Error('New email and your confirm doesnt match each other'))
            }

            user.email = newEmail

            db.users.update(user, error => {
                if (error) {
                    callback(error)

                    return
                }

                callback(null)
            })
        })
    }

    // CHECK CHANGE PASSWORD 
    changeUserPassword(password, newPassword, againNewPassword, callback) {
        validateText(password, 'password')
        validateText(newPassword, 'new password')
        validateText(againNewPassword, 'repeat password')

        db.users.findById(this.sessionUserId, (error, user) => {
            if (error) {
                callback(error)

                return
            }

            if (!user || user.password !== password) {
                callback(new Error('wrong credentials'))

                return
            }

            if (newPassword !== againNewPassword) {
                callback(new Error('New pass and his confirmation are not correct. Try again') )

                return
            }

            user.password = newPassword

            db.users.update(user, error => {
                if (error) {
                    callback(error)

                    return
                }

                callback(null)
            })
        })
    }

    // [ - - - - - POSTS - - - - - ]

    // PUBLISH ALL POSTS
    publishPost(image, text, callback) {
        validateText(image, 'image')
        validateText(text, 'text')

        db.posts.insert(new Post(null, this.sessionUserId, image, text, []), error => {
            if (error) {
                callback(error)

                return
            }

            callback(null)
        })
    }

    // DELETE POST (PENDIENTE)
    deletePost(postId, callback) {
        validateText(postId, 'post id')

        db.posts.findById(postId, (error, post) => {
            if (error) {
                callback(error)

                return
            }

            if (!post) {
                callback(new Error('post not found'))

                return
            }

            // 1. Filtrado por usuarios con post.id en favs
            // 2. Hacer forEach con ese ARRAY

            db.users.getAll((error, users) => {
                if (error) {
                    callback(error)

                    return
                }

                const usersWithFav = users.filter((user) => user.favs.includes(postId))

                let count = 0

                if (!usersWithFav.length) {
                    db.posts.deleteById(postId, error => {
                        if (error) {
                            callback(error)

                            return
                        }

                        callback(null)
                    })

                    return
                }

                usersWithFav.forEach(user => {

                    const index = user.favs.indexOf(postId)

                    user.favs.splice(index, 1)

                    db.users.update(user, error => {
                        if (error) {
                            callback(error)

                            return
                        }

                        count++

                        if (count === usersWithFav.length) {
                            // TODO (DELETE POST - DONE)
                            db.posts.deleteById(postId, error => {
                                if (error) {
                                    callback(error)

                                    return
                                }

                                callback(null)
                            })
                        }
                    })
                })
            })
        })  
    }

    // RETRIEVE POSTS
    retrievePosts(callback) {
        db.users.findById(this.sessionUserId, (error, user) => {
            if (error) {
                callback(error)

                return
            }

            if (!user) {
                callback(new Error('user not found'))

                return
            }

            const posts = db.posts.getAll((error, posts) => {
                if (error) {
                    callback(error)

                    return
                }

                let count = 0 
                // Contador del posts.length

                posts.forEach(post => {
                    post.liked = post.likes.includes(this.sessionUserId)

                    db.users.findById(post.author, (error, author) => {
                        if (error) {
                            callback(error)

                            return
                        }

                        post.fav = user.favs.includes(post.id)

                        post.author = {
                            email : author.email,
                            id : author.id
                        }

                        count++

                        if (count === posts.length) {
                            callback(null, posts)
                        }
                    })
                })

            })
        })
    }

    // RETRIEVE FAV SESSION POSTS
    retrieveFavUserPosts(callback) {
        db.users.findById(this.sessionUserId, (error, user) => {
            if (error) {
                callback(error) 

                return
            }

            if (!user) {
                callback(new Error('user not found'))

                return
            }

            const favs = []

            let count = 0

            if (!user.favs.length) {
                callback(null, favs)
                // Si hay error, pasa "null" - Si no hay, devuelve los favs del user

                return
            }

            user.favs.forEach(postId => {
                db.posts.findById(postId, (error, post) => {
                    if (error) {
                        callback(error)

                        return
                    }

                    favs.push(post)

                    count++

                    if (count === user.favs.length) {
                        let count2 = 0

                        favs.forEach(post => {
                            post.liked = post.likes.includes(this.sessionUserId)

                            db.users.findById(post.author, (error, author) => {
                                if (error) {
                                    callback(error)

                                    return
                                }

                                post.author = {
                                    email: author.email,
                                    id: author.id
                                }

                                post.fav = user.favs.includes(post.id)

                                count2++

                                if (count2 === favs.length) {
                                    callback(null, favs)
                                    // Si hay error, tira "null" - Si todo OK, retorna al forEach los "favs"
                                }
                            })
                        })
                    }

                })
            })
        })
    }

    // UPDATE ALL POSTS
    toggleLikePost(postId, callback) {
        validateText(postId, 'post id')

        db.posts.findById(postId, (error, post) => {
            if (error) {
                callback(error)

                return
            }

            if (!post) {
                callback(new Error('post not found'))

                return
            }

            const likeIndex = post.likes.indexOf(this.sessionUserId)

            if (likeIndex < 0) {
                post.likes.push(this.sessionUserId)
            } else {
                post.likes.splice(likeIndex, 1)
            }

            db.posts.update(post, error => {
                if (error) {
                    callback(error)

                    return
                }

                callback(null)
                // Callback porque es la última operación de la función
            })
        })
    }

    // FAV BUTTON
    toggleFavPost(postId, callback) {
        validateText(postId, 'post id')

        db.posts.findById(postId, (error, post) => {
            if (error) {
                callback(error)

                return
            }

            if (!post) {
                callback(new Error('post not found'))

                return
            }

            db.users.findById(this.sessionUserId, (error, user) => {
                if (error) {
                    callback(error)

                    return
                }
                if (!user) {
                    callback(new Error('user not found'))

                    return
                }

                // const index = user.favs.indexOf(post.id)
                const index = user.favs.indexOf(postId)

                if (index < 0) {
                    user.favs.push(post.id)
                } else {
                    user.favs.splice(index, 1)
                }

                db.users.update(user, error => {
                    if (error) {
                        callback(error)

                        return
                    }

                    callback(null)
                })
            })
        })
    }
}