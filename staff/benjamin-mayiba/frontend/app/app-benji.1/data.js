var users = [
    {
        name: 'Wendy Darling',
        email: 'wendy@darling.com',
        password: '123123123'
    },
    {
        name: 'Peter Pan',
        email: 'peter@pan.com',
        password: '234e56472'
    }
]

function createUser(name, email, password) {
    var user = {}

    user.name = name
    user.email = email
    user.password = password

    users.push(user)
}

function findUserByEmail(email) {
    for (var i = 0; i < users.length; i++) {
        var user = users[i]

        if (user.email === email)
            return user
    }

    return null
}

// To Do

function changeEmail(currentEmail,newEmail){
       
    for(var i = 0; i<users.length; i++){
            var user = users[i]
        if(user.email === currentEmail){
              user.email = newEmail
        }
    }
}

function changePassword(currentPassword,newPassword,confirmPassword){
    
    for(var i = 0; i<users.length; i++){
            var user = users[i]
        if(user.password === currentPassword ){
            if(newPassword === confirmPassword){
                user.password = newPassword
            }
              
        }
    }
}