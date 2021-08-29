console.log(minMultiple(6, 8));
// 24

console.log(maxDivisor(60, 30));
// 30

function minMultiple(a, b) {
    if (a > b) {
        return minMultiple(b, a)
    }
    
    let res = a, i = 1;
    while(res % a !== 0 || res % b !== 0) {
        i++;
        res = a * i;
    }

    return res;
}


function maxDivisor(a, b) {
    if (a > b) {
        return maxDivisor(b, a)
    }

    let res = a;
    
    while(a % res !== 0 || b % res !== 0) {
        res--;
    }

    return res;
}