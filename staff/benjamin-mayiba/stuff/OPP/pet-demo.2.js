class Pet {
    constructor(name) {
        this.name = name
    }
}

class Perro extends Pet {
    constructor(name) {
        super(name)
    }
}

class Gato extends Pet {
    constructor(name) {
        super(name)
    }
}

class Raton extends Pet {
    constructor(name) {
        super(name)
    }
}

const pluto = new Perro('Pluto')
const silvestre = new Gato('Silvestre')
const mickey = new Raton('Mickey')

undefined
pluto instanceof Object
true
pluto instanceof Pet
true
pluto instanceof Perro
true
silvestre instanceof Pet
true
silvestre instanceof Perro
false
silvestre instanceof Gato
true
mickey instanceof Gato
false
mickey instanceof Perro
false
mickey instanceof Raton
true
silvestre instanceof Raton
false
pluto instanceof Raton
false
pluto
// Perro {name: 'Pluto'}
// name: "Pluto"
// [[Prototype]]: Pet
// constructor: class Perro
// [[Prototype]]: Object
silvestre
// Gato {name: 'Silvestre'}
// name: "Silvestre"
// [[Prototype]]: Pet
// constructor: class Gato
// [[Prototype]]: Object
mickey
// åRaton {name: 'Mickey'}
// name: "Mickey"
// [[Prototype]]: Pet
// constructor: class Raton
// [[Prototype]]: Object
