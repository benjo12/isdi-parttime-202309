class Logic {
    constructor() {
        this.userId = null
    }

    registerUser(name, email, password) {
        validateText(name, 'name')
        validateText(email, 'email')
        validateText(password, 'password')

        const user = findUserByEmail(email)

        if (user)
            throw new Error('user already exists')

        createUser(name, email, password)
    }

    loginUser(email, password) {
        validateText(email, 'email')
        validateText(password, 'password')

        const user = findUserByEmail(email)

        if (!user || user.password !== password)
            throw new Error('wrong credentials')

        this.userId = user.id
    }

    logoutUser() {
        this.userId = null
    }

    retrieveUser() {
        const user = findUserById(this.userId)

        if (!user)
            throw new Error('user not found')

        delete user.password

        return user
    }

    changeUserEmail(newEmail, newEmailConfirm, password) {
        validateText(newEmail, 'new email')
        validateText(newEmailConfirm, 'new email confirm')
        validateText(password, 'password')

        const user = findUserById(this.userId)

        if (!user || user.password !== password)
            throw new Error('wrong credentials')

        if (newEmail !== newEmailConfirm)
            throw new Error('new email and its confirmation do not match')

        user.email = newEmail

        updateUser(user)
    }

    changeUserPassword(newPassword, newPasswordConfirm, password) {
        validateText(newPassword, 'new password')
        validateText(newPasswordConfirm, 'new password confirm')
        validateText(password, 'password')

        const user = findUserById(this.userId)

        if (!user || user.password !== password)
            throw new Error('wrong credentials')

        if (newPassword !== newPasswordConfirm)
            throw new Error('new password and its confirmation do not match')

        user.password = newPassword

        updateUser(user)
    }

    retrievePosts() {
        const user = findUserById(this.userId)

        if (!user)
            throw new Error('user not found')

        const posts = getPosts()

        posts.forEach(post => {
            post.isFav = post.likes.includes(this.userId)

            const user = findUserById(post.author)

            post.author = user.name
        })

        return posts
    }

    publishPost(image, text) {
        validateText(image, 'image')
        validateText(text, 'text')

        createPost(this.userId, image, text)
    }

    toggleLikePost(postId) {
        validateText(postId, 'post id')

        const post = findPostById(postId)

        if (!post)
            throw new Error('post not found')

        const likeIndex = post.likes.indexOf(this.userId)

        if (likeIndex < 0)
            post.likes.push(this.userId)
        else
            post.likes.splice(likeIndex, 1)

        updatePost(post)
    }
}