import React, { useRef, useState } from 'react'
import { ProForm, PageContainer, ProFormSelect, ProFormText } from '@ant-design/pro-components'
import BraftEditor, { RefType } from '@/components/Editor'
import { Button, DatePicker, Form, Popover, message } from 'antd'
import styles from './editinfo.module.scss'
import ComUpload from '@/components/Upload'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'
import { setSessionStorage, getSessionStorage, waitTime } from '@/utils/util'

export interface initialValues {
  pic: string,
  type: string,
  link: string,
  status: string,
  created_at: dayjs.Dayjs
}

const EditInfo = () => {
  const navigate = useNavigate()
  const [value, setValue] = useState('')
  const [open, setOpen] = useState<boolean>(false)
  const [submitLoading, setSubmitLoading] = useState<boolean>(false)
  const editorRef = useRef<RefType>()
  const formRef = useRef<any>()
  const [initialValues, setInitialValues] = useState<initialValues | null>(null)

  const EditForm = () => {
    const setImageVal = (src: string) => {
      formRef.current.setFieldValue('pic', src)
    }

    const handleEdit = async () => {
      try {
        setSubmitLoading(true)
        await formRef.current.validateFields()
        const params = {
          ...formRef.current.getFieldsValue(),
          content: value
        }
        let localData = JSON.parse(getSessionStorage('webox-demo') || '[]')
        localData = [params, ...localData]
        await waitTime(2000)
        setSessionStorage('webox-demo', JSON.stringify(localData))
        navigate('/manage/demo')
      } catch (error: any) {
        console.log(error)
        message.error(error.message)
      } finally {
        setSubmitLoading(false)
      }
    }

    return (
      initialValues && <ProForm
        className={styles['create-form']}
        formRef={formRef}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        layout="horizontal"
        initialValues={initialValues}
        submitter={{
          render: () => [
            <Button
              key="reset-button"
              onClick={() => formRef.current.resetFields()}
            >
              重置
            </Button>,
            <Button
              key="submit-button"
              type="primary"
              loading={submitLoading}
              onClick={handleEdit}
            >
              提交
            </Button>
          ]
        }}
        onFinish={async () => {
          message.success('提交成功')
        }}
        autoFocusFirstInput
      >
        <Form.Item
          name="pic"
          label="图片"
          rules={[{ required: true, message: '请上传图片' }]}
        >
          <ComUpload className={styles.comupload} setVal={setImageVal} imageSrc={''} />
        </Form.Item>
        <ProFormSelect
          name="type"
          label="类型"
          style={{width: '100%'}}
          rules={[{ required: true, message: '请选择类型' }]}
          options={[
            {
              value: '1',
              label: 'Css3动画'
            },
            {
              value: '2',
              label: 'JavaScript动画'
            }
          ]}
        />
        <ProFormText
          name="link"
          label="地址"
          placeholder="请输地址"
          rules={[{ required: true, message: '请输入地址' }]}
        />
        <ProFormSelect
          name="status"
          label="状态"
          style={{width: '100%'}}
          rules={[{ required: true, message: '请设置状态' }]}
          options={[
            {
              value: 'close',
              label: '关闭'
            },
            {
              value: 'online',
              label: '已上线'
            }
          ]}
        />
        <Form.Item
          name="created_at"
          label="创建时间"
        >
          <DatePicker
            disabled
            style={{width: '100%'}}
            format="YYYY-MM-DD HH:mm:ss"
          />
        </Form.Item>
      </ProForm>
    )
  }

  const handlePopoverStatus = (status: boolean) => {
    if (status && editorRef.current?.isEmpty()) { return message.warning('干嘛！干嘛！，内容不填发布个der呀') }
    setInitialValues({
      pic: '',
      type: '',
      link: '',
      status: '',
      created_at: dayjs()
    })
    setOpen(status)
  }
  
  return (
    <PageContainer
      className={styles['demo-page-container']}
      header={{
        title: '',
        breadcrumb: {
          items: []
        },
        extra: [
          <Button key="back">返回</Button>,
          <Popover
            key="publish"
            placement="bottomRight"
            content={<EditForm />}
            title="信息配置"
            trigger="click"
            open={open}
            onOpenChange={handlePopoverStatus}
          >
            <Button type="primary">发布</Button>
          </Popover>
        ]
      }}
    >
      <BraftEditor ref={editorRef} value={value} onChange={setValue} placeholder="请输入..." />
    </PageContainer>
  )
}

export default EditInfo
