console.log('TEST Curry pop');

var c = new Curry('pigs', 'goats', 'sheep', 'cows');
console.log("CASE for c.pop results in 'cows'");
var v = c.pop();
console.log(v.element);  // Imprime 'cows'
console.log(c);  // Imprime {0:'pigs', 1:'goats', 2:'sheep', 3:undefined, length: 3}

var c2 = new Curry('swimming', 'soccer', 'baseball', 'football'); 
console.log("CASE for c2.pop results in 'football'");
var v2 = c2.pop();
console.log(v2.element);  // Imprime 'football'
  // Imprime {0:'swimming', 1:'soccer', 2:'baseball', 3:undefined, length: 3}

