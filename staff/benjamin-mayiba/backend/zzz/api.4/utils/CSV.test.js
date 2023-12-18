const CSV = require('./CSV')

// CSV.loadAsObject('./data/users.csv', (error, users) => {
//     if (error) {
//         console.error(error)

//         return
//     }

//     CSV.saveFromObject('./data/users2.csv', users, error => {
//         if (error) {
//             console.error(error)

//             return
//         }

//         console.log('end')
//     })
// })

const csv = `id,name,email,password\r
amhkljhnhc4,Cala Bacin,cala@bacin.com,123123123\r
9nbvjt5wugo,Zana Horia,zana@horia.com,123123123`

const users = CSV.parse(csv)
console.log(users)

const csv2 = CSV.stringify(users)
console.log(csv2)