import React, { useEffect, useState } from 'react'
import { useAppSelector } from '@/store/hook'
import Waterfall from '@/components/Waterfall/Waterfall'
import Api from '@/api/index'
import { message } from 'antd'

const Resource = () => {

  const collapsed = useAppSelector(state => state.appReducer.collapsed)

  const [imgList, setImgList] = useState<string[]>([])

  const getDataList = async () => {
    try {
      const res = await Api.getImageResources()
      console.log(res.data.data)
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
    <Waterfall watch={[collapsed]}>
      { imgList.map(item => <img src={item} key={item} />) }
    </Waterfall>
  )
}

export default Resource
