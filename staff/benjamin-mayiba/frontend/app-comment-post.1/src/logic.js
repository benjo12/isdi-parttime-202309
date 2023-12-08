import { validateText } from './utils/validators'
import db from './data/db'
import { User, Post } from './data/models'
import randomDelay from './utils/randomDelay'

class Logic {
    constructor() {
        this.sessionUserId = null
    }

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
                callback(new Error('user already exists'))

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

    loginUser(email, password, callback) {
        validateText(email, 'email')
        validateText(password, 'password')

        db.users.findByEmail(email, (error, user) => {
            if (error) {
                callback(error)

                return
            }

            if (!user || user.password !== password) {
                callback(new Error('wrong credentials'))

                return
            }

            this.sessionUserId = user.id

            callback(null)
        })

    }

    logoutUser(callback) {
        randomDelay(() => {
            this.sessionUserId = null

            callback(null)
        })
    }

    retrieveUser(callback) {
        db.users.findById(this.sessionUserId, (error, user) => {
            if (error) {
                callback(error)

                return
            }

            if (!user) {
                callback(new Error('user not found'))
            }

            delete user.password

            callback(null, user)
        })
    }

    // TODO
    changeUserEmail(newEmail, newEmailConfirm, password) {
        validateText(newEmail, 'new email')
        validateText(newEmailConfirm, 'new email confirm')
        validateText(password, 'password')

        const user = db.users.findById(this.sessionUserId)

        if (!user || user.password !== password)
            throw new Error('wrong credentials')

        if (newEmail !== newEmailConfirm)
            throw new Error('new email and its confirmation do not match')

        user.email = newEmail

        db.users.update(user)
    }

    // TODO
    changeUserPassword(newPassword, newPasswordConfirm, password) {
        validateText(newPassword, 'new password')
        validateText(newPasswordConfirm, 'new password confirm')
        validateText(password, 'password')

        const user = db.users.findById(this.sessionUserId)

        if (!user || user.password !== password)
            throw new Error('wrong credentials')

        if (newPassword !== newPasswordConfirm)
            throw new Error('new password and its confirmation do not match')

        user.password = newPassword

        db.users.update(user)
    }

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

                posts.forEach(post => {
                    post.liked = post.likes.includes(this.sessionUserId)

                    db.users.findById(post.author, (error, author) => {
                        if (error) {
                            callback(error)

                            return
                        }

                        post.author ={
                            id: author.id,
                            name: author.name
                        } 

                        post.fav = user.favs.includes(post.id)

                        count++

                        if (count === posts.length)
                            callback(null, posts)
                    })
                })
            })
        })

    }

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

            const index = post.likes.indexOf(this.sessionUserId)

            if (index < 0)
                post.likes.push(this.sessionUserId)
            else
                post.likes.splice(index, 1)

            db.posts.update(post, error => {
                if (error) {
                    callback(error)

                    return
                }

                callback(null)
            })
        })

    }

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

                const index = user.favs.indexOf(post.id)

                if (index < 0)
                    user.favs.push(post.id)
                else
                    user.favs.splice(index, 1)

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

    retrieveFavPosts(callback) {
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

                return
            }

            user.favs.forEach((postId, index) => {
                db.posts.findById(postId, (error, post) => {
                    if (error) {
                        callback(error)

                        return
                    }

                    favs[index] = post

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

                                post.author = author.name

                                post.fav = user.favs.includes(post.id)

                                count2++

                                if (count2 === favs.length) callback(null, favs)
                            })
                        })
                    }
                })
            })

        })
    }

    updatePostText(postId, text, callback){
        validateText(postId, 'post id')
        validateText(text, 'text')
        // TODO validate callback

        db.posts.findById(postId, (error, post) =>{
             if(error){
                callback(error)

                return
             }

             if(!post){
                callback(new error('post not found'))

                return
             }

             if(post.author !== this.sessionUserId){
                callback(new error('post does not belong to user'))

                return
             }

             post.text = text

             db.posts.update(post, error =>{

                if(error){

                    callback(error)

                    return
                }

                callback(null)
             })

        })
    }

    commentPost(PostId, comment, callback) {
        validateText(PostId, 'post id');
        validateText(comment, 'comment');
    
        // Find the post by ID
        db.posts.findById(PostId, (error, post) => {
            if (error) {
                return callback(error);
            }
    
            if (!post) {
                return callback(new Error('Post not found'));
            }
    
            // Add the comment to the post
            post.addComment(comment);
    
            // Update the post in the database
            db.posts.update(post, updateError => {
                if (updateError) {
                    return callback(updateError);
                }
    
                // Callback indicating success
                callback(null);
            });
        });
    }
    
}

const logic = new Logic

export default logic