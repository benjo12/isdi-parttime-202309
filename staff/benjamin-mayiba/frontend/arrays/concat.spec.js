console.log('TEST of concat for Array')

console.log('CASE for ["potato", "tomato"] concat ["chillies", "green-pepper"]  results in ["potato", "tomato", "chillies", "green-pepper"]')
console.log(concat(["potato", "tomato"], ["chillies", "green-pepper"]))
// ["potato", "tomato", "chillies", "green-pepper"]

console.log('CASE for [1, 9] concat  ["chillies", "green-pepper"] results in [1, 9, "chillies", "green-pepper"]')
console.log(concat([1, 9], ["chillies", "green-pepper"]))
// [1, 9, "chillies", "green-pepper"]


console.log("CASE for [1,3,4,5] concat [0,9,6,3], ['q','we','low'] results in [1,3,4,5, 0,9,6,3,'q','we','low']")
console.log(concat([1,3,4,5],[0,9,6,3],['q','we','low']))
// [1,3,4,5, 0,9,6,3,'q','we','low']

