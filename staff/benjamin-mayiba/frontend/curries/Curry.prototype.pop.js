Curry.prototype.pop = function () {
    if (!this.length) return

    var last = this[this.length - 1]

    delete this[--this.length]

    return last
}