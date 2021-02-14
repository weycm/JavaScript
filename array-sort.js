/**
 * 数组排序 sort
 * 数字排序的话会把数字转化成字符串，然后根据unicode编码去排序，数字>大写子母>小写字母>汉字
 * 数字排序是根据字符串的第一个字符，第二个字符依次排序
 * */
// 插入排序
const insertSort = (arr, start = 0, end) => {
    end = end || arr.length
    for (let i = start; i < end; i++) {
        let e = arr[i]
        let j
        for (j = i; j > start && arr[j - 1] > e; j--) {
            arr[j] = arr[j - 1]
        }
        arr[j] = e
    }
    return
}
// 寻找哨兵元素
const getThirdIndex = (a, from, to) => {
    let tmpArr = []
    let increment = 200 + ((to - from) & 15)
    let j = 0
    from += 1
    to -= 1
    for (let i = from; i < to; i += increment) {
        tmpArr[j] = [i, a[i]]
        j++
    }
}
// 快速排序
const _sort = (a, b, c) => {
    let arr = [a, b, c]
    insertSort(arr, 0, 3)
    return arr
}
const quickSort = (a, from, to) => {

}

