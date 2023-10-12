console.log('TEST filter')

console.log('CASE filter array [1, 4, 9, 16] to new array with elements >5 ')

var arrayToFilter = [1, 4, 9, 16];

// Pass a function to filter
var filteredArray = filter (arrayToFilter, isGreaterThan5);

function isGreaterThan5 (x) {
    return x>5
}

console.log(filteredArray);
// Expected output: Array [9, 16]