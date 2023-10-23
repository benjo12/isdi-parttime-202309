TEST('Curry pop')

CASE('extract last element from curry { 10, 20, 30 }')

var nums = new Curry(10, 20, 30)

var extracted = nums.pop()

console.log(extracted)
// 30

console.log(nums)
// Curry { 0: 10, 1: 20, length: 2 }

CASE('extract no element (undefined) from curry {}')

var empty = new Curry

var extracted = empty.pop()

console.log(extracted)
// undefined

console.log(empty)
// Curry { length: 0 }