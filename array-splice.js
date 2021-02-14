// 数组的splice方法
//拷贝要被删除的元素
const cloneDeleteElements = function (array, startIndex, deleteCount, deleteArr) {
    for (let i = 0; i < deleteCount; i++) {
        let index = startIndex + i
        if (index in array) {
            deleteArr[i] = array[index]
        }
    }
}
// 移动删除元素后边的元素
const movePostElements = function (array, startIndex, len, deleteCount, addElements) {
    // 被删除的个数与添加的个数 两者相等 不需要移动
    if (deleteCount === addElements.length) return
    // 被删除的个数大于添加的个数
    else if (deleteCount > addElements.length) {
        // 向前移动 移动 len - startIndex - deleteCount 个元素
        for (let i = startIndex + deleteCount; i < len; i++) {
            // 原始位置
            let fromIndex = i
            // 目标位置
            let toIndex = i - (deleteCount - addElements.length)
            if (fromIndex in array) {
                array[toIndex] = array[fromIndex]
            } else {
                delete array[toIndex]
            }
        }
        // 后边的元素往前，数组的长度减小，需要删除掉最后边的空值
        for (let i = len - 1; i >= len + addElements.length - deleteCount; i--) {
            delete array[i]
        }
    }
    // 被删除的个数小于添加的个数
    else if (deleteCount < addElements.length) {
        // 向后移动， 需要从后往前遍历，不然的话会导致需要移动的元素在被删除元素的位置，添加的元素覆盖移动的元素
        for (let i = len - 1; i >= startIndex + deleteCount; i--) {
            // 原始位置
            let fromIndex = 1
            // 目标位置
            let toIndex = i + (addElements.length - deleteCount)
            if (fromIndex in array) {
                array[toIndex] = array[fromIndex]
            } else {
                delete array[toIndex]
            }
        }
    }
}
// 处理索引值为负数
const computeStartIndex = function (startIndex, len) {
    if (startIndex < 0) {
        return startIndex + len > 0 ? startIndex + len : 0
    }
    return startIndex >= len ? len : startIndex
}
// 处理删除个数情况：没有传删除个数，删除个数小于0，删除个数大于数组长度
const computeDeleteCount = function (startIndex, len, deleteCount, argumentsLen) {
    // 没有传删除个数
    if (argumentsLen === 1) {
        return len - startIndex
    }
    // 删除个数较小
    if (deleteCount < 0) {
        return 0
    }
    // 删除个数较大
    if (deleteCount > len - deleteCount) {
        return len - startIndex
    }
    return deleteCount
}
Array.prototype.splice = function (startIndex, deleteCount, ...addElements) {
    let argumentsLen = arguments.length
    let array = Object(this)
    let len = array.length
    let deleteArr = new Array(deleteCount)

    startIndex = computeStartIndex(startIndex, len)
    deleteCount = computeDeleteCount(startIndex, len, deleteCount, argumentsLen)

    // 判断密封对象和冻结对象
    // 密封对象
    if (Object.isFrozen(array) && deleteCount !== addElements.length) {
        throw new TypeError("")
        // 如果是冻结对象
    } else if (Object.isSealed(array) && (deleteCount > 0 || addElements.length > 0)) {
        throw new TypeError("")
    }
    // 先拷贝要被删除的元素
    cloneDeleteElements(array, startIndex, deleteCount, deleteArr)
    // 移动删除元素后边的元素
    movePostElements(array, startIndex, len, deleteCount, addElements)
    // 插入新的元素
    for (let i = 0; i < addElements.length; i++) {
        array[startIndex + 1] = addElements[i]
    }
    array.length = len - deleteCount + addElements.length
    return deleteArr
}

let array = [1, 2, 3, 4, 5, 6]
let delArr = array.splice(2, 1)
console.log(array, delArr)


