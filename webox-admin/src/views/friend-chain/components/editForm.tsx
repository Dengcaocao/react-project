import React, { useState, forwardRef, useImperativeHandle, useRef, useEffect } from 'react'
import { ProForm, ProFormText } from '@ant-design/pro-components'
import { Modal, Form, DatePicker, message, Select } from 'antd'
import ComUpload from '@/components/Upload'
import dayjs from 'dayjs'
import { v4 as uuid } from 'uuid'
import styles from './editForm.module.scss'
import { waitTime } from '@/utils/util'

interface EnumValue {
  text: string,
  status: string
}

export interface StatusType {
  all: EnumValue,
  close: EnumValue,
  online: EnumValue,
  [key: string]: any
}

export interface InitValueType {
  uuid?: string,
  avatar?: string,
  nickName?: string,
  link?: string,
  tag?: string[],
  status?: string,
  created_at?: object | string,
  // 解决数据过滤时提示的 string 不能作为索引
  [key: string]: any
}

interface propsType {
  statusData: StatusType,
  initVal: InitValueType | null,
  // eslint-disable-next-line no-unused-vars
  createData: (type: string, data: InitValueType) => void
}

// eslint-disable-next-line react/display-name, no-unused-vars
const EditForm = forwardRef((props: propsType, ref) => {

  const { statusData, initVal, createData } = props

  const formRef = useRef<any>()
  
  const [visible, setVisible] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)

  const [tagData] = useState<Array<string>>(['Html', 'Css', 'JavaScript', 'Vue', 'React', 'TypeScript', 'Webpack', 'node'])
  const [initialValues, setInitialValues] = useState<InitValueType | null>(null)
  
  useImperativeHandle(ref, () => {
    return {
      showModal: () => setVisible(true)
    }
  })

  const setImageVal = (val: string) => {
    formRef.current.setFieldValue('avatar', val)
  }

  const statusDataTransformOptios = () => {
    const options = []
    for (const i in statusData) {
      if (i === 'all') {continue}
      options.push({
        value: i,
        label: statusData[i].text
      })
    }
    return options
  }

  const handleSubmit = async () => {
    try {
      setConfirmLoading(true)
      const parmas = formRef.current.getFieldsValue(true)
      const config = {
        ...parmas,
        uuid: initialValues?.uuid || uuid(),
        created_at: dayjs(parmas.created_at).format('YYYY-MM-DD HH:mm:ss')
      }
      await formRef.current.validateFields()
      await waitTime(2000)
      if (initialValues?.uuid) {
        createData('edit', config)
      } else {
        createData('create', config)
      }
      setVisible(false)
      setConfirmLoading(false)
      message.success(`${initialValues?.uuid ? '更新成功' : '创建成功'}`)
    } catch (error: any) {
      console.log(error)
      message.error(error.message)
    } finally {
      setConfirmLoading(false)
    }
  }

  useEffect(() => {
    setInitialValues(initVal)
  }, [initVal])

  return (
    <Modal
      title="添加友链"
      open={visible}
      destroyOnClose={true}
      onOk={handleSubmit}
      confirmLoading={confirmLoading}
      onCancel={() => setVisible(false)}
      afterOpenChange={open => !open && setInitialValues(null)}
    >
      {initialValues && <ProForm
        formRef={formRef}
        initialValues={initialValues}
        submitter={{
          render: () => {
            return null
          }
        }}
      >
        <Form.Item
          name="avatar"
          label="头像"
          rules={[{ required: true, message: '请上传图片' }]}
        >
          <ComUpload className={styles.comupload} setVal={setImageVal} imageSrc={initialValues.avatar || ''} />
        </Form.Item>
        <ProFormText
          name="nickName"
          label="昵称"
          placeholder="请输入昵称"
          rules={[{ required: true, message: '请输入昵称' }]}
        />
        <ProFormText
          name="link"
          label="主页地址"
          placeholder="请输入主页地址"
          rules={[{ required: true, message: '请输入主页地址' }]}
        />
        <Form.Item
          name="tag"
          label="标签"
          rules={[{ required: true, message: '请选择标签' }]}
        >
          <Select
            showSearch
            mode="multiple"
            placeholder="请选择标签"
            filterOption={(inputValue, option) =>
              (option?.label ?? '').toLowerCase().includes(inputValue.toLowerCase())
            }
            options={tagData.map(item => ({
              value: item,
              label: item
            }))}
          />
        </Form.Item>
        <Form.Item
          name="status"
          label="状态"
          rules={[{ required: true, message: '请设置状态' }]}
        >
          <Select
            showSearch
            placeholder="请设置状态"
            options={statusDataTransformOptios()}
          />
        </Form.Item>
        <Form.Item name="created_at" label="创建时间">
          <DatePicker
            disabled
            style={{width: '100%'}}
            format="YYYY-MM-DD HH:mm:ss"
          />
        </Form.Item>
      </ProForm>}
    </Modal>
  )
})

export default EditForm
