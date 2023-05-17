import React, { useEffect, useState } from 'react'
import { useAppSelector } from '@/store/hook'

interface propsType {
  children: React.ReactElement[]
}

const Waterfall = (props: propsType) => {
  
  const { children } = props

  const collapsed = useAppSelector(state => state.appReducer.collapsed)

  const [itemWidth] = useState<number>(200) // setItemWidth

  const handleImgLoad = async () => {
    const promiseArr: any[] = []
    const imgs: NodeListOf<HTMLImageElement> = document.querySelectorAll('.waterfall img')
    imgs.forEach(img => {
      const p = new Promise(resolve => {
        img.onload = () => resolve(true)
      })
      promiseArr.push(p)
    })
    return await Promise.all(promiseArr)
  }

  const handleArrange = async () => {
    const waterfallNode = document.querySelector('.waterfall') as HTMLElement
    // 容器宽度
    const cWidth = document.querySelector('.container')?.clientWidth
    console.log(cWidth)
    // 列数量
    const colCount = Math.floor(cWidth as number / itemWidth)
    // 存储每列的高度
    const colsHeight = new Array(colCount).fill(0)
    // 最小高度列的下标，默认0
    let minIndex = 0
    // 容器下的所有子节点
    const nodeList: NodeListOf<ChildNode> = waterfallNode.childNodes
    // 等待图片加载完成
    await handleImgLoad()
    nodeList.forEach((node: any) => {
      console.log(node)
      node.style.position = 'absolute'
      node.style.padding = '10px'
      node.style.width = itemWidth + 'px'
      node.style.top = `${colsHeight[minIndex]}px`
      node.style.left = `${minIndex * 200}px`
      const itemHeight = node.clientHeight
      // 设置列的高度和数据
      colsHeight[minIndex] += itemHeight
      // 从新获取最小高度列的下标
      minIndex = colsHeight.indexOf(Math.min(...colsHeight))
    })
    if (waterfallNode) {
      waterfallNode.style.width = colCount * 200 + 'px'
      waterfallNode.style.height = Math.max(...colsHeight) + 'px'
    }
  }

  useEffect(() => {
    // setTimeout(handleArrange, 200)
    handleArrange()
  }, [collapsed])

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
