function toOneLevelArr(arr) {
    return arr.flat(Infinity).sort((prev, next) => prev - next);
}

var arr = [[1,2,3],[4,5,6],[7,8,9],[1,2,3],[4,5,6]];

toOneLevelArr(arr);