console.log('TEST Curry filter')

var c = new Curry(1, 4, 9, 16)
//Curry.prototype.filter = filter

console.log('CASE c.filter for elements >5 ')

var result = c.filter(function isGreaterThan5 (x){
    return x>5
})

console.log(result)

