function getCookie(name) {
    const reg = new RegExp(';|^' + name + '=([^;]*)');

    var x = document.cookie.match(reg);
    if (x) {
        return decodeURIComponent(x[1]);
    } else {
        return undefined;
    }
}


function setCookie(name, value, day) {
    const date = new Date();
    date.setTime(date.getTime() + day * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${encodeURIComponent(value)};expires=${date.toGMTString()}`
}


