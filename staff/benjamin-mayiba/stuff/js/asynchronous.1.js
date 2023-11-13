setTimeout(() => {
    console.log('change color')

    document.body.style.backgroundColor = 'blue'
}, 1)

console.log('continue')

var before = Date.now()
//while(Date.now() - before < 3000); 
for (; Date.now() - before < 3000;);

console.log('with')

var before = Date.now()
//while(Date.now() - before < 2000);
for (; Date.now() - before < 2000;);

console.log('more things')


// VM1516:7 continue
// VM1516:13 with
// VM1516:19 more things
// undefined
// VM1516:2 change color