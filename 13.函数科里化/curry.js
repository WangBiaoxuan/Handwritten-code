// 什么是函数科里化？
// 把接受多个参数的函数，转换为可以通过分批接收这些参数的方式调用，当小于函数的参数时，能继续返回一个函数接受余下的参数

// 固定参数，写法1
function curry(fun) {
    return function curryInner(...args) {
        if (args.length >= fun.length) {
            return fun.apply(this, args)
        } else {
            return (...rest) => curryInner( ...args, ...rest);
        }
    }
}

// 固定参数，写法2
function curry(fun, ...args) {
    if (args.length >= fun.length) {
        return fun.apply(this, args);
    } else {
        return (...rest) => curry(fun, ...args, ...rest)
    }
}


var add = (a, b, c) => a + b + c;

var curryAdd = curry(add)
var curryAddTemp = curryAdd(1, 2)
curryAddTemp(3);


// 不固定参数, 不可行, 不能使用递归
function curry(fun) {
    return function curryInner(...args) {
        if (args.length > 0) {
            return (...rest) => curryInner(...args, ...rest);
        } else {
            return fun(...args);
        }
    }
}

// 不固定参数，用变量收集参数, 有参数时, 返回函数本身, 无参数时调用, 写法1
function curry(fun, ...args) {
    const allArg = [...args];
    return function curryInner(...rest) {
        if (rest.length > 0) {
            allArg.push(...rest);
            return curryInner
        } else {
            const res = fun(...allArg);
            allArg = [];
            return res;
        }
    }
}



var add = function() {return [...arguments].reduce((prev, next) => prev + next);} 

var curryAdd = curry(add)
var curryAddTemp = curryAdd(1, 2)(3)(4)
curryAddTemp();


// 不固定参数，写法2
function curry(fun, ...args) {
    const allArg = [...args];
    function curryInner(...rest) {
        allArg.push(...rest);
        return curryInner
    }
   
    curryInner.toString = function() {
        return allArg.reduce((prev, next) => prev + next, 0);
    }

    return curryInner;
}




var add = function() {return [...arguments].reduce((prev, next) => prev + next, 0);} 

var curryAdd = curry(add)
curryAdd(1)(2)(3)(4) // 10
curryAdd(1, 2)(3)(4) // 10
curryAdd(1, 2, 3)(4) // 10
