/**
 * 手写数组map方法
 * */

Array.prototype.map = function (callbackFn, thisArg) {
    // 先判断是不是null或者undefined
    if (this === null || this === undefined) {
        throw new TypeError('类型错误')
    }
    // 处理回调函数异常
    if (Object.prototype.toString.call(callbackFn) !== '[object Function]') {
        throw new TypeError(callbackFn + 'is not a function')
    }
    // 需要先转换为对象
    let O = Object(this)
    let T = thisArg

    let len = O.length >>> 0
    let A = new Array(len)
    for (let k = 0; k < len; k++) {
        // 看一下k是否在原型链上
        if (k in O) {
            let kValue = O[k]
            let mappedValue = callbackFn.call(T, kValue, k, O)
            A[k] = mappedValue
        }
    }
    return A
}