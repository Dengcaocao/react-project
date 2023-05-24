import React, { useState, forwardRef, useImperativeHandle, useRef, useEffect } from 'react'
import { ProForm, ProFormText } from '@ant-design/pro-components'
import { Modal, Form, DatePicker, message } from 'antd'
import ComUpload from '@/components/Upload'
import dayjs from 'dayjs'
import { v4 as uuid } from 'uuid'
import styles from './editForm.module.scss'
import { waitTime } from '@/utils/util'
import { useAppSelector } from '@/store/hook'

export interface InitValueType {
  uuid?: string,
  pic?: string,
  link?: string,
  created_at?: object | string,
  // 解决数据过滤时提示的 string 不能作为索引
  [key: string]: any
}

interface propsType {
  initVal: InitValueType | null,
  // eslint-disable-next-line no-unused-vars
  createData: (type: string, data: InitValueType) => void
}

// eslint-disable-next-line react/display-name, no-unused-vars
const EditForm = forwardRef((props: propsType, ref) => {

  const host = useAppSelector(store => store.appReducer.host)

  const { initVal, createData } = props

  const formRef = useRef<any>()
  
  const [visible, setVisible] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)

  const [initialValues, setInitialValues] = useState<InitValueType | null>(null)
  
  useImperativeHandle(ref, () => {
    return {
      showModal: () => setVisible(true)
    }
  })

  const setImageVal = (val: string) => {
    formRef.current.setFieldValue('pic', host + val)
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
      title="配置Banner"
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
          name="pic"
          label="图片"
          rules={[{ required: true, message: '请上传图片' }]}
        >
          <ComUpload className={styles.comupload} setVal={setImageVal} imageSrc={initialValues.pic || ''} />
        </Form.Item>
        <ProFormText
          name="link"
          label="链接地址"
          placeholder="请输入链接地址"
          rules={[{ required: true, message: '请输入链接地址' }]}
        />
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
