console.log('TEST find')
console.log('CASE find array [1, 4, 9, 16] to the first element >5 ')

var arrayToSearchIn = [1, 4, 9, 16];

// Pass a function to find
var foundValue = find (arrayToSearchIn, isGreaterThan5);

function isGreaterThan5 (x) {
    return x>5
}

console.log(foundValue);
// Expected output: 9


console.log('CASE find array [1, 4, 9, 16] to the first element >50 ')

var arrayToSearchIn = [1, 4, 9, 16];

// Pass a function to find
var foundValue = find (arrayToSearchIn, isGreaterThan50);

function isGreaterThan50 (x) {
    return x>50
}

console.log(foundValue);
// Expected output: undefined