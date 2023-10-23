TEST('Curry forEach')

CASE('CASE for each element in [10, 20, 30] print it in the console')

Curry.prototype.forEach = forEach;

var c = new Curry(10, 20, 30);

c.forEach(function (v) {
    console.log(v)
})

CASE('CASE for each element in [10, 20, 30] print it multiplied by 10 in the console')

var c  = new Curry(10, 20, 30) 

c.forEach(function (v) {
    console.log(v * 10)
})

