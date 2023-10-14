console.log('TEST Curry concat ');

var c = new Curry("potato", "tomato");

console.log('CASE for c concat ["chillies", "green-pepper"]  results in ["potato", "tomato", "chillies", "green-pepper"]');
var rep = c.concat(["chillies", "green-pepper"]);
console.log(rep);
// ["potato", "tomato", "chillies", "green-pepper"]

console.log('CASE for c concat  [1, 9] results in ["potato", "tomato", 1, 9]');
var rep = c.concat([1, 9]);
console.log(rep);
// ["potato", "tomato", 1, 9]

console.log("CASE for c concat [0, 9, 6, 3], ['q', 'we', 'low'] results in ['potato', 'tomato', 0, 9, 6, 3, 'q', 'we', 'low']");
var rep = c.concat([0, 9, 6, 3], ['q', 'we', 'low']);
console.log(rep);
// ["potato", "tomato", 0, 9, 6, 3, 'q', 'we', 'low']
