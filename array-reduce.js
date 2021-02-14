/**
 * reduce方法
 * */
Array.prototype.reduce = function (callbackFn, initialValue) {
    // 先处理调用者异常
    if (this === null || this === undefined) {
        throw new TypeError('调用者类型错误')
    }
    // 处理回调函数异常
    if (Object.prototype.toString.call(callbackFn) !== '[object Function]') {
        throw new TypeError(callbackFn + "is not a function")
    }
    // 数组转为对象
    let O = Object(this)
    let len = O.length >>> 0
    // 循环的参数
    let k = 0
    // 判断有没有第二个参数
    let accumulator = initialValue
    if (accumulator === undefined) {
        for (; k < len; k++) {
            // 查找原型
            if (k in O) {
                accumulator = O[k];
                k++
                break
            }
        }
        throw new TypeError("数组是空数组")
    }
    for (; k < len; k++) {
        if (k in O) {
            // 核心
            accumulator = callbackFn.call(undefined, accumulator, O[k], O)
        }
    }
    return accumulator
}
