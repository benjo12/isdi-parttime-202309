Curry.prototype.concat = function() {
    var result = [];
    var resultIndex = 0;
  
    // Copiar los elementos de la instancia actual a result
    for (var i = 0; i < this.length; i++) {
      result[resultIndex] = this[i];
      resultIndex++;
    }
  
    // Aplanar los argumentos y copiarlos a result
    for (var j = 0; j < arguments.length; j++) {
      var arg = arguments[j];
      if (Array.isArray(arg)) {
        // Si el argumento es un arreglo, aplanarlo y copiar cada elemento
        for (var k = 0; k < arg.length; k++) {
          result[resultIndex] = arg[k];
          resultIndex++;
        }
      } else {
        result[resultIndex] = arg;
        resultIndex++;
      }
    }
  
    result.length = resultIndex; // Actualizar la propiedad length
    return result;
  }