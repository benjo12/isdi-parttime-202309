function lastIndexOf(string, searchString) {
    // TODO
    for(var i = string.length - 1; i>= 0; i--){
        if(string[i]=== searchString)
            return i
    }
   
    return -1
}