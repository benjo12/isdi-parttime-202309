class Curry {
    constructor(...args) {
        if (args.length === 1)
            if (Number.isInteger(args[0]) && args[0] >= 0) {
                this.length = args[0]

                return
            } else if (Number.isInteger(args[0]) && args[0] < 0 || typeof args[0] === 'number' && !Number.isInteger(args[0]))
                throw new RangeError('Invalid curry length')

        for (let i = 0; i < args.length; i++) {
            const argument = args[i]

            this[i] = argument
        }

        this.length = args.length
    }

    push(...items) {
        if (items.length) {
            this[this.length] = items[0]
            this.length++

            if (items.length > 1)
                for (let i = 1; i < items.length; i++) {
                    this[this.length] = items[i]
                    this.length++
                }
        }

        return this.length
    }

    pop() {
        if (!this.length) return

        const last = this[this.length - 1]

        delete this[--this.length]

        return last
    }

    splice(start, removeCount, item) {
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
}