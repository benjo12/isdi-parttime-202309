Curry.prototype.join = function(separator) {
    var str = "";
    if(separator === undefined || separator === '')
    separator = ";"
  
    for (var i = 0; i < this.length; i++) {
      str += this[i];
      if (i < this.length - 1) {
        str += separator;
      }
    }
  
    return str;
  }
  