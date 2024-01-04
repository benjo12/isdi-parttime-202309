const mongodb = require('mongodb')

const { MongoClient, ObjectId } = mongodb

const client = new MongoClient('mongodb://127.0.0.1:27017')

client.connect()
    .then(connector => {
        const db = connector.db('test')

        const users = db.collection('users')
        const posts = db.collection('posts')

        //  users.insertOne({ name: 'Ele Fante', email: 'ele@fante.com', password: '123123123', favs: [] })
        //      .then(result => console.log('inserted', result))
        //      .catch(error => console.error(error))

        //  users.updateOne({ _id: new ObjectId('6583496363f0795e3974b8ff') }, { $set: { name: 'Gi Rafa', email: 'gi@rafa.com' } })
        //     .then(result => console.log('updated', result))
        //     .catch(error => console.error(error))

         users.findOne({ _id: new ObjectId('65845b055958c7e732ea2835') })
            .then(result => console.log('found', result))
            .catch(error => console.error(error))

        // users.deleteOne({ _id: new ObjectId('6583496363f0795e3974b8ff') })
        //     .then(result => console.log('deleted', result))
        //     .catch(error => console.error(error))

        // users.find().toArray()
        //     .then(result => console.log('found all', result))
        //     .catch(error => console.error(error))

        // posts.insertOne({ author: new ObjectId('6581f9b3bc4abd5315fc8c28'), image: 'http://image.com/peter', text: 'hello, peter!', likes: [] })
        //     .then(result => console.log('inserted', result))
        //     .catch(error => console.error(error))

        // posts.find({ author: new ObjectId('6581f9b3bc4abd5315fc8c28') }).toArray()
        //     .then(result => console.log('found posts', result))
        //     .catch(error => console.error(error))

    })
    .catch(error => console.error(error))