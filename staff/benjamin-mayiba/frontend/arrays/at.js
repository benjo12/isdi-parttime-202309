function at(arr, position) {
    if (position < 0) {
      position = arr.length + position;
    }
  
    if (position >= 0 && position < arr.length) {
      return arr[position];
    } else {
      return 'not found';
    }
  }