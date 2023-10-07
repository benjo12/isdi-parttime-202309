function pop(arr) {
    var element = arr[arr.length-1]
arr.length = arr.length-1
    
    return {
        element: element,
        array: arr
    };
}
