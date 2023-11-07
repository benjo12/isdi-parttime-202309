class Car {
    constructor(brand, model) {
        this.brand = brand
        this.model = model
    }
}

class Ferrari extends Car {
    constructor(model) {
        super('Ferrari', model)
    }
}

class Lamborghini extends Car {
    constructor(model) {
        super('Lamborghini', model)
    }
}

const testarossa = new Ferrari('Testarossa')
const f350 = new Ferrari('F350')
const diablo = new Lamborghini('Diablo')
const aventador = new Lamborghini('Aventador')
const beetle = new Car('Volkswagen', 'Beetle')