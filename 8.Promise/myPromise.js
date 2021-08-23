
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

        return new MyPromise(function(onResolveNext, onRejectNext){

            const resolveFn = function(value) {
                try {
                    const res = onFullfill(value)
                    if (res instanceof MyPromise) {
                        res.then(onResolveNext, onRejectNext)
                    }
                } catch(error) {
                    onRejectNext(error);
                }

                
            }

            const rejectFn = function(value) {
                
            }
            

            switch (this.status) {
                case 'PENDING':
                    this._fullFilledCallback.push(resolveFn);
                    this._fullFilledCallback.push(rejectFn);
                    break;
                case 'FULLFILED':


                case 'REJECTED':

            }



        })
        
    });
}

