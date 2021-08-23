sum(1)(2, 3) == 6
sum(1)(2, 3)(4, 5, 6) == 21 


function sum(...args) {
    function add(...rest) {
        return sum(...args, ...rest)
    }

    add.valueOf = function() {
        return args.reduce((prev, res) => prev + res);
    }

    return add;
}



class A {
    constructor(value) {
        this.value = value;
    }

    valueOf(){
        return this.value++
    }
}

var a = new A(1);

if (a == 1 && a == 2 && a == 3) {
    console.log('true');
}
    