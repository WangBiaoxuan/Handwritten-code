var x = [1, 2, 3]

x.MyReduce((res, next) => {
    return res + next;
}, 0)

Array.prototype.MyReduce = function(reduceFun, initailValue) {
    var res = initailValue, i = 0;

    if (initailValue === undefined) {
        res = this[i];
        i++
    }

    while(i < this.length) {
        res = reduceFun(res, this[i++])
    }

    return res;
}