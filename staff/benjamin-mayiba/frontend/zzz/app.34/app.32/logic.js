class Logic {
    constructor() {
        this.sessionUserId = null
    }

    registerUser(name, email, password, callback) {
        validateText(name, 'name')
        validateText(email, 'email')
        validateText(password, 'password')

        db.users.findByEmail(email, user => {
            if (user)
                throw new Error('user already exists')

            db.users.insert(new User(null, name, email, password, []), callback)
        })
    }

    loginUser(email, password, callback) {
        validateText(email, 'email')
        validateText(password, 'password')

        db.users.findByEmail(email, user => {
            if (!user || user.password !== password)
                throw new Error('wrong credentials')

            this.sessionUserId = user.id

            callback()
        })

    }

    logoutUser(callback) {
        asyncDelay(() => {
            this.sessionUserId = null

            callback()
        }, 0.9)
    }

    retrieveUser(callback) {
        db.users.findById(this.sessionUserId, user => {
            if (!user)
                throw new Error('user not found')

            delete user.password

            callback(user)
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
        const user = db.users.findById(this.sessionUserId)

        if (!user)
            throw new Error('user not found')

        const posts = db.posts.getAll(posts => {
            posts.forEach(post => {
                post.liked = post.likes.includes(this.sessionUserId)

                const author = db.users.findById(post.author)

                post.author = author.name

                post.fav = user.favs.includes(post.id)
            })

            callback(posts)
        })
    }

    publishPost(image, text, callback) {
        validateText(image, 'image')
        validateText(text, 'text')

        db.posts.insert(new Post(null, this.sessionUserId, image, text, []), callback)
    }

    toggleLikePost(postId, callback) {
        validateText(postId, 'post id')

        db.posts.findById(postId, post => {
            if (!post)
                throw new Error('post not found')

            const index = post.likes.indexOf(this.sessionUserId)

            if (index < 0)
                post.likes.push(this.sessionUserId)
            else
                post.likes.splice(index, 1)

            db.posts.update(post, callback)
        })

    }

    toggleFavPost(postId, callback) {
        validateText(postId, 'post id')

        const post = db.posts.findById(postId)

        if (!post)
            throw new Error('post not found')

        db.users.findById(this.sessionUserId, user => {
            if (!user)
                throw new Error('user not found')

            const index = user.favs.indexOf(post.id)

            if (index < 0)
                user.favs.push(post.id)
            else
                user.favs.splice(index, 1)

            db.users.update(user, callback)
        })
    }

    retrieveFavPosts(callback) {
        db.users.findById(this.sessionUserId, user => {
            if (!user)
                throw new Error('user not found')

            //const favs = db.posts.getAll().filter(post => user.favs.includes(post.id))

            const favs = user.favs.map(postId => db.posts.findById(postId))

            let count = 0

            favs.forEach(post => {
                post.liked = post.likes.includes(this.sessionUserId)

                db.users.findById(post.author, author => {
                    post.author = author.name

                    post.fav = user.favs.includes(post.id)

                    count++

                    if (count === favs.length) callback()
                })
            })
        })

    }
}