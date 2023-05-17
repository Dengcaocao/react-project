import React, { useEffect, useState } from 'react'

interface propsType {
  width?: number,
  gap?: number,
  transition?: number,
  watch?: any[],
  children: React.ReactElement[]
}

const Waterfall = (props: propsType) => {
  
  const { width, gap, transition, watch, children } = props

  const [itemWidth] = useState<number>(width || 200) // setItemWidth

  // 加载图片
  const handleImgLoad = () => {
    const promiseArr: Promise<unknown>[] = []
    const imgtags: NodeListOf<HTMLImageElement> = document.querySelectorAll('.waterfall img')
    imgtags.forEach(img => {
      const p = new Promise(resolve => {
        img.onload = () => resolve(true)
      })
      promiseArr.push(p)
    })
  }

  const handleArrange = async () => {
    const waterfallNode = document.querySelector('.waterfall') as HTMLElement
    // 容器宽度
    const cWidth = document.querySelector('.container')?.clientWidth
    // 列数量
    const colCount = Math.floor(cWidth as number / itemWidth)
    // 存储每列的高度
    const colsHeight = new Array(colCount).fill(0)
    // 最小高度列的下标，默认0
    let minIndex = 0
    // 容器下的所有子节点
    const nodeList: NodeListOf<ChildNode> = waterfallNode.childNodes
    // 定位
    nodeList.forEach((node: any) => {
      node.style.position = 'absolute'
      node.style.padding = `${gap || 10}px`
      node.style.width = itemWidth + 'px'
      node.style.top = `${colsHeight[minIndex]}px`
      node.style.left = `${minIndex * itemWidth}px`
      node.style.transition = `${transition || 0.5}s`
      const itemHeight = node.clientHeight
      // 设置列的高度和数据
      colsHeight[minIndex] += itemHeight
      // 从新获取最小高度列的下标
      minIndex = colsHeight.indexOf(Math.min(...colsHeight))
    })
    if (waterfallNode) {
      waterfallNode.style.width = colCount * itemWidth + 'px'
      waterfallNode.style.height = Math.max(...colsHeight) + 'px'
    }
  }

  useEffect(() => {
    handleImgLoad()
  }, [])

  useEffect(() => {
    window.onresize = handleArrange
    // 延迟执行获取更新后容器的宽度
    setTimeout(handleArrange, 150)
  }, watch || [])

  return (
    <div className='container'>
      <div
        className="waterfall"
        style={{
          position: 'relative',
          margin: 'auto'
        }}>
        {children}
      </div>
    </div>
  )
}

export default Waterfall
