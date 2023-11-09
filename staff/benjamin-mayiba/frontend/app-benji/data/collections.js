class Collection{
    constructor(clazz,collection){
        this.clazz = clazz
        this.collection = collection
    }

    clone(document){
        var copy = new this.clazz

        for(var key in document){
            var value = document[key]
            if(value instanceof Array)
                 copy[key] = [...value]
            else if(value instanceof Date)
                 copy[key] = new Date(document[key])
            else if(value instanceof Object)
                 copy[key] = {...value}   
            else 
                 copy[key]  = document[key]
        }
        return copy
    }

    generateId(){
        return Math.floor(Math.random() * 1000000000000000000).toString(36)
    }

    insert(document){
        documentCopy = this.clone(document)
        
        documentCopy.id = this.generateId()

        this.collection.push(documentCopy)
    }

    findIndexById(id){
        validateText(id, `${this.clazz.name} id`)

        return this.collection.findIndex(document => document.id === id)
    }

    findById(id){
        validateText(id,`${this.clazz.name} id`)

        return this.collection.find(document => document.id === id) || null
    }

    update(document){
        if(!(document instanceof this.clazz)) throw new TypeError(`document is not a ${this.clazz.name}`)

        const index = findIndexById(document.id)
             if(index < 0)
                  throw new Error(`${this.clazz.name} not found`)

        this.collection[index] = this.clone(document)
    }

    // new method

    delete(document) {
        if(!(document instanceof this.clazz)) throw new TypeError(`document is not a ${this.clazz.name}`)

        const index = findIndexById(document.id)
             if(index < 0)
                  throw new Error(`${this.clazz.name} not found`)

        this.collection.splice(index, 1)
    }
}

class  Users extends Collection{
       constructor(){
        super(User,[])
       }

       findByEmail(email){
        validateText(email, `${this.clazz.name} email`)
        
        return this.collection.find(document => document.email === email)
       }
}

class Posts extends Collection{
    constructor(){
        super(Post,[])
    }

    getAll(){
        return this.collection.map(this.clone.bind(this))
    }
}

class CreditCards extends Collection{
    constructor(){
        super(CreditCard,[])
    }
}

// TEST

var users = new Collection(User, db.users)

var user = new User(null, 'Ada Love', 'ada@love.com', '123123123')
users.create(user)

var posts = new Collection(Post, db.posts)

var post = new Post(null, users.collection[users.collection.length - 1].id, 'http://image.com', 'hola mundo', [])
posts.create(post)