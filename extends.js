// 继承
/**
 * 第一种call劫持, 缺点，父类的函数子类无法继承
 * */
// function Parent3() {
//     this.name = 'parent3';
//     this.play = [1, 2, 3];
//     function fn(){
//         return 1
//     }
// }
//
// function Child3() {
//     Parent3.call(this);
//     this.type = 'child3';
// }
//
// let p3 = new Parent3()
// let c3 = new Child3()
// let c31 = new Child3()
// console.log(c3,'c3')
// c3.play = 'game'
// let fnc  = c3.fn
// console.log(fnc,'函数调用')
// console.log(c31,'c31')
// console.log(fnc())
/**
 * 第二种：原型链, 缺点，修改一个实例对象中引用类型的属性值时，会全部修改，因为引用的都是同一个地址
 */
// function Parent2() {
//     this.name = 'parent2';
//     this.play = [1, 2, 3]
// }
//
// function Child2() {
//     this.type = 'child2';
// }
//
// let p2 = new Parent2()
// Child2.prototype = p2;
// var s1 = new Child2();
// var s2 = new Child2();
// s1.play.push(4);
// console.log(s1.play, s2.play, p2.play);
/**
 * 第三种：把以上的合二为一。call 和 原型链都写上
 * 缺点：需要写一下原型指向,会多执行一次Parent3
 */
// function Parent3 () {
//     this.name = 'parent3';
//     this.play = [1, 2, 3];
// }
// function Child3() {
//     Parent3.call(this); // 执行第一次
//     this.type = 'child3';
// }
// Child3.prototype = new Parent3(); // 执行第二次
// var s3 = new Child3();
// var s4 = new Child3();
// s3.play.push(4);
// console.log(s3.play, s4.play);

/**
 * 第五种，寄生组合继承，目前最完美的继承方法
 * */
// function Parent5() {
//     this.name = 'parent5';
//     this.play = [1, 2, 3];
// }
//
// function Child5() {
//     Parent5.call(this);
//     this.type = 'child5';
// }
//
// Child5.prototype = Object.create(Parent5.prototype);
// Child5.prototype.constructor = Child5;
// // console.log(Parent5.prototype)
// // console.log(Child5.prototype)
// let c5 = new Child5()
// let c51 = new Child5()
// c5.play.push(4)
// console.log(c5.play, c51.play)

/**
 * extends 编译源码
 * */
function _possibleConstructorReturn (self, call) {
    // ...
    return call && (typeof call === 'object' || typeof call === 'function') ? call : self;
}

function _inherits (subClass, superClass) {
    // ...
    //看到没有
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}


var Parent = function Parent () {
    // 验证是否是 Parent 构造出来的 this
    _classCallCheck(this, Parent);
};

var Child = (function (_Parent) {
    _inherits(Child, _Parent);

    function Child () {
        _classCallCheck(this, Child);

        return _possibleConstructorReturn(this, (Child.__proto__ || Object.getPrototypeOf(Child)).apply(this, arguments));
    }

    return Child;
}(Parent));

