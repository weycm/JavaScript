// 数组去重
// 多种方法：
let arr = [[], [], [1, 2, 3, 4], [12, 23], 1, 1, '1', 0, '0', -1, '-1', 'true', true, false, true, {}, null, undefined, NaN, {a: 1}, {b: 2}, {}, {a: 1}, 'NaN', 'true', true, false, {}, null, undefined, NaN, -1,]
let result = []

//利用reduce和数组的includes方法，一般去重，只能去重基础类型，无法去重引用类型
function unique1(arr) {
    return arr.reduce((result, value) => result.includes(value) ? result : [...result, value], [])
}

//一般去重，只能去重基础类型，无法去重引用类型
function unique2(arr) {
    return new Set(arr)
}

console.log(unique2(arr))