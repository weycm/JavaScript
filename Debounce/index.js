// 防抖原理：
// 一个事件在触发后n秒后才会执行，如果在n秒内再次触发，则会以最后一次的触发为准开始n秒后执行；
// 或者一个事件在触发后立即执行，n秒内再次触发不执行，只有n秒后才会进行下次执行；

const debounce = (fn, delay, immediate) => {
  let timeout
  return (...args) => {
    // 如果有timeout就清除
    if (timeout) {
      clearTimeout(timeout)
    }
    // 是否立即执行
    if (immediate) {
      !timeout && fn.apply(this, args)
      timeout = setTimeout(() => {
        timeout = null
      }, delay)
    } else {
      timeout = setTimeout(() => {
        fn.apply(this, args)
      }, delay)
    }
  }
}