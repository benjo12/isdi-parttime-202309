console.log('TEST Curry at ')

var c = new Curry("potato", "tomato", "chillies", "green-pepper")

console.log('CASE Curry at  0 results in potato')

var element = c.at(0)
console.log(element)
//potato

var color = new Curry("red", "white", "gray", "yellow")
console.log('CASE Curry at  3 results in yellow')

var element = c.at(3)
console.log(element)
// yellow

var cities = new Curry("paris", "Madrid", "London", "Lyon")

console.log('CASE Curry at  -2 results in London')
var element = c.at(-2)
console.log(element)
// London

var week = new Curry("monday", "tuesday", "wednesday", "Thursday")
console.log('CASE Curry at 14 results in undefined')
var element = c.at(14)
console.log(element)
// undefined
