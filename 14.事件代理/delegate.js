// 错误版本，没有考虑li标签中有span标签的情况，有span，target就为span了
ul.addEventListener('click', function (e) {
    console.log(e,e.target)
    if (e.target.tagName.toLowerCase() === 'li') {
        console.log('打印')  // 模拟fn
    }
})

/**
 * 
 * @param {*} parent 代理的对象
 * @param {*} eventType 事件类型
 * @param {*} selector 被代理的元素选择器
 * @param {*} callback 回调
 */
function delegate(parent, eventType, selector, callback) {

    parent.addEventListener(eventType, function(e) {
        const ele = e.target;

        while(!ele.matches(selector) && parent !== ele) {
            ele = ele.parentNode;
        }

        if (ele) {
            callback.call(ele, e, ele);
        }

        return parent;
    }, false)

}