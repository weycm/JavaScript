// 将多维数组转为一维数组
// 四种方法，flat,使用扩展运算符，reduce,递归，转字符串后转数组
let arr = [1, 2, [3, 4, [5, 6, [7, 8]]], 9]
let result = []

//flat
function flatten(arr) {
    result = arr.flat(3) //3层嵌套，并且会移除数组中的空项
    console.log(result)
}

flatten(arr)

// ...拓展运算符
function flatten1(arr) {
    while (arr.some(value => Array.isArray(value))) {
        console.log("old", arr)
        arr = [].concat(...arr)
        console.log("new", arr)
    }
    return arr
}

flatten1(arr)


// 递归

function flatten2(arr) {
    arr.forEach(value => {
        if (Array.isArray(value)) {
            flatten2(value)
        } else {
            result.push(value)
        }
    })
    return result
}

flatten2(arr)

// 转为字符串
function flatten3(arr) {
    let arr2 = arr.toString().split(',')
    arr2.map(value => result.push(Number(value)))
    console.log(result)
}

flatten3(arr)

// 使用reduce

function flatten4(arr) {
    return arr.reduce((result, value) => result.concat(Array.isArray(value) ? flatten4(value) : value), [])
}

flatten4(arr)
