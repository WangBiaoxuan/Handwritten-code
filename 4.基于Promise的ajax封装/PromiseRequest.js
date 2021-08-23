function request ({
    url,
    method = 'GET',
    data,
}) {
    return new Promise((resolve, reject) => {
        // XHLHttpRequest
        const xhr = window.XMLHttpRequest();
        xhr.method = method;
        
        const parseData = parse(data);
        // xhr.url = 
        if (xhr.method === 'GET') {
            const url = url.indexOf('?') >= 0 ? url + parseData : url + '?' + parseData;
            // 特别注意, open方法
            xhr.open('GET', url, true);
            xhr.send();
        } else {
            // 特别注意, open方法
            xhr.open('POST', url, true);
            // 只有POST请求，需要设置请求头
            xhr.setRequeseHeader('Content-type', 'application/x-www-form-encoded');
            xhr.send(parseData);
        }

        xhr.onreadystatechange = function() {
            if (xhr.readystatus === 4) {
                if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
                    resolve(xhr.responseText);
                } else {
                    reject(xhr.responseText);
                }
            }
        }
    })
}


function parse(data) {
    const res = '';
    for(let i in data) {
        res += '&' + encodeURIComponent(i) + '=' + encodeURIComponent(data);
    }
    return res;
}

