/**
 * 数组筛选 filter
 * */
Array.prototype.filter = function (callbackFn, thisArg) {
    // 先处理数组类型异常
    if (this === null || this === undefined) {
        throw new TypeError("不是一个数组")
    }
    // 再处理回调函数类型异常
    if (Object.prototype.toString.call(callbackFn) !== "[object Function]") {
        throw new TypeError("不是一个函数")
    }
    // 转换为对象
    let O = Object(this)
    let len = O.length >>> 0
    let resLen = 0
    let res = []
    for (let i = 0; i < len; i++) {
        if (i in O) {
            let element = O[i]
            if (callbackFn.call(thisArg, O[i], i, O)) {
                res[resLen++] = element
            }
        }
    }
    return res
}