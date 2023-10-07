function join(elements, separator) {
  var str = "";
  for (var i = 0; i < elements.length; i++) {
    str += elements[i];
    if (i < elements.length - 1) {
      str += separator;
    }
  }

  return str;
}
