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
            const displacement = arguments.length - 2

            for (let i = this.length - 1; i >= start; i--) {
                const element = this[i]

                this[i + displacement] = element
            }

            this[start] = item

            for (let i = 3; i < arguments.length; i++) {
                const element = arguments[i]

                this[start + i - 2] = element
            }

            this.length += displacement

            return new Curry
        } else if (removeCount === 1 && arguments.length === 3) {
            const elementToRemove = this[start]

            this[start] = item

            const removed = new Curry

            removed[0] = elementToRemove
            removed.length++

            return removed
        } else if (removeCount >= 1) {
            const removed = new Curry

            for (let i = start; i < this.length - 1; i++) {
                const elementToRemove = this[i]

                removed[removed.length] = elementToRemove
                removed.length++

                const next = this[i + removeCount]

                this[i] = next
            }

            for (let i = this.length - removeCount; i < this.length; i++)
                delete this[i]

            this.length -= removeCount

            return removed
        }
    }
}