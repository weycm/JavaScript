/**
 * this 举例
 * 1、函数调用: this指向调用者，找不到的话指向window, 严格模式下是undefined,
 * 2、DOM 事件：this是指绑定的元素，ie的attachEvent 的this指向window
 * 3、箭头函数：this指向上下文
 * */
"use strict"

let obj = {
    a: function () {
        console.log(this);
    }
}
let func = obj.a;
func(); // this，是window, 严格模式下是undefined,
obj.a() // 指的是这个对象
