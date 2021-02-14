/**
 * 生成器Generator
 * */
const fs = require("fs");

// function* gen() {
//     console.log("enter");
//     let a = yield 1;
//     console.log('111')
//     let b = yield (function () {
//         return 2
//     })();
//     return 3;
// }
//
// var g = gen() // 阻塞住，不会执行任何语句
// console.log(typeof g)  // object  看到了吗？不是"function"
//
// console.log(g.next(), '===')
// console.log(g.next(), '---')
// console.log(g.next(), '11891')
// console.log(g.next())
// thunk版本
// const readFileThunk = (filename) => {
//     return (callback) => {
//         fs.readFile(filename, callback)
//     }
// }
// const gen = function* () {
//     const data1 = yield readFileThunk('new.js')
//     console.log(data1.toString())
//     const data2 = yield readFileThunk('call.js')
//     console.log(data2.toString())
// }
// let g = gen()

// g.next().value((err, data1) => {
//     g.next(data1).value((err, data2) => {
//         g.next(data2)
//     })
// })

// function run(gen) {
//     const next = (err, data) => {
//         let res = gen.next(data)
//         if (res.done) return
//         res.value(next)
//     }
//     next()
// }
//
// run(g)
// Promise版本
const readFilePromise = (filename) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filename, 'utf-8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        })
    }).then(res => res)
}
const gen2 = function* () {
    const data1 = yield readFilePromise('1.txt')
    const data2 = yield readFilePromise('2.txt')
    console.log(data1, '===')
    console.log(data2, '---')
}


let g2 = gen2()

// function getGenPromise(gen, data) {
//     return gen.next(data).value;
// }
//
// getGenPromise(g2).then(data1 => {
//     return getGenPromise(g2, data1);
// }).then(data2 => {
//     return getGenPromise(g2, data2)
// })

function run(g) {
    const next = (data) => {
        let res = g.next(data)
        if (res.done) return
        res.value.then(data => {
            next(data)
        })
    }
    next()
}


// 斐波那契数列
function* fibonacci() {
    let [prev, cur] = [0, 1]
    while (true) {
        [prev, cur] = [cur, prev + cur]
        yield cur
    }
}

function arr() {
    let res = []
    for (let item of fibonacci()) {
        if (item > 50) break
        res.push(item)
    }
    return res
}

console.log(arr())
