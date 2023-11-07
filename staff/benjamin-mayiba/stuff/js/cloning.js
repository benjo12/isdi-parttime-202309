// clone an object

//var o = { name: 'Oswald', age: 25 }
function O(name, age) {
    this.name = name
    this.age = age
}
var o = new O('Oswald', 25)

//var o2 = {}
var o2 = new O
o2.name = o.name
o2.age = o.age

//var o3 = { name: o.name, age: o.age }
var o3 = new O(o.name, o.age)

//var o4 = {}
var o4 = new O
var keys = Object.keys(o)
for (var i = 0; i < keys.length; i++) {
    var key = keys[i]

    o4[key] = o[key]
}

//var o5 = {}
var o5 = new O
for (var key in o) {
    o5[key] = o[key]
}

var o6 = { ...o }


// var clone an array

var a = [10, 20, 30]

var a2 = []
a2[0] = a[0]
a2[1] = a[1]
a2[2] = a[2]

var a3 = [a[0], a[1], a[2]]

var a4 = []
for (var i = 0; i < a.length; i++) {
    a4[i] = a[i]
}

var a5 = []
for (var i in a) {
    a5[i] = a[i]
}

var a6 = []
for (var v of a) {
    a6[a6.length] = v
}

var a7 = a.map(v => v)

var a8 = a.concat()

var a9 = a.slice()

var a10 = [...a]
