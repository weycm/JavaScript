/**
 *  promise三大法宝：回调函数延迟绑定，回调返回值穿透，错误冒泡
 * */
/**
 * 手写promise
 * 1、构造函数Promise，有三个状态，待定、解决、失败,传入并调用执行器executor，执行器有两个参数，解决和失败
 * 2、设置解决和失败回调数组，可以绑定多个回调，then中添加到数组，解决和失败状态下分别循环调用
 * 3、完善解决和失败参数，异步下修改状态和分别循环调用回调数组
 * 4、原型上添加then方法，传参解决和失败函数，根据三个状态分别处理
 * 5、添加新的promise构造函数，为了调用时确保返回的值不是同一个返回值
 * 6、then方法不传参数时，设置两种状态分别为解决的参数和失败的错误信息
 * 7、添加新的方法resolvePromise，如果返回的参数依然是promise时进行处理，接收当前promise,返回的promise，解决和失败函数
 * 8、捕获then下每一段可能返回的错误，交给reject处理
 * */
function Promise(executor) {
    let self = this
    self.status = 'pending'
    self.value = null
    self.onResolvedCallBacks = []
    self.onRejectedCallBacks = []

    function resolve(value) {
        setTimeout(() => {
            if (self.status === 'pending') {
                self.status = 'resolved'
                self.value = value
                self.onResolvedCallBacks.forEach(callback => callback(self.value))
            }
        })
    }

    function reject(error) {
        setTimeout(() => {
            if (self.status === 'pending') {
                self.status = 'rejected'
                self.error = error
                self.onRejectedCallBacks.forEach(callback => callback(self.error))
            }
        })
    }

    try {
        executor(resolve, reject)
    } catch (e) {
        reject(e)
    }
}

function resolvePromise(promise2, x, resolve, reject) {
    if (x instanceof Promise) {
        if (x.status === 'pending') {
            x.then(y => {
                resolvePromise(promise2, y, resolve, reject)
            }, error => {
                reject(error)
            })
        } else {
            x.then(resolve, reject)
        }
    } else {
        resolve(x)
    }
}

Promise.prototype.then = function (onResolved, onRejected) {
    let self = this
    let promise2
    onResolved = typeof onResolved === 'function' ? onResolved : value => value
    onRejected = typeof onRejected === 'function' ? onRejected : error => {
        throw error
    }
    if (self.status === 'pending') {
        return promise2 = new Promise((resolve, reject) => {
            self.onResolvedCallBacks.push(value => {
                try {
                    let x = onResolved(value)
                    resolvePromise(promise2, x, resolve, reject)
                } catch (e) {
                    reject(e)
                }
            })
            self.onRejectedCallBacks.push(error => {
                try {
                    let x = onRejected(error)
                    resolvePromise(promise2, x, resolve, reject)
                } catch (e) {
                    reject(e)
                }
            })
        })
    }
    if (self.status === 'resolved') {
        return promise2 = new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    let x = onResolved(self.value)
                    resolvePromise(promise2, x, resolve, reject)
                } catch (e) {
                    reject(e)
                }
            })
        })
    }
    if (self.status === 'rejected') {
        return promise2 = new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    let x = onRejected(self.error)
                    resolvePromise(promise2, x, resolve, reject)
                } catch (e) {
                    reject(e)
                }
            })
        })
    }
}
Promise.prototype.catch = function (onRejected) {
    return this.then(null, onRejected)
}

Promise.resolve = (param) => {
    if (param instanceof Promise) return
    return new Promise((resolve, reject) => {
        if (param && param.then && param.then === 'function') {
            param.then(resolve, reject)
        } else {
            resolve(param)
        }
    })
}
Promise.reject = (param) => {
    return new Promise((resolve, reject) => {
        reject(param)
    })
}
Promise.prototype.finally = function (callback) {
    this.then(value => {
        return Promise.resolve(callback()).then(() => {
            return value
        })
    }, error => {
        return Promise.resolve(callback()).then(() => {
            throw error
        })
    })
}
/**
 * all方法
 * 1、参数为空，直接resolve
 * 2、有一个失败，全部都为失败
 * 3、返回的总是一个数组
 * */
Promise.all = function (promises) {
    return new Promise((resolve, reject) => {
        let result = []
        let len = promises.length
        if (len === 0) {
            resolve(result)
            return
        }
        const handleData = (data, index) => {
            result[index] = data
            if (index === len - 1) {
                resolve(result)
                return
            }
        }
        for (let i = 0; i < len; i++) {
            Promise.resolve(promises[i]).then(data => {
                handleData(data, i)
            }).catch(err => {
                reject(err)
            })
        }
    })
}
/**
 * race
 * 那个先运行完就返回那个
 * */
Promise.race = function (promises) {
    return new Promise((resolve, reject) => {
        let len = promises.length
        if (len === 0) {
            return
        }
        for (let i = 0; i < len; i++) {
            Promise.resolve(promises[i]).then(data => {
                resolve(data)
                return
            }).catch(err => {
                reject(err)
                return
            })
        }
    })
}





















