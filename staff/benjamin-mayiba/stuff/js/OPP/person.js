function Person(name, gender) {
    this.name = name
    this.gender = gender
}

Person.prototype.eat = function (food) {
    return '👄 ' + food
}

Person.prototype.brushTeeth = function (paste) {
    return '👄 🪥 ' + paste
}

Person.prototype.poo = function () {
    return '🚽 💩 💦'
}

Person.prototype.procreate = function (person) {
    if (!(person instanceof Person))
        throw new Error(person + ' is not a Person')

    if (person.gender === this.gender)
        throw new Error('person gender ' + person.gender + ' is not complementary with ' + this.gender)

    return new Person(null, Math.random() > 0.5 ? 'female' : 'male')
}

var peter = new Person('Peter', 'male')
var wendy = new Person('Wendy', 'female')

peter.eat('🍔')
peter.brushTeeth('🍰')
peter.poo()

var child = wendy.procreate(peter)
child.name = child.gender === 'female' ? 'Petra' : 'Wendo'
console.log(child)