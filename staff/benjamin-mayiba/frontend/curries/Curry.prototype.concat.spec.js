console.log('TEST Curry concat ');

var c = new Curry("potato", "tomato");

console.log('CASE for c concat ["chillies", "green-pepper"]  results in ["potato", "tomato", "chillies", "green-pepper"]');
var rep = c.concat(["chillies", "green-pepper"]);
console.log(rep);
// {
//   '0': 'potato',
//   '1': 'tomato',
//   '2': 'chillies',
//   '3': 'green-pepper',
//   length: 4
// }

console.log('CASE for c concat  [1, 9] results in ["potato", "tomato", 1, 9]');
var rep = c.concat([1, 9]);
console.log(rep);
// { '0': 'potato', '1': 'tomato', '2': 1, '3': 9, length: 4 }

console.log("CASE for c concat [0, 9, 6, 3], ['q', 'we', 'low'] results in ['potato', 'tomato', 0, 9, 6, 3, 'q', 'we', 'low']");
var rep = c.concat([0, 9, 6, 3], ['q', 'we', 'low']);
console.log(rep);

// {
//     '0': 'potato',
//     '1': 'tomato',
//     '2': 0,
//     '3': 9,
//     '4': 6,
//     '5': 3,
//     '6': 'q',
//     '7': 'we',
//     '8': 'low',
//     length: 9
//   }

