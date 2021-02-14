/**
 * 浅深拷贝
 * 浅拷贝方式：
 * 1、object.assign()
 * 2、数组 slice和concat
 * 3、...展开运算符
 * */
// 浅拷贝 object.assign
let obj = {name: 'joke', age: 13}
let obj2 = Object.assign({}, obj, {name: 'pig'})
console.log(obj2, obj) // { name: 'pig', age: 13 }
// 浅拷贝 slice he concat
let arr = [1, 2, 3, 4]
let arr2 = arr.slice()
arr2[1] = 99
console.log(arr2, arr) // [ 1, 99, 3, 4 ] [ 1, 2, 3, 4 ]
let arr3 = arr.concat()
arr3[0] = 99
console.log(arr3, arr) // [ 99, 2, 3, 4 ] [ 1, 2, 3, 4 ]
// 展开运算符
let obj3 = {...obj}
obj3.name = 'pig'
console.log(obj3, obj) // { name: 'pig', age: 13 }

/**
 * 深拷贝
 * 1、JSON.parse(JSON.stringify())
 * 缺点：1、无法解决循环引用；2、无法拷贝函数；3、无法拷贝特殊对象：RegExp，date，set,map
 * 2、使用递归
 * */
// 简易版深拷贝
const deepClone1 = (target) => {
    if (typeof target === 'object' && target !== null) {
        let cloneObj = Array.isArray(target) ? [] : {}
        for (let prop in target) {
            if (target.hasOwnProperty(prop)) {
                cloneObj[prop] = deepClone1(target[prop])
            }
        }
        return cloneObj
    } else {
        return target
    }
}
// 完整版深拷贝
const getType = obj => Object.prototype.toString.call(obj)
const isObject = target => (typeof target === 'object' || typeof target === 'function') && target !== null

const canTraverse = {
    '[object Map]': true,
    '[object Set]': true,
    '[object Array]': true,
    '[object Object]': true,
    '[object Arguments]': true
}
const mapTag = '[object Map]'
const setTag = '[object Set]'
const stringTag = '[object String]'
const numberTag = '[object Number]'
const booleanTag = '[object Boolean]'
const RegExpTag = '[object RegExp]'
const dateTag = '[object Date]'
const symbolTag = '[object Symbol]'
const errorTag = '[object Error]'
const funcTag = '[object Function]'
// 处理正则对象
const handleRegExp = target => {
    const {source, flags} = target
    return new target.constructor(source, flags)
}
// 处理函数
const handleFunc = func => {
    // 判断是箭头函数还是普通函数
    // 箭头函数直接返回它本身 箭头函数没有原型
    if (!func.prototype) return func
    const bodyReg = /(?<={)(.|\n)+(?=})/m
    const paramsReg = /(?<=\().+(?=\)\s+{)/
    const funcString = func.toString()
    // 分别匹配函数体和函数参数
    const param = paramsReg.exec(funcString)
    const body = bodyReg.exec(funcString)
    if (!body) return null
    if (param) {
        const paramArr = param[0].split(',')
        return new Function(...paramArr, body[0])
    } else {
        return new Function(body[0])
    }
}
// 处理不能遍历的对象属性：布尔值，数字，字符串，symbol，日期，错误，正则，函数
const handleNotTraverse = (target, tag) => {
    const Ctor = target.constructor
    switch (tag) {
        case booleanTag:
            return new Object(Boolean.prototype.valueOf.call(target))
        case numberTag:
            return new Object(Number.prototype.valueOf.call(target))
        case stringTag:
            return new Object(String.prototype.valueOf.call(target))
        case symbolTag:
            return new Object(Symbol.prototype.valueOf.call(target))
        case errorTag:
        case dateTag:
            return new Ctor(target)
        case RegExpTag:
            return handleRegExp(target)
        case funcTag:
            return handleFunc(target)
        default:
            return new Ctor(target)
    }
}
// 深拷贝函数
const deepClone = (target, map = new WeakMap()) => {
    if (!isObject(target)) {
        return target
    }
    let type = getType(target)
    let cloneTarget
    if (!canTraverse[type]) {
        return handleNotTraverse(target, type)
    } else {
        let ctor = target.constructor
        cloneTarget = new ctor()
    }
    if (map.get(target)) {
        return target
    }
    map.set(target, true)
    if (type === mapTag) {
        target.forEach((item, key) => {
            cloneTarget.set(deepClone(key, map), deepClone(item, map))
        })
    }
    if (type === setTag) {
        target.forEach(item => {
            cloneTarget.add(deepClone((item.map)))
        })
    }
    for (let prop in target) {
        if (target.hasOwnProperty(prop)) {
            cloneTarget[prop] = deepClone(target[prop], map)
        }
    }
    return cloneTarget
}
// 递归方式深拷贝
const deepClone2 = (target) => {
    // 先判断是是不是对象
    if (typeof target === 'object' && target !== null) {
        return target
    }
    // 再判断是数组还是对象
    const cloneTarget = Array.isArray(target) ? [] : {}
    // 循环遍历
    for (let prop in target) {
        if (target.hasOwnProperty(prop)) {
            cloneTarget[prop] = deepClone2(target[prop])
        }
    }
    return cloneTarget
}
