// 时间差
const myThrottle = function(func, delay) {
    let prev = Date.now();

    return function(...args) {
        if (Date.now() - prev > delay) {
            func.apply(this, args);
            prev =  Date.now();
        }
    }
}


// 定时器

const myThrottle = function(func, delay) {
    let timer = null;
    return function(...args) {
        if (!timer) {
            timer =  setTimeout(() => {
                func.apply(this, args)
                timer = null;
            }, delay)
        }
    }
}