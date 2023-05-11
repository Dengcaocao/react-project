import React, { useEffect, useState } from 'react'
// import { useLocation } from 'react-router-dom'
// import { useAppDispatch } from '@/store/hook'
// import { changeLayoutSetting } from '@/store/index'

const EditInfo = () => {
  // const dispath = useAppDispatch()
  // const layoutSetting = useAppSelector(state => state.appReducer.layoutSetting)
  // const location = useLocation()

  const [isFirst, setIsFirst] = useState(true)
  useEffect(() => {
    console.log(isFirst)
    // return () => {
    //   console.log(isFirst)
    //   setIsFirst(preState => {
    //     !preState && (window.location.search = '?layout=mix')
    //     return !preState
    //   })
    //   console.log(location)
    // }
  }, [isFirst])
  return (
    <h1 onClick={() => setIsFirst(pre => !pre)}>EditInfo</h1>
  )
}

export default EditInfo
