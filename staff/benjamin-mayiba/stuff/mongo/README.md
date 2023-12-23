# Mongo

## server

```sh
$ ./bin/mongod --dbpath data
```

## shell

```sh
$ ./bin/mongosh
```

### Commands

```sh
test> show databases
admin   40.00 KiB
config  60.00 KiB
local   40.00 KiB

test> show collections

test> db.users.insertOne({ name: 'Peter Pan', email: 'peter@pan.com', password: '123123123' })
{
  acknowledged: true,
  insertedId: ObjectId('6581f63fbc4abd5315fc8c24')
}

test> show collections
users

test> db.users.find()
[
  {
    _id: ObjectId('6581f63fbc4abd5315fc8c24'),
    name: 'Peter Pan',
    email: 'peter@pan.com',
    password: '123123123'
  }
]

test> db.users.insertOne({ name: 'Wendy Darling', email: 'wendy@darling.com', password: '123123123' })
{
  acknowledged: true,
  insertedId: ObjectId('6581f7aabc4abd5315fc8c25')
}

test> db.users.find()
[
  {
    _id: ObjectId('6581f63fbc4abd5315fc8c24'),
    name: 'Peter Pan',
    email: 'peter@pan.com',
    password: '123123123'
  },
  {
    _id: ObjectId('6581f7aabc4abd5315fc8c25'),
    name: 'Wendy Darling',
    email: 'wendy@darling.com',
    password: '123123123'
  }
]

test> db.users.updateOne({ _id: ObjectId('6581f63fbc4abd5315fc8c24') }, { $set: { password: '456456456' } })
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 1,
  upsertedCount: 0
}

test> db.users.find()
[
  {
    _id: ObjectId('6581f63fbc4abd5315fc8c24'),
    name: 'Peter Pan',
    email: 'peter@pan.com',
    password: '456456456'
  },
  {
    _id: ObjectId('6581f7aabc4abd5315fc8c25'),
    name: 'Wendy Darling',
    email: 'wendy@darling.com',
    password: '123123123'
  }
]

test> db.users.findOne({ _id: ObjectId('6581f63fbc4abd5315fc8c24') })
{
  _id: ObjectId('6581f63fbc4abd5315fc8c24'),
  name: 'Peter Pan',
  email: 'peter@pan.com',
  password: '456456456'
}

test> db.users.deleteOne({ _id: ObjectId('6581f63fbc4abd5315fc8c24') })
{ acknowledged: true, deletedCount: 1 }

test> db.users.find()
[
  {
    _id: ObjectId('6581f7aabc4abd5315fc8c25'),
    name: 'Wendy Darling',
    email: 'wendy@darling.com',
    password: '123123123'
  }
]

test> db.users.deleteMany({})
{ acknowledged: true, deletedCount: 1 }

test> db.users.find()

test> show collections
users

test> db.users.renameCollection('usuarios')
{ ok: 1 }

test> show collections
usuarios

test> db.usuarios.renameCollection('users')
{ ok: 1 }

test> show collections
users

test> db.users.insertOne({ name: 'Peter Pan', email: 'peter@pan.com', password: '123123123' })
{
  acknowledged: true,
  insertedId: ObjectId('6581f9b3bc4abd5315fc8c28')
}

test> db.users.insertOne({ name: 'Wendy Darling', email: 'wendy@darling.com', password: '123123123' })
{
  acknowledged: true,
  insertedId: ObjectId('6581f9b6bc4abd5315fc8c29')
}

test> db.users.find()
[
  {
    _id: ObjectId('6581f9b3bc4abd5315fc8c28'),
    name: 'Peter Pan',
    email: 'peter@pan.com',
    password: '123123123'
  },
  {
    _id: ObjectId('6581f9b6bc4abd5315fc8c29'),
    name: 'Wendy Darling',
    email: 'wendy@darling.com',
    password: '123123123'
  }
]

test> db.posts.insertOne({ author: ObjectId('6581f9b3bc4abd5315fc8c28'), image: 'https://static.wikia.nocookie.net/heroe/images/5/5e/Peter_Pan_en_blanco.png/revision/latest?cb=20230303050514&path-prefix=es', text: 'Hello, Peter!', likes: [] })
{
  acknowledged: true,
  insertedId: ObjectId('6581fac8bc4abd5315fc8c2c')
}

test> db.posts.insertOne({ author: ObjectId('6581f9b3bc4abd5315fc8c28'), image: 'https://static.wikia.nocookie.net/heroe/images/5/5e/Peter_Pan_en_blanco.png/revision/latest?cb=20230303050514&path-prefix=es', text: 'Hello, Peter! again', likes: [] })
{
  acknowledged: true,
  insertedId: ObjectId('6581fad6bc4abd5315fc8c2d')
}

test> db.posts.find()
[
  {
    _id: ObjectId('6581fac8bc4abd5315fc8c2c'),
    author: ObjectId('6581f9b3bc4abd5315fc8c28'),
    image: 'https://static.wikia.nocookie.net/heroe/images/5/5e/Peter_Pan_en_blanco.png/revision/latest?cb=20230303050514&path-prefix=es',
    text: 'Hello, Peter!',
    likes: []
  },
  {
    _id: ObjectId('6581fad6bc4abd5315fc8c2d'),
    author: ObjectId('6581f9b3bc4abd5315fc8c28'),
    image: 'https://static.wikia.nocookie.net/heroe/images/5/5e/Peter_Pan_en_blanco.png/revision/latest?cb=20230303050514&path-prefix=es',
    text: 'Hello, Peter! again',
    likes: []
  }
]

test> db.users.updateOne({ _id: ObjectId('6581f9b3bc4abd5315fc8c28') }, { $set: { favs: [] } })
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 1,
  upsertedCount: 0
}

test> db.users.updateOne({ _id: ObjectId('6581f9b3bc4abd5315fc8c29') }, { $set: { favs: [] } })
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 0,
  modifiedCount: 0,
  upsertedCount: 0
}

test> db.users.updateOne({ _id: ObjectId('6581f9b6bc4abd5315fc8c29') }, { $set: { favs: [] } })
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 1,
  upsertedCount: 0
}

test> db.users.find()
[
  {
    _id: ObjectId('6581f9b3bc4abd5315fc8c28'),
    name: 'Peter Pan',
    email: 'peter@pan.com',
    password: '123123123',
    favs: []
  },
  {
    _id: ObjectId('6581f9b6bc4abd5315fc8c29'),
    name: 'Wendy Darling',
    email: 'wendy@darling.com',
    password: '123123123',
    favs: []
  }
]

test> db.posts.insertOne({ author: ObjectId('6581f9b6bc4abd5315fc8c29'), image: 'https://static.wikia.nocookie.net/heroe/images/5/5e/Peter_Pan_en_blanco.png/revision/latest?cb=20230303050514&path-prefix=es', text: 'Hello, Peter! <3', likes: [] })
{
  acknowledged: true,
  insertedId: ObjectId('6581fbebbc4abd5315fc8c2e')
}

test> db.posts.find()
[
  {
    _id: ObjectId('6581fac8bc4abd5315fc8c2c'),
    author: ObjectId('6581f9b3bc4abd5315fc8c28'),
    image: 'https://static.wikia.nocookie.net/heroe/images/5/5e/Peter_Pan_en_blanco.png/revision/latest?cb=20230303050514&path-prefix=es',
    text: 'Hello, Peter!',
    likes: []
  },
  {
    _id: ObjectId('6581fad6bc4abd5315fc8c2d'),
    author: ObjectId('6581f9b3bc4abd5315fc8c28'),
    image: 'https://static.wikia.nocookie.net/heroe/images/5/5e/Peter_Pan_en_blanco.png/revision/latest?cb=20230303050514&path-prefix=es',
    text: 'Hello, Peter! again',
    likes: []
  },
  {
    _id: ObjectId('6581fbebbc4abd5315fc8c2e'),
    author: ObjectId('6581f9b6bc4abd5315fc8c29'),
    image: 'https://static.wikia.nocookie.net/heroe/images/5/5e/Peter_Pan_en_blanco.png/revision/latest?cb=20230303050514&path-prefix=es',
    text: 'Hello, Peter! <3',
    likes: []
  }
]

test> db.posts.find({ author: ObjectId('6581f9b6bc4abd5315fc8c29') })
[
  {
    _id: ObjectId('6581fbebbc4abd5315fc8c2e'),
    author: ObjectId('6581f9b6bc4abd5315fc8c29'),
    image: 'https://static.wikia.nocookie.net/heroe/images/5/5e/Peter_Pan_en_blanco.png/revision/latest?cb=20230303050514&path-prefix=es',
    text: 'Hello, Peter! <3',
    likes: []
  }
]

test> db.posts.find({ author: ObjectId('6581f9b3bc4abd5315fc8c28') })
[
  {
    _id: ObjectId('6581fac8bc4abd5315fc8c2c'),
    author: ObjectId('6581f9b3bc4abd5315fc8c28'),
    image: 'https://static.wikia.nocookie.net/heroe/images/5/5e/Peter_Pan_en_blanco.png/revision/latest?cb=20230303050514&path-prefix=es',
    text: 'Hello, Peter!',
    likes: []
  },
  {
    _id: ObjectId('6581fad6bc4abd5315fc8c2d'),
    author: ObjectId('6581f9b3bc4abd5315fc8c28'),
    image: 'https://static.wikia.nocookie.net/heroe/images/5/5e/Peter_Pan_en_blanco.png/revision/latest?cb=20230303050514&path-prefix=es',
    text: 'Hello, Peter! again',
    likes: []
  }
]
```
 
