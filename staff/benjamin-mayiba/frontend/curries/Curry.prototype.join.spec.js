console.log('TEST Curry join ');

var c = new Curry('Fire', 'Air', 'Water');

console.log("CASE for c join ','  results in Fire,Air,Water")
console.log(c.join(','))
// Fire,Air,Water

console.log("CASE for c join '/'  results in Fire/Air/Water ")
console.log(c.join('/'))
// Fire/Air/Water

console.log("CASE for for c join '-'  results in Fire-Air-Water ")
console.log(c.join('-'))
// Fire-Air-Water

console.log("CASE for c join  results in Fire,Air,Water")
console.log(c.join())
// Fire;Air;Water
