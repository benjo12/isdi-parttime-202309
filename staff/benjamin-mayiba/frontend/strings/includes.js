function includes(string, searchString) {
    for (var i = 0; i <= string.length - searchString.length; i++) {
      var found = true
      for (var j = 0; j < searchString.length; j++) {
        if (string[i + j] !== searchString[j]) {
          found = false
          break
        }
      }
      if (found) {
        return true
      }
    }
    return false
  }