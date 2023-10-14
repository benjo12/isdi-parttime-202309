console.log('TEST Curry map')

Curry.prototype.map = map;
console.log('CASE c.map   The map function multiplies each element by two ')

var c = new Curry(1, 4, 9, 16);

var mapped = c.map(function (x) {
    return x * 2;
});

console.log(mapped);