
Curry.prototype.at = function(position){
    if (position < 0) {
      position = this.length + position;
    }
   
    if (position >= 0 && position < this.length) {
      return this[position];
    }
}
