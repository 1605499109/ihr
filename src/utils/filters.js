export const tranListToTreeData = (list, rootvlue) => {
  const arr = []
  list.filter(item => {
    if (item.pid === rootvlue) {
    // 有子节点
      const children = tranListToTreeData(list, item.id)
      if (children.length) {
        // 如果children的长度大于0 说明找到了子节点
        item.children = children
      }
      arr.push(item)
      // console.log(arr)
    }
  })

  return arr
}
