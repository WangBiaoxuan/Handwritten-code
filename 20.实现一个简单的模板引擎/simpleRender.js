let template = '我是{{name}}，年龄{{age}}，性别{{sex}}';
let data = {
  name: '姓名',
  age: 18
}
render(template, data); 
// 我是姓名，年龄18，性别undefined


function render(template, data) {
    return template.replace(/\{\{([a-zA-Z]+?)\}\}/g, function($0, $1) {
        console.log('$1', $1)
        console.log('data[$1]', data[$1])
        if (data[$1]) {
            return data[$1]
        } else {
            return undefined;
        }
    })
}