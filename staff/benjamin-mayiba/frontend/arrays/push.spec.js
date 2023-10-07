console.log('TEST push')

console.log("CASE for ['pigs', 'goats', 'sheep'] push 'cows'  results in 4 as new length and  ['pigs', 'goats', 'sheep', 'cows'] as new array")
console.log(push(['pigs', 'goats', 'sheep'],'cows'))
// 4
// ['pigs', 'goats', 'sheep', 'cows']

console.log("CASE for ['pigs', 'goats', 'sheep'] push 'cows','potato'  results in 5 as new length and  ['pigs', 'goats', 'sheep', 'cows','potato'] as new array")
console.log(push(['pigs', 'goats', 'sheep'],'cows','potato'))
// 5
// ['pigs', 'goats', 'sheep', 'cows','potato']

console.log("CASE for ['soccer', 'baseball'] push ['football', 'swimming']  results in 4 as new length and  [ 'soccer', 'baseball', 'football', 'swimming' ] as new array")
console.log(push(["soccer", "baseball"], ["football", "swimming"]))
// 4 
// [ 'soccer', 'baseball', 'football', 'swimming' ]
