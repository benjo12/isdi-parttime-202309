
var complicated = {
    a: 1,
    b: 2,
    c: 3,
    d: [4, 5, 6, () => 7, 8, 9]
}

//complicated.d[3]()
// 7

var { d: [, , , fun] } = complicated

fun()
// 7