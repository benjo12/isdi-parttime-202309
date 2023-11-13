setTimeout(() => console.log('A'), 100)
setTimeout(() => console.log('B'), 10)
setTimeout(() => console.log('C'), 1)

console.log('continue')

var before = Date.now()
while (Date.now() - before < 3000);

console.log('with')

var before = Date.now()
while (Date.now() - before < 2000);

console.log('more things')




// VM1601:5 continue
// VM1601:10 with
// VM1601:15 more things
// undefined
// VM1601:3 C
// VM1601:2 B
// VM1601:1 A