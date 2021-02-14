/**
 * 关键字 new
 * 1、第一个参数为函数
 * 2、创建一个空对象
 * 3、修改原型链
 * 4、修改this指向
 * 5、undefined和null 返回空对象
 * */
const newFactory = (fn, ...args) => {
    if (typeof fn !== 'function') {
        throw new TypeError('第一个参数得是函数')
    }
    let obj = new Object()
    obj.__proto__ = Object.create(fn.prototype)
    let res = fn.apply(obj, args)
    let isObject = typeof res === 'object' && res !== null
    let isFunction = typeof res === 'function'
    return isObject || isFunction ? res : obj
}

function Dog(name) {
    this.name = name
}

let str = newFactory(Dog, '你是小狗')
console.log(str.name)