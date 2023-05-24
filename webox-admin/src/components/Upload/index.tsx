import React, { useEffect, useState } from 'react'
import { Upload, message } from 'antd'
import type { RcFile, UploadChangeParam, UploadFile, UploadProps } from 'antd/es/upload/interface'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import styles from './index.module.scss'

interface propsType {
  className: string,
  imageSrc: string,
  // eslint-disable-next-line no-unused-vars
  setVal: (val: string) => void
}

const ComUpload = (props: propsType) => {
  const { className, imageSrc, setVal } = props
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState<string>()

  // eslint-disable-next-line no-unused-vars
  const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result as string))
    reader.readAsDataURL(img)
  }

  const beforeUpload = (file: RcFile) => {
    setLoading(true)
    const isJpgOrPng = ['image/jpeg', 'image/png'].includes(file.type)
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!')
    }
    isJpgOrPng && isLt2M && getBase64(file, url => {
      setLoading(false)
      setImageUrl(url)
      setVal(file.name)
      message.success('上传成功')
    })
    return false
  }

  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    const { file } = info
    if (file.status === 'uploading') { return setLoading(true) }
    if (file.status === 'done') {
      getBase64(file.originFileObj as RcFile, (url) => {
        setLoading(false)
        setImageUrl(url)
        setVal(file.name)
        message.success('上传成功')
      })
    }
  }

  const uploadButton = 
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>

  useEffect(() => {
    setImageUrl(imageUrl || imageSrc)
  })

  return (
    <Upload
      name="avatar"
      listType="picture-card"
      className={`${className} ${styles.uploader}`}
      showUploadList={false}
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      beforeUpload={beforeUpload}
      onChange={handleChange}
    >
      {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
    </Upload>
  )
}

export default ComUpload
