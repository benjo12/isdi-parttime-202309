function filter(array, callback) {
    var result = []

    for (var i = 0; i < array.length; i++) {
        var element = array[i]

        if (callback(element))
            result[result.length] = element
    }

    return result
}