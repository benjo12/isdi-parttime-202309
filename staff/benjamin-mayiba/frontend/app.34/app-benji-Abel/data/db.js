// DATABASE
var db = {
    users: new Users(),
    posts: new Posts(),
    cards: new CreditCards(),
  };
  
  const before = Date.now()
  
  // USERS
  db.users.insert(new User(null, "Wendy Darling", "wendy@darling.com", "123123123", []), () => {
    db.users.insert(new User(null, "Peter Pan", "peter@pan.com", "123123123", []), () => {
      db.users.insert(new User(null, "Abel Prieto", "abelpriem94@hotmail.com", "1234", []), () => {
  
        // POSTS
        db.posts.insert(new Post(
        null,
        db.users.__documents__[1].id,
        "https://www.semana.com/resizer/U2dYNVlzGiHK5T-EV_jhACYU-Ow=/1920x1080/smart/filters:format(jpg):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/semana/JO53UT7DKVGVBNXQ5F37YJJZ3A.jpg",
        "my granpa!",
        [db.users.__documents__[2].id]
        ), () => {
          db.posts.insert(new Post(
          null,
          db.users.__documents__[0].id,
          "https://i.etsystatic.com/27087751/r/il/45a140/3041590242/il_fullxfull.3041590242_o4qq.jpg",
          "my sweety!!",
          []
          ), () => { 
            db.posts.insert(new Post(
            null,
            db.users.__documents__[2].id,
            "https://hips.hearstapps.com/hmg-prod/images/campanilla-peter-pan-1601227192.jpg?crop=0.500xw:1.00xh;0.502xw,0&resize=1200:*",
            "Campanilla!",
            []
            ), () => {
  
              // CARDS
              db.cards.insert(new CreditCard(null, db.users.__documents__[1].id, "Peter Pan Integral", "1234 5678 9101 1121", new Date("2024-01-01")), () => {
                console.log('database luckily populated ✔', (Date.now() - before) / 1000 + 's')
              });
            });
          });
        });
      })
    })
  });