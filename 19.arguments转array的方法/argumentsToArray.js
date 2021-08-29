function argumentsToArray() {
    // 1.
    // return [...arguments];

    // 2.
    // return Array.from(arguments)

    // 3.slice
    // return Array.prototype.slice.call(arguments);

    return [].slice.call(arguments)
}