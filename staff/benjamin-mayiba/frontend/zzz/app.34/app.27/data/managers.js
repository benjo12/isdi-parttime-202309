function createUser(name, email, password) {
    const user = new User(generateId(), name, email, password)

    db.users.push(user)
}

function cloneUser(user) {
    if (!(user instanceof User)) throw new TypeError('user is not a User')

    return new User(user.id, user.name, user.email, user.password)
}

function findUserIndexById(id) {
    validateText(id, 'user id')

    const index = db.users.findIndex(function (user) { return user.id === id })

    return index
}

function findUserByEmail(email) {
    validateText(email, 'user email')

    const user = db.users.find(function (user) { return user.email === email })

    return user
}

function findUserById(id) {
    validateText(id, 'user id')

    const user = db.users.find(user => user.id === id)

    if (user)
        return cloneUser(user)

    return null
}

function updateUser(user) {
    if (!(user instanceof User)) throw new TypeError('user is not a User')

    const index = findUserIndexById(user.id)

    db.users[index] = cloneUser(user)
}

function clonePost(post) {
    if (!(post instanceof Post)) throw new TypeError('post is not a Post')

    return new Post(post.id, post.author, post.image, post.text, post.likes.map(email => email))
}

function getPosts() {
    return db.posts.map(clonePost)
}

function createPost(userId, image, text) {
    const post = new Post(generateId(), userId, image, text, [])

    db.posts.push(post)
}

function findPostById(id) {
    validateText(id, 'post id')

    const post = db.posts.find(post => post.id === id)

    if (post)
        return clonePost(post)

    return null
}

function findPostIndexById(id) {
    validateText(id, 'post id')

    const index = db.posts.findIndex(post => post.id === id)

    return index
}

function updatePost(post) {
    if (!(post instanceof Post)) throw new TypeError('post is not a Post')

    const index = findPostIndexById(post.id)

    db.posts[index] = clonePost(post)
}

/*
TODO collection abstraction
class Collection {
    constructor() {}
    create() {}
    clone() {}
    findIndexById() {}
    findById() {}
    update() {}
}
class UserCollection extends Collection {
    findByEmail() {}
    clone() {}
}
class PostCollection extends Collection {
    getAll() {}
    clone() {}
}
db.users = new UserCollection([...])
db.posts = new PostCollection([...])
db.users.findById(...)
db.users.findByEmail(...)
*/

/*
WIP first steps
class Collection {
    constructor(clazz, collection) {
        this.clazz = clazz
        this.collection = collection
    }
    clone(document) {
        var copy = new this.clazz
        for (var key in document) {
            var value = document[key]
            if (value instanceof Array)
                copy[key] = [...value]
            else if (value instanceof Object)
                copy[key] = { ...value }
            else
                copy[key] = document[key]
        }
        return copy
    }
    create(document) {
        const documentCopy = this.clone(document)
        documentCopy.id = generateId()
        this.collection.push(documentCopy)
    }
}
var users = new Collection(User, db.users)
var user = new User(null, 'Ada Love', 'ada@love.com', '123123123')
users.create(user)
var posts = new Collection(Post, db.posts)
var post = new Post(null, users.collection[users.collection.length - 1].id, 'http://image.com', 'hola mundo', [])
posts.create(post)
*/