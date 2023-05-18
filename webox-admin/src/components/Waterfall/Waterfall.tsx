import React, { useEffect, useState } from 'react'

interface propsType {
  width?: number,
  gap?: number,
  transition?: number,
  watch?: any[],
  children: React.ReactElement[],
  spin?: React.ReactElement
}

interface SpinType {
  spinning: boolean
}

const Waterfall = (props: propsType) => {
  
  const { width, gap, transition, watch, spin, children } = props

  const [loading, setLoading] = useState<boolean>(true)
  const [itemWidth] = useState<number>(width || 200) // setItemWidth

  const handleVnode = (vNode: any) => {
    if (vNode.type === 'img') {
      return new Promise(resolve => {
        const image = new Image()
        image.src = vNode.props.src
        image.onload = () => resolve(true)
        image.onerror = () => resolve(true)
      })
    }
  }

  // 等待图片加载完成
  const handleChildren = (children: any) => {
    const promiseArr: Promise<unknown>[] = []
    children.forEach((vNode: any) => {
      const p = handleVnode(vNode)
      p && promiseArr.push(p)
      if (vNode.props.children) {
        if (typeof vNode.props.children === 'object') {
          const childrenP = handleVnode(vNode.props.children)
          childrenP && promiseArr.push(childrenP)
        } else {
          handleChildren(vNode.props.children)
        }
      }
    })
    return promiseArr
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

  // 加载动画
  const MySpin = (props: SpinType) => {

    const { spinning } = props
  
    return (
      <div style={{position: 'relative', top: 0, left: 0}}>
        { 
          spinning
            ? (
              <div style={{display: 'flex', justifyContent: 'center'}}>
                {spin || <p>加载中···</p>}
              </div>
            )
            : null}
        {children}
      </div>
    )
  }

  useEffect(() => {
    window.onresize = handleArrange
    // 延迟执行获取更新后容器的宽度
    setTimeout(async () => {
      await Promise.all(handleChildren(children))
      setLoading(false)
      handleArrange()
    }, 150)
  }, [children, ...watch || []])

  return (
    <div className='container'>
      <div
        className="waterfall"
        style={{
          position: 'relative',
          margin: 'auto'
        }}>
        {loading ? <MySpin spinning={loading}></MySpin> : children}
      </div>
    </div>
  )
}

export default Waterfall
