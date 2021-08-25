function jsonp(url, data) {
    
    return new Promise((resolve, reject) => {

        const srciptDom = document.createElement('script');

        const jsonpCallback = `jsonpCallback_${Math.random()}`;

        url += url.indexOf('?') >= 0 ? url + '&jsonpCallback=' + jsonpCallback : url + '?jsonpCallback=' +  jsonpCallback;

        for (let name in data) {
            url += `&${name}=${data[name]}`
        }

        srciptDom.src = url;

        window[jsonpCallback] = function(res) {
            delete window[jsonpCallback];
            document.body.removeChild(srciptDom);
            resolve(res);
        }

        srciptDom.addEventListener('error', function(error) {
            delete window[jsonpCallback];
            document.body.removeChild(srciptDom);
            reject(error)
        })

        document.body.appendChild(srciptDom);

    })
}

jsonp('http://www.baidu.com')