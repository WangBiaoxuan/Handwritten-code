// 什么是斐波那契，1 1 2 3 5 8 13

f(n) = f(n - 1) + f(n - 2)
且
f(0) = 0, f(1) = 1, f(2) = 1

// 问题, 存在重复计算
function fibonacci(n) {
    if (n === 0) {
        return 0
    }

    if (n === 1) {
        return 1
    }

    return fibonacci(n - 1) + fibonacci(n - 2)
}

// 数组
function fibonacci(n) {
    const res = [0, 1, 1];
    if (n <= 2) {
        return res[n];
    }
    for (let i = 3; i <= n; i++) {
        res[i] = res[i - 1] + res[i - 2];
    }

    return res[n]
}

// 三个变量
function fibonacci(n) {
    // res为cur的临时储存值
    let prev = 0, cur = 1, res = cur;
    if (n === 0)  return prev;
    if (n === 1)  return cur;

    for (let i = 2; i <= n; i++) {
        // 没问题
        cur = prev + cur;
        // 临时储存值给prev
        prev = res;
        // res为cur的临时储存抵制
        res = cur;
    }
    // 返回cur 或者 res都可以
    return res;
}

// es6 解构赋值
function fibonacci(n) {
    let prev = 0, cur = 1;
    if (n === 0) return 0;

    for (let i = 0; i < n; i++) {
        [prev, cur] = [cur, prev + cur];
    }
    return prev;
}