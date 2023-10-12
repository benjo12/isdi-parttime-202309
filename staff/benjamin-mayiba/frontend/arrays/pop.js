function pop(arr) {
  if(arr.length == 0)
  return
  var element = arr[arr.length - 1];
  arr.length = arr.length - 1;

  return {
    element: element,
    array: arr,
  };
}
