var peter = ['Peter', 'Pan', 20]

//var name = peter[0]
//var surname = peter[1]
var [name, surname] = peter

console.log(name, surname)
// VM2030:8 Peter Pan

var [, , age] = peter

console.log(age)
// VM2030:8 Peter Pan
// VM2030:12 20
