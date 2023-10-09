function concat(...arrays) {
  var result = [];
  var Index = 0;
  for (var arr of arrays) {
    for (var item of arr) {
      result[Index] = item;
      Index++;
    }
  }
  return result;
}
