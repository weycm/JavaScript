/**
 * bind 效果
 * 1、绑定this指向
 * 2、原型对象的属性不能丢失
 * */
Function.prototype.bind = function (context, ...args) {
    if (typeof this !== 'function') {
        throw new TypeError("不是一个函数")
    }
    let self = this
    let fbound = () => {
        self.apply(this instanceof self ? this : context, args.concat(Array.prototype.slice.call(arguments)))
    }
    fbound.prototype = Object.create(this.prototype)
    return fbound
}

function person(...args) {
    this.name = 'person'
}

console.log(person, '========')
let son = person.bind({a: 1})
son(5, 6, 8, 9, 7)
console.log(son)