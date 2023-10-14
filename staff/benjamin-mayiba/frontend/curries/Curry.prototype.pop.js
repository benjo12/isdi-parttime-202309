Curry.prototype.pop = function () {
    if (this.length === 0) {
        return;
    }

    var poppedElement = this[this.length - 1];
    this.length = this.length - 1;
    this[this.length] = undefined;  // Reemplaza la última propiedad con undefined

    return { element: poppedElement };
};