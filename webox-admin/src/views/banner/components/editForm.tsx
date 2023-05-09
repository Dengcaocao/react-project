import React, { useState, forwardRef, useImperativeHandle } from 'react'
import { ProForm, ProFormDatePicker, ProFormText } from '@ant-design/pro-components'
import { Modal, message, Form, Upload } from 'antd'
import type { RcFile, UploadChangeParam, UploadFile, UploadProps } from 'antd/es/upload/interface'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'

const waitTime = (time: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, time)
  })
}

// eslint-disable-next-line
const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result as string))
  reader.readAsDataURL(img)
}

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!')
  }
  return isJpgOrPng && isLt2M
}

const ComUpload: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState<string>()

  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false)
        setImageUrl(url)
      })
    }
  }

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )

  return (
    <Upload
      name="avatar"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      beforeUpload={beforeUpload}
      onChange={handleChange}
    >
      {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
    </Upload>
  )
}

// eslint-disable-next-line react/display-name
const EditForm = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  
  useImperativeHandle(ref, () => {
    return {
      showModal: () => setVisible(true)
    }
  })

  const handleOk = () => {
    setConfirmLoading(true)
    setTimeout(() => {
      setVisible(false)
      setConfirmLoading(false)
    }, 2000)
  }

  return (
    <Modal
      title="banner信息"
      open={visible}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={() => setVisible(false)}
    >
      <ProForm<{
        pic: string
        link: string
        date: object
      }>
        submitter={{
          render: () => {
            return null
          }
        }}
        onFinish={async (values) => {
          await waitTime(2000)
          console.log(values)
          message.success('提交成功')
        }}
        params={{}}
        request={async () => {
          await waitTime(100)
          return {
            name: '蚂蚁设计有限公司',
            useMode: 'chapter'
          }
        }}
      >
        <Form.Item name="pic" label="banner图片">
          <ComUpload />
        </Form.Item>
        <ProFormText
          name="link"
          label="链接地址"
          placeholder="请输入链接地址"
        />
        <ProFormDatePicker
          name="date"
          label="创建时间"
          disabled
        />
      </ProForm>
    </Modal>
  )
})

export default EditForm
