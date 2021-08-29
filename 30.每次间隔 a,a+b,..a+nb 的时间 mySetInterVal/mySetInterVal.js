// 写一个 mySetInterVal(fn, a, b),每次间隔 a,a+b,..a+nb 的时间，然后写一个 myClear，停止上面的 mySetInterVal

// 不能使用setInterval, 因为setInterval的时间间隔是固定的
function mySetInterVal(fn, a, b) {

    let timer1 = null;
    let count = 0;

    function inner() {
        timer1 = setTimeout(() => {
            fn();
            count++;
            inner();
        }, a + count * b);
    }

    // 一个定时器就够了，立即执行
    inner();

    let clear = function() {
        timer1 && clearTimeout(timer1);
    }

    return {
        clear,
    }
}

var x = mySetInterVal(function() {
    console.log('time is', Date.now())
}, 1000, 1000)

x.clear()