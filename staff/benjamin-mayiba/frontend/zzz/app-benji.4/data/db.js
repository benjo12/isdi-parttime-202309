var db = {}

// populate db

db.users = [
    new User(generateId(),'Wendy Darling', 'wendy@darling.com', '123123123'),
    new User(generateId(),'Peter Pan', 'peter@pan.com', '123123123')
]

db.posts = [
    new Post(
        generateId(),
        db.users[1].id,
        'https://m.media-amazon.com/images/M/MV5BMzIwMzUyYTUtMjQ3My00NDc3LWIyZjQtOGUzNDJmNTFlNWUxXkEyXkFqcGdeQXVyMjA0MDQ0Mjc@._V1_FMjpg_UX1000_.jpg',
        'my granpa!',
        []
    ),
    new Post(
        generateId(),
        db.users[0].id,
        'https://ih1.redbubble.net/image.2230349250.8377/pp,840x830-pad,1000x1000,f8f8f8.jpg',
        'my sweety!',
        [db.users[1].id]
    ),
    new Post(
        generateId(),
        db.users[1].id,
        'https://m.media-amazon.com/images/I/71JZegDmwbL.jpg',
        'i love ü baby',
        [db.users[0].id]
    )
]

function generateId(){
    return Math.floor(Math.random() * 1000000000000000000).toString(36)
}