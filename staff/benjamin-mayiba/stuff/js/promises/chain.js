/*
new Promise((resolve, reject) => {
    resolve(10)
})
    .then(value => console.log(value))
*/

/*
Promise.resolve(10)
  .then(value => console.log(value))
*/

Promise.resolve(20)
    .then(value => {
        throw value + 10
    })
    .then(value => {
        console.log(value)
    })
    .catch(value => {
        console.error(value)

        return value + 10
    })
    .then(value => {
        console.log(value)

        throw value + 10
    })
    .then(value => {
        console.log(value)
    })
    .catch(value => {
        console.error(value)

        return value + 10
    })
    .then(value => {
        console.log(value)

        return value + 10
    })
    .catch(value => {
        console.error(value)

        return value + 10
    })
    .then(value => {
        console.log(value)
    })



// VM3451: 21 30
//     (anonymous) @VM3451: 21
// Promise.catch(async)
//     (anonymous) @VM3451: 20
// VM3451: 26 40
// VM3451: 34 50
//     (anonymous) @VM3451: 34
// Promise.catch(async)
//     (anonymous) @VM3451: 33
// VM3451: 39 60
// VM3451: 49 70