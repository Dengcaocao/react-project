import React, { useEffect, useState } from 'react'
import { useAppSelector } from '@/store/hook'
import Waterfall from '@/components/Waterfall/Waterfall'
import Api from '@/api/index'
import { Spin, message } from 'antd'

const Resource = () => {

  const collapsed = useAppSelector(state => state.appReducer.collapsed)

  const [imgList, setImgList] = useState<string[]>([])

  const getDataList = async () => {
    try {
      const res = await Api.getImageResources()
      setImgList(res.data.data)
    } catch (error: any) {
      console.log(error)
      message.error(error.message)
    }
  }

  useEffect(() => {
    getDataList()
  }, [])

  return (
    <Waterfall watch={[collapsed]} spin={<Spin/>}>
      {
        imgList.map(item => <img key={item} src={item} />)
      }
    </Waterfall>
  )
}

export default Resource
