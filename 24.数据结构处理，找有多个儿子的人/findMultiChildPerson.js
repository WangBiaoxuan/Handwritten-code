// 样例数据
let data = {
    name: 'jack',
    child: [
        { name: 'jack1' },
        {
            name: 'jack2',
            child: [{
                name: 'jack2-1',
                child: { name: 'jack2-1-1' }
            }, {
                name: 'jack2-2'
            }]
        },
        {
            name: 'jack3',
            child: { name: 'jack3-1' }
        }
    ]
}

// 1、结果存在外面, 递推自身
const res = [];
function findMultiChildPerson(data) {
    if (data.child && Array.isArray(data.child) && data.child.length > 1) {
        res.push(data.name)
    }

    if (data.child && Array.isArray(data.child)) {
        data.child.forEach(child => {
            findMultiChildPerson(child);
        })
    }
    return res;
}

// 2、结果在里面, 递归内部函数
function findMultiChildPerson(data) {
    const res = [];

    function innerFunc(data) {
        if (data.child && Array.isArray(data.child) && data.child.length > 1) {
            res.push(data.name)
        }
    
        if (data.child && Array.isArray(data.child)) {
            data.child.forEach(child => {
                innerFunc(child);
            })
        }
    }

    innerFunc(data);

    return res;
}

