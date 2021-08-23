// 处理函数
function handle(e) {
    console.log(e); 
}
// 滚动事件
window.addEventListener('scroll', myDebounce(handle, 1000));
// 点击事件
window.addEventListener('onClick', myDebounce(handle, 1000, true));



const myDebounceSimple = function(func, delay) {
    let timer = null;
    return function(...args) {
        if (timer) clearTimeout(timer);

        // 新的定时器
        timer = setTimeout(() => {
            // 注意这里使用this, 是因为外边是箭头函数
            func.apply(this, args);
        }, delay)
    }
}


const myDebounce = function(func, delay, immediate) {
    let timer = null;

    function debounced(...args){
        if (timer) clearTimeout(timer);

        // 立即执行类型, 且timer为null, 立即执行
        var callNow = immediate && !timer;

        if (callNow) func.apply(this, args);

        // 新的定时器
        timer = setTimeout(() => {
            // 间隔delay后，把timer设置为null，方便后面立即执行
            timer = null;
            // 不是立即执行类型, 则执行
            if (!immediate) func.apply(this, args);
        }, delay);
    }
    
    // 取消，放在这个函数的方法上
    debounced.cancel = function() {
        clearTimeout(timer);
        timer = null;
    }

    return debounced;
}