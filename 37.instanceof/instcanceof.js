
myInstanceof([], Array)

function myInstanceof (left, right) {
    const rightPrototype = right.prototype;
    let leftProto = Object.getPrototypeOf(left);
    while(leftProto) {
        if (leftProto === rightPrototype) {
            return true;
        } else {
            leftProto = Object.getPrototypeOf(leftProto);
        }
    }

    return false;
}