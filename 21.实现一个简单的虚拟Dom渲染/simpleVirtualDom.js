let domNode = {
    tagName: 'ul',
    props: { class: 'list' },
    children: [{
      tagName: 'li',
      children: ['item1']
    }, {
      tagName: 'li',
      children: ['item1']
    }]
  };
  
  // 构建一个 render 函数，将 domNode 对象渲染为 以下 dom
  <ul class="list">
      <li>item1</li>
      <li>item2</li>
  </ul>


function render(obj) {
    var ele = document.createElement(obj.tagName);

    if (obj.props) {
      for (let prop in obj.props) {
        ele.setAttribute(prop, obj.props[prop]);
      }
    }

    if (obj.children) {
      obj.children.forEach(children => {
          if (typeof children === 'object') {
            const childenEle = render(children);
            ele.appendChild(childenEle);
          } else {
            const text = document.createTextNode(children);
            ele.appendChild(text);
          }
      });
    }

    return ele;
}