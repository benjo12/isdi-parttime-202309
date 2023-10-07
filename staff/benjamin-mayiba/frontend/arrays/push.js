function push(box, ...elements) {
    for (var i = 0; i < elements.length; i++) {
        if (Array.isArray(elements[i])) {
            for (var j = 0; j < elements[i].length; j++) {
                box[box.length] = elements[i][j];
            }
        } else {
            box[box.length] = elements[i];
        }
    }

    return {
        length: box.length,
        array: box
    };
}