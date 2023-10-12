console.log('TEST map')
console.log('CASE map array [1, 4, 9, 16] to new array with elements multiplied by two ')

var arrayToMap = [1, 4, 9, 16];

// Pass a function to map
//var mappedArray = map (arrayToMap, function (x) { return x * 2});
var mappedArray = map (arrayToMap, multiplyBy2);

function multiplyBy2 (x) {
    return x*2
}

//
console.log(mappedArray);
// Expected output: Array [2, 8, 18, 32]