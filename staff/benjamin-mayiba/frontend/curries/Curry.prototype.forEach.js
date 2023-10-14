console.log('TEST Curry forEach')

function forEach(callback) {
    for (var i = 0; i < this.length; i++) {
        var v = this[i]

        callback(v)
    }
}
