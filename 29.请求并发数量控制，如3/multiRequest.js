/**
 * 实现一个批量请求函数 multiRequest(urls, maxNum), 
 * 1、要求最大并发数 maxNum,
 * 2、每当有一个请求返回，就留下一个空位，可以增加新的请求,
 * 3、所有请求完成后，结果按照 urls 里面的顺序依次打出
 */
const urls = [
    'https://placeholder.com/1',
    'https://placeholder.com/2',
    'https://placeholder.com/3',
    'https://placeholder.com/4',
    'https://placeholder.com/5',
    'https://placeholder.com/6',
    'https://placeholder.com/7',
    'https://placeholder.com/8',
    'https://placeholder.com/9',
    'https://placeholder.com/10',
    'https://placeholder.com/11',
    'https://placeholder.com/12',
]

function multiRequest(urls, maxNum) {
    return new Promise((resolve, reject) => {
            const urlLength = urls.length;
            // 或者 new Array(urlLength)
            var res = Array.from({ length: urlLength }).fill(false), count = 0;

            while(count < maxNum) {
                request();
            }
           
            function request() {
                // current为count的临时储存值, 防止异步请求后, count一直变化, 回调中拿不到请求发出前的数
                // 记录即将要发出的请求索引
                let current = count;

                // 不能多发请求, 在这里判断, 即将发出的数组索引，必须小于数组的数量
                if (current >= urlLength) {
                    // 已经发出的请求数量，可能还没拿到返回值, 所以需要判断是否每个请求都已经拿到返回值
                    // 这里会执行多次
                    if (res.every(item => !!item)) {
                        resolve(res);
                    }
                    return;
                }

                // 请求的下一个索引值
                count++;

                fetch(urls[current]).then((data) => {
                    res[current] = data;

                    // 已经拿到结果的索引, 需要继续把结果resolve, 继续执行request
                    if (current < urlLength) {
                        request()
                    }
                }, (error) => {
                    res[current] = error;

                    // 已经拿到结果的索引, 需要继续把结果resolve, 继续执行request
                    if (current < urlLength) {
                        request()
                    }
                })
            }
    })
    
}

var x = multiRequest(urls, 3)
x.then((res) => {
    console.log(res)
})