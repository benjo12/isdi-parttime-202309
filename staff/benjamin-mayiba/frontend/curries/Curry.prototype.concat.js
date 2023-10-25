Curry.prototype.concat = function () {
  var result = new Curry();
  var resultIndex = 0;

  for (var i = 0; i < this.length; i++) {
    result[resultIndex] = this[i];
    resultIndex++;
  }

  for (var j = 0; j < arguments.length; j++) {
    var arg = arguments[j];
    if (Array.isArray(arg)) {
      for (var k = 0; k < arg.length; k++) {
        result[resultIndex] = arg[k];
        resultIndex++;
      }
    } else {
      result[resultIndex] = arg;
      resultIndex++;
    }
  }

  result.length = resultIndex;
  return result;
};
