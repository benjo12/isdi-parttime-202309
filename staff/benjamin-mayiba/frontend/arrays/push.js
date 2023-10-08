function push(box, element) {
  box[box.length] = element;

  return {
    length: box.length,
    array: box,
  };
}
