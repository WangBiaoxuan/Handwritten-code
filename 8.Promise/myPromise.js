
// 调用
const promise1 = new Promise((resolve, reject) => {
    // 同步 resolve('FULFILLED')
    // 异步 如下
    setTimeout(() => {
      resolve('FULFILLED')
    }, 1000)
  })
  
// 成功回调中，返回值
const onFulfilled1 = function(value) {
    return value + 1;
}

// 成功回调中，返回一个新的Promise
const onFulfilled3 = function(value) {
    return new Promise((resolve, reject) => {
        resolve(value + 1)
    })
}

promise1.then(onFulfilled1, onRejected1).then(onFulfilled2, onRejected2);

promise1.then(onFulfilled3, onRejected3).then(onFulfilled4, onRejected4);

console.log(333)


class MyPromise {
    constructor(executor) {
        this._stauts = 'PENDING';
        this._value = undefined;
        this._fullFilledCallback = [];
        this._rejectedCallback = [];
        executor(_resolve, _reject);
    }


    _resolve(value) {
        this._stauts = 'FULLFILED';
        this._value = value;

        function resolveFun() {
            let cb;
            while(cb = this._fullFilledCallback.shift()) {
                cb(value);
            }
        }

        setTimeout(resolveFun, 0)
    }

    _resolve(reason) {
        this._stauts = 'REJECTED';
        this._value = reason;

        function resolveFun() {
            let cb;
            while(cb = this._rejectedCallback.shift()) {
                cb(reason);
            }
        }

        setTimeout(resolveFun, 0)
    }

    then(function(onFullfill, onReject) {
        return new MyPromise(function(resolveNext, rejectNext){

            const resolveFn = function(value) {
                try {
                    const res = onFullfill(value)
                    if (res instanceof MyPromise) {
                        // 把resolveNext、rejectNext作为res的then参数, 有可能添加到res的_fullFilledCallback/_rejectedCallback回调当中
                        // 前一个Promise 状态改变后, 调用后一个 Promise的resolveNext/rejectNext, 触发通过then添加到后一个Promise的_fullFilledCallback/_rejectedCallback回调中的onFullfillNext/onRejectNext执行
                        res.then(resolveNext, rejectNext)
                    } else {
                        // 调用后一个 Promise的resolveNext, 触发通过then添加到后一个Promise的_fullFilledCallback回调中的onFullfillNext执行
                        resolveNext(res);
                    }
                } catch(error) {
                    // 调用后一个 Promise的rejectNext, 触发通过then添加到后一个Promise的_rejectedCallback回调中的onRejectNext执行
                    rejectNext(error);
                }
            }

            const rejectFn = function(reason) {
                try {
                    const res = onReject(reason)
                    if (res instanceof MyPromise) {
                        res.then(resolveNext, rejectNext)
                    } else {
                        resolveNext(res);
                    }
                } catch(error) {
                    rejectNext(error);
                }
            }
            

            switch (this.status) {
                case 'PENDING':
                    this._fullFilledCallback.push(resolveFn);
                    this._fullFilledCallback.push(rejectFn);
                    break;
                case 'FULLFILED':
                    resolveFn(this._value);
                    break;
                case 'REJECTED':
                    rejectFn(this._value);
                    break;
            }
        })
    })

    catch(onRejectFn) {
        return this.then(() => {}, (error) => {
            onRejectFn(error)
        })
    }

    finally(finallyFn) {
        return this.then((value) => {
            finallyFn(value)
        }, (error) => {
            finallyFn(error)
        })
    }

    // resolve的作用: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve
    static resolve(value) {
        // 这个很关键，因为在all中有使用, 如果是Promise就返回Promise
        if (value instanceof MyPromise) return value;
        return new MyPromise((resolve, reject) => { resolve(value); })
    }

    // reject的作用: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/reject
    static reject(reason) {
        if (value instanceof MyPromise) return value;
        return new MyPromise((resolve, reject) => { reject(reason); })
    }

    static all(array) {
        return new MyPromise((resolve, reject) => {
            const res = [];
            let count = 0;
            array.forEach((item) => {

                MyPromise.resolve(item).then((value) => {
                    count++;
                    res.push(value)

                    if (count === array.length) {
                        resolve(res);
                    }
                }, (reason) => {
                    reject(reason)
                })
            });
        })
    }

    static allSettled(array) {
        return new MyPromise((resolve, reject) => {
            const res = [];
            let count = 0;
            array.forEach((item, index) => {
                MyPromise.resolve(item).then((value) => {
                    count++;
                    res[index] = value;
                    if (count === array.length) {
                        resolve(res);
                    }
                }, (reason) => {
                    count++;
                    res[index] = reason;
                    if (count === array.length) {
                        resolve(res);
                    }
                })
            });
        })
    }

    static race(array) {
        return new MyPromise((resolve, reject) => {
            array.forEach((item) => {
                MyPromise.resolve(item).then((value) => {
                    resolve(value);
                }, (reason) => {
                    reject(reason)
                })
            })
        })
    }

    static any(array) {
        return new MyPromise((resolve, reject) => {
            let count = 0;
            array.forEach((item) => {
                MyPromise.resolve(item).then((value) => {
                    resolve(value);
                }, (reason) => {
                    count++;
                    if (count === array.length)
                    reject(reason);
                })
            })
        })
    }
}

