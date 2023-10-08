console.log('TEST push')

console.log("CASE for ['soccer', 'baseball'] push ['football', 'swimming']  results in 3 as new length and  [ 'soccer', 'baseball', ['football', 'swimming'] ] as new array")
console.log(push(["soccer", "baseball"], ["football", "swimming"]))
// 3
// [ 'soccer', 'baseball', ["football", "swimming"] ]

console.log("CASE for ['pigs', 'goats', 'sheep'] push 'cows'  results in 4 as new length and  ['pigs', 'goats', 'sheep', 'cows'] as new array")
console.log(push(['pigs', 'goats', 'sheep'],'cows'))
// 4
// ['pigs', 'goats', 'sheep', 'cows']
