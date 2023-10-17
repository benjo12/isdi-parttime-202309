Curry.prototype.splice = function (start, removeCount, item) {
    if (removeCount === 0) {
        var displacement = arguments.length - 2

        for (var i = this.length - 1; i >= start; i--) {
            var element = this[i]

            this[i + displacement] = element
        }

        this[start] = item

        for (var i = 3; i < arguments.length; i++) {
            var element = arguments[i]

            this[start + i - 2] = element
        }

        this.length += displacement

        return new Curry
    } else if (removeCount === 1 && arguments.length === 3) {
        var elementToRemove = this[start]

        this[start] = item

        var removed = new Curry

        removed[0] = elementToRemove
        removed.length++

        return removed
    } else if (removeCount >= 1) {
        var removed = new Curry

        for (var i = start; i < this.length - 1; i++) {
            var elementToRemove = this[i]

            removed[removed.length] = elementToRemove
            removed.length++

            var next = this[i + removeCount]

            this[i] = next
        }

        for (var i = this.length - removeCount; i < this.length; i++)
            delete this[i]

        this.length -= removeCount

        return removed
    }
}