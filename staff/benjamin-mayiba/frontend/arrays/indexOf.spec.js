console.log('TEST indexOf for Array')
console.log('CASE for ["potato", "tomato", "chillies", "green-pepper"] indexOf "tomato" results in 1')
console.log(indexOf(["potato", "tomato", "chillies", "green-pepper"], 'tomato'))
// 1

console.log('CASE for ["potato", "tomato", "chillies", "green-pepper"] indexOf "camel" results in -1')
console.log(indexOf(["potato", "tomato", "chillies", "green-pepper"], 'camel'))
// -1

console.log('CASE for [2, 9, 9] indexOf 2 results in 0')
console.log(indexOf([2, 9, 9], 2))
// 0

console.log('CASE for [2, 9, 9] indexOf 9 results in 1')
console.log(indexOf([2, 9, 9], 9))
// 1

console.log('CASE for [2, 9, 9] indexOf 14 results in -1')
console.log(indexOf([2, 9, 9], 14))
// -1
