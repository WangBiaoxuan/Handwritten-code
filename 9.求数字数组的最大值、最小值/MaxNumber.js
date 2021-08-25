var x = [1, 2, 3];

// 1、解构
Math.max(...x);

// 2、apply, 注意参数, 调用对象为null, 参数为数组
Math.max.apply(null, x);