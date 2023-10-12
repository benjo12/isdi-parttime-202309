function join(elements, separator) {
  var str = "";
  if(separator === undefined)
  separator = ";"

  for (var i = 0; i < elements.length; i++) {
    str += elements[i];
    if (i < elements.length - 1) {
      str += separator;
    }
  }

  return str;
}
