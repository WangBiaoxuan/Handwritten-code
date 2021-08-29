// 如 is_good is-good 转换为 isGood

function toTump(string) {
    return string.replace(/[-_]([a-z])/, function($0, $1) {
        return $1.toUpperCase();
    })
}