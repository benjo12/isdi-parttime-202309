function Car(brand, model) {
    this.brand = brand
    this.model = model
    this.engine = 'off'
}
// NOTE js does these automatically (on first level)
//Car.prototype = Object.create(Object.prototype)
//Car.prototype.constructor = Car

Car.prototype.maxSpeed = 120
Car.prototype.start = function () { this.engine = 'on' }
Car.prototype.stop = function () { this.engine = 'off' }

function Ferrari(model) {
    Car.call(this, 'Ferrari', model)
}
Ferrari.prototype = Object.create(Car.prototype)
Ferrari.prototype.constructor = Ferrari
Ferrari.prototype.maxSpeed = 300 // property overriding
Ferrari.prototype.start = function () { this.engine = 'ON' } // method overriding

function Lamborghini(model) {
    Car.call(this, 'Lamborghini', model)
}
Lamborghini.prototype = Object.create(Car.prototype)
Lamborghini.prototype.constructor = Lamborghini
Lamborghini.prototype.maxSpeed = 320 // property overriding

const testarossa = new Ferrari('Testarossa')
const f350 = new Ferrari('F350')
const diablo = new Lamborghini('Diablo')
const aventador = new Lamborghini('Aventador')
const beetle = new Car('Volkswagen', 'Beetle')