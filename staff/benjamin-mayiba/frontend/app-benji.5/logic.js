class Logic {
    constructor() {
        this.sessionUserId = null
    }

    registerUser(name, email, password) {
        validateText(name, 'name')
        validateText(email, 'email')
        validateText(password, 'password')

        const user = db.users.findByEmail(email)

        if (user)
            throw new Error('user already exists')

       db.users.insert(new User(name, email, password)) 
    }

    loginUser(email, password) {
        validateText(email, 'email')
        validateText(password, 'password')

        const user = db.users.findByEmail(email)

        if (!user || user.password !== password)
            throw new Error('wrong credentials')

        this.sessionUserId = user.id
    }

    logoutUser() {
        this.sessionUserId = null
    }

    retrieveUser() {
        const user = db.users.findById(this.sessionUserId)

        if (!user)
            throw new Error('user not found')

        delete user.password

        return user
    }

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

    retrievePosts() {
        const user = db.users.findById(this.sessionUserId);
    
        if (!user) {
            throw new Error('User not found');
        }
    
        const posts = db.posts.getAll();
    
        posts.forEach(post => {
            post.liked = post.likes.includes(this.sessionUserId);
    
            const authorUser = db.users.findById(post.author);
    
            if (!authorUser) {
                console.error('Author user not found for post:', post);
                return;
            }
    
            // Modificamos la estructura de post.author para incluir el ID
            post.author = {
                id: authorUser.id,
                name: authorUser.name,
                // Otros datos del autor si es necesario
            };
        });
    
        return posts;
    }
    

    publishPost(image, text) {
        validateText(image, 'image')
        validateText(text, 'text')

        db.posts.insert(new Posts(null,this.sessionUserId, image, text))
    }

    toggleLikePost(postId) {
        validateText(postId, 'post id')

        const post = db.posts.findById(postId)

        if (!post)
            throw new Error('post not found')

        const likeIndex = post.likes.indexOf(this.sessionUserId)

        if (likeIndex < 0)
            post.likes.push(this.sessionUserId)
        else
            post.likes.splice(likeIndex, 1)

            db.posts.update(post)
    }

    // TO DO
    deletePost(postId) {
        validateText(postId, 'post id')

        const post = db.posts.findById(postId)

        if (!post)
            throw new Error('post not found')

        db.posts.deleteById(post.id)
    }

    
}