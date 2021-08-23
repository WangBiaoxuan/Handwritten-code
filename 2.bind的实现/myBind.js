const func1 = function() {
    return [...arguments].reduce((prev, res) => prev + res);
}

// 用法
let bindFunc1 = func1.myBind(this1, 1, 2, 3)
// 用法1
bindFunc1(4, 5, 6)

// 用法2，返回的函数，可以实例化，如果是new的话, func1 中的this，应该是new bindFunc1()这个对象，而不是this1
new bindFunc1(4, 5, 6)

Function.prototype.myBind = function(Obj, ...rest) {
    const Func = this;
    const tempFun = function(...args) {
        Func.apply(this instanceof tempFun ? this: Obj, rest.concat(args));
    }
    // 给用法2使用, 返回的函数, 能继承Func上原型上的方法
    tempFun.prototype = Object.create(Func.prototype);
    return tempFun;
}


