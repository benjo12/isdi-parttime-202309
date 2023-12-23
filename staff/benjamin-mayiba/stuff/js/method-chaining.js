var a = [
    {
        _id: '6581f9b3bc4abd5315fc8c28',
        name: 'Peter Pan',
        email: 'peter@pan.com',
        password: '123123123',
        favs: []
    },
    {
        _id: '6581f9b6bc4abd5315fc8c29',
        name: 'Wendy Darling',
        email: 'wendy@darling.com',
        password: '123123123',
        favs: []
    },
    {
        _id: '6583496363f0795e3974b8ff',
        name: 'Ji Rafa',
        email: 'ji@rafa.com',
        password: '123123123',
        favs: []
    },
    {
        _id: '658349d7d1afb3460040b1fd',
        name: 'Ele Fante',
        email: 'ele@fante.com',
        password: '123123123',
        favs: []
    }
]

var result = a.filter(user => user.email.includes('e')).map(user => user.name).join(', ')
console.log(result)
// 'Peter Pan, Wendy Darling, Ele Fante'