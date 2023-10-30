// function concat(...arrays) {
//   var result = [];
//   var Index = 0;
//   for (var arr of arrays) {
//     for (var item of arr) {
//       result[Index] = item;
//       Index++;
//     }
//   }
//   return result;
// }


function concat() {
  var result = [];
  for (var i = 0; i < arguments.length; i++) {
    var arr = arguments[i];
    for (var j = 0; j < arr.length; j++) {
      result[result.length] = arr[j];
    }
  }
  return result;
}
