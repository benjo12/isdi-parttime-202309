function Car(brand, model, year, color, license, motor) {
    this.brand = brand || null
    this.model = model || null
    this.year = year || null
    this.color = color || null
    this.license = license || null
    this.motor = motor || null
    this.status = 'off'
}

//Car.prototype = {}
//Car.prototype.constructor = Car

Car.prototype.start = function () {
    this.status = 'on'
}

Car.prototype.stop = function () {
    this.status = 'off'
}

var beatle = new Car('Volkswagen', 'Beatle')
var cinquecento = new Car('Fiat', '500')

console.log(beatle.__proto__ === Car.prototype) // true
console.log(cinquecento.__proto__ === Car.prototype) // true
console.log(beatle.__proto__ === cinquecento.__proto__) // true

beatle.start()
console.log(beatle)

cinquecento.start()
console.log(cinquecento)

// VM2216: 25 true
// VM2216: 26 true
// VM2216: 27 true
// VM2216: 30 Car { brand: 'Volkswagen', model: 'Beatle', year: null, color: null, license: null, … } brand: "Volkswagen"color: nulllicense: nullmodel: "Beatle"motor: nullstatus: "on"year: null[[Prototype]]: Object
// VM2216: 33 Car { brand: 'Fiat', model: '500', year: null, color: null, license: null, … }