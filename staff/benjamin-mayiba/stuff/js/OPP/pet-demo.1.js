class Perro {
    constructor(name) {
        this.name = name
    }
}

class Gato {
    constructor(name) {
        this.name = name
    }
}

class Raton {
    constructor(name) {
        this.name = name
    }
}

const pluto = new Perro('Pluto')
const silvestre = new Gato('Silvestre')
const mickey = new Raton('Mickey')

pluto
// Perro { name: 'Pluto' }
// name: "Pluto" 
// [[Prototype]]: Object
silvestre
// Gato { name: 'Silvestre' }
// name: "Silvestre"
// [[Prototype]]: Object
mickey
// Raton { name: 'Mickey' }
// name: "Mickey"
// [[Prototype]]: Object
