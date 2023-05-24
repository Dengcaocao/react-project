import React, { useEffect, useState } from 'react'

interface propsType {
  width?: number,
  gap?: number,
  transition?: number,
  watch?: any[],
  children: React.ReactElement[],
  spin?: React.ReactElement
}

const Waterfall = (props: propsType) => {
  
  const { width, gap, transition, watch, spin, children } = props

  const [loading, setLoading] = useState<boolean>(true)
  const [itemWidth] = useState<number>(width || 200) // setItemWidth
  const [newChildren, setNewChildren] = useState<React.ReactElement<any, string | React.JSXElementConstructor<any>>[]>([])

  // const handleVnode = (vNode: any) => {
  //   if (vNode.type === 'img') {
  //     return new Promise(resolve => {
  //       const image = new Image()
  //       image.src = vNode.props.src
  //       image.onload = () => resolve(true)
  //       image.onerror = () => resolve(true)
  //     })
  //   }
  // }

  // // 等待图片加载完成
  // const handleChildren = (children: any) => {
  //   const promiseArr: Promise<unknown>[] = []
  //   children.forEach((vNode: any) => {
  //     const p = handleVnode(vNode)
  //     p && promiseArr.push(p)
  //     if (vNode.props.children) {
  //       if (typeof vNode.props.children === 'object') {
  //         const childrenP = handleVnode(vNode.props.children)
  //         childrenP && promiseArr.push(childrenP)
  //       } else {
  //         handleChildren(vNode.props.children)
  //       }
  //     }
  //   })
  //   return promiseArr
  // }

  const handleImgLoad = (url: string) => {
    return new Promise(resolve => {
      const image = new Image()
      image.src = url
      image.onload = () => resolve(itemWidth * image.height / image.width)
      image.onerror = () => resolve(200)
    })
  }

  const handleArrange = () => {
    const waterfallNode = document.querySelector('.waterfall') as HTMLElement
    // 容器宽度
    const cWidth = document.querySelector('.container')?.clientWidth
    // 列数量
    const colCount = Math.floor(cWidth as number / itemWidth)
    // 存储每列的高度
    const colsHeight = new Array(colCount).fill(0)
    // 最小高度列的下标，默认0
    let minIndex = 0
    const newChildrenStore: React.ReactElement<any, string | React.JSXElementConstructor<any>>[] = []
    React.Children.forEach(children, async (child) => {
      const cHeight = await handleImgLoad(child.props.src)
      const newChild = React.cloneElement(child, {
        style: {
          position: 'absolute',
          top: `${colsHeight[minIndex]}px`,
          left: `${minIndex * itemWidth}px`,
          width: `${itemWidth}px`,
          height: `${cHeight}px`,
          padding: `${gap || 10}px`,
          transition: `${transition || 0.5}s`
        }
      })
      // 设置列的高度和数据
      colsHeight[minIndex] += cHeight
      // 从新获取最小高度列的下标
      minIndex = colsHeight.indexOf(Math.min(...colsHeight))
      newChildrenStore.push(newChild)
      setNewChildren(newChildrenStore)
    })
    if (waterfallNode) {
      waterfallNode.style.width = colCount * itemWidth + 'px'
      waterfallNode.style.height = Math.max(...colsHeight) + 'px'
    }
  }

  // 加载动画
  const MySpin = () => {
    return (
      <div style={{display: 'flex', justifyContent: 'center'}}>
        {spin || <p>加载中···</p>}
      </div>
    )
  }

  useEffect(() => {
    // 延迟执行获取更新后容器的宽度
    setTimeout(async () => {
      // await Promise.all(handleChildren(children))
      handleArrange()
      setLoading(false)
    }, 150)
  }, [children, ...watch || []])

  useEffect(() => {
    return () => {
      window.onresize = window.onresize ? null : handleArrange
    }
  })

  return (
    <div className='container'>
      <div
        className="waterfall"
        style={{
          position: 'relative',
          margin: 'auto'
        }}>
        {loading ? <MySpin></MySpin> : newChildren}
      </div>
    </div>
  )
}

export default Waterfall
