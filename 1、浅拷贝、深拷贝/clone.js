// 浅拷贝
function clone (parent, child = {}) {
//    return Object.assign(child, parent)
//    return { ...child, ...parent }
    for (let i in parent) {
        if (parent.hasOwnProperty('i')) {
            child[i] = parent[i]
        }
    }
    return child;
}


// 深拷贝
function deepClone(parent, child = {}) {
    for (let i in parent) {
        if (typeof parent[i] === 'object') {
            // 如果parent是数组, child应该返回也是数组，而不是对象
            let childDefaultValue = Object.prototype.toString.call(parent[i]) === '[object Array]' ? [] : {};
            child[i] = deepClone(parent[i], childDefaultValue)
        } else {
            child[i] = parent[i];
        }
    }

    return child;
}