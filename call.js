/**
 * call + apply
 * */
Function.prototype.call = function (context, ...args) {
    var context = context || window
    context.fn = this
    var result = eval('context.fn(...args)')
    delete context.fn
    return result
}
Function.prototype.apply = function () {
    var context = context || window
    context.fn = this
    var result = eval('context.fn(...args)')
    delete context.fn
    return result
}