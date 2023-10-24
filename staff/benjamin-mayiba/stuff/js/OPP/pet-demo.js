
class Pet {
    constructor(name) {
        this.name = name
    }

    fart() { console.log('💨') }
}

class Perro extends Pet {
    constructor(name) {
        super(name)
    }

    bark() { console.log('woof!') }
}

class Dalmata extends Perro {
    constructor(name) {
        super(name)
    }
}

class Gato extends Pet {
    constructor(name) {
        super(name)
    }

    meow() { console.log('meow!') }
}

class Raton extends Pet {
    constructor(name) {
        super(name)
    }

    squeak() { console.log('reee!') }
}

const pluto = new Perro('Pluto')
const silvestre = new Gato('Silvestre')
const mickey = new Raton('Mickey')
const pongo = new Dalmata('Pongo')