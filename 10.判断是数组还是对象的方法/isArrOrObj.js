var x = [1, 2, 3];

function isArrOrObject(x) {
    // 1、Array.isArray
    Array.isArray(x);

    // 2、Object.prototype.tostring()
    Object.prototype.tostring(x) === '[object Array]'
    Object.prototype.tostring(x) === '[object object]'

    // 3、instanceof
    x instanceof Array === true


    // 4、constructor
    x.constructor === Array;


    // 5、Object.prototype.isPrototypeOf
    Array.prototype.isPrototypeOf(x);
}