 function map(callback) {
    var result =[]
    for (var i = 0; i < this.length; i++){
        var element = this[i]
        result[i] = callback(element)
    }
    return result
}