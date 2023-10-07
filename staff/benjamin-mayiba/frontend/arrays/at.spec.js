console.log('TEST function at for Array')

console.log('CASE for ["potato", "tomato", "chillies", "green-pepper"] array at  0 results in potato')
console.log(at(["potato", "tomato", "chillies", "green-pepper"], 0))
// potato

console.log('CASE for ["potato", "tomato", "chillies", "green-pepper"] array at  3 results in green-pepper')
console.log(at(["potato", "tomato", "chillies", "green-pepper"], 3))
// green-pepper

console.log('CASE for ["potato", "tomato", "chillies", "green-pepper"] array at  -2 results in chillies')
console.log(at(["potato", "tomato", "chillies", "green-pepper"], -2))
// chillies

console.log('CASE for ["potato", "tomato", "chillies", "green-pepper"] array at  14 results in not found')
console.log(at(["potato", "tomato", "chillies", "green-pepper"], 14))
// not found