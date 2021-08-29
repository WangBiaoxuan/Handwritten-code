// 质数/素数的概念：除了1和该数自身外，无法被其他自然数整除的数
// 参考：https://zh.wikipedia.org/wiki/%E8%B4%A8%E6%95%B0
function isPrime(num) {
    if (num === 2 || num === 3) {
        return true;
    } else {
        // 能被2整除, 一定不是质数/素数
        if (num % 2) {
            return false;
        }
    }

    // 只需要判断 2 ~ Math.sqrt(num)之间的值, 能否被num整除即可
    const max = Math.sqrt(num);

    // 为什么能=+2？进行到这里, 一定是奇数, 既然是奇数, +1就是偶数了, 不可能进行到这里, 偶数不是质数, 在上面就应该返回false了
    for (let i = 3; i < max; i+= 2) {
        if (num % i === 0) {
            return false
        }
    }

    return true;
}