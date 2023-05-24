import React, { useEffect, useRef, useState } from 'react'
import { ProForm, PageContainer, ProFormSelect, ProFormText } from '@ant-design/pro-components'
import WangEditor, { RefType } from '@/components/wangEditor'
import { CategoryType } from './index'
import { Button, DatePicker, Form, Popover, message } from 'antd'
import styles from './editinfo.module.scss'
import ComUpload from '@/components/Upload'
import dayjs from 'dayjs'
import Api from '@/api'
import { v4 as uuid } from 'uuid'
import { useLocation, useNavigate } from 'react-router-dom'
import { setSessionStorage, getSessionStorage, waitTime } from '@/utils/util'
import { useAppSelector } from '@/store/hook'

export interface InitValueType {
  uuid: string,
  title?: string,
  description?: string,
  pic?: string,
  type?: string,
  link?: string,
  status?: string,
  created_at: dayjs.Dayjs,
  // 解决数据过滤时提示的 string 不能作为索引
  [key: string]: any
}

export interface CategoryOptionsType {
  value: string,
  label: string
}

export interface LocalDataType {
  add: InitValueType[],
  edit: InitValueType[]
}

const EditInfo = () => {
  const navigate = useNavigate()
  const host = useAppSelector(store => store.appReducer.host)
  const {
    state: { record }
  } = useLocation()
  
  const [value, setValue] = useState<string>('<p></p>')
  const [open, setOpen] = useState<boolean>(false)
  const [category, setCategory] = useState<CategoryOptionsType[]>([])
  const [submitLoading, setSubmitLoading] = useState<boolean>(false)
  const editorRef = useRef<RefType>()
  const formRef = useRef<any>()
  const [initialValues, setInitialValues] = useState<InitValueType | null>(null)

  const EditForm = () => {
    const setImageVal = (src: string) => {
      formRef.current.setFieldValue('pic', host + src)
    }

    const handleEdit = async () => {
      try {
        await formRef.current.validateFields()
        setSubmitLoading(true)
        const curFormParams = formRef.current.getFieldsValue(true)
        const params = {
          ...curFormParams,
          uuid: curFormParams.uuid || uuid(),
          content: value,
          created_at: dayjs(curFormParams.created_at).format('YYYY-MM-DD HH:ss:mm')
        }
        const data: LocalDataType = getSessionStorage('webox-demo')
          ? JSON.parse(getSessionStorage('webox-demo') as string)
          : { add: [], edit: [] }
        if (curFormParams.uuid) {
          const addIndex = data.add.findIndex(item => item.uuid === curFormParams.uuid)
          const index = addIndex !== -1 ? addIndex : data.edit.findIndex(item => item.uuid === curFormParams.uuid)
          data.add[index]?.uuid === curFormParams.uuid
            ? data.add.splice(index, 1, params)
            : data.edit.splice(index, 1, params)
        } else {
          data.add = [params, ...data.add]
        }
        await waitTime(2000)
        message.success(curFormParams.uuid ? '修改成功' : '发布成功')
        setSessionStorage('webox-demo', JSON.stringify(data))
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
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 19 }}
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
        autoFocusFirstInput
      >
        <ProFormText
          name="title"
          label="标题"
          placeholder="请输入标题"
          rules={[{ required: true, message: '请输入标题' }]}
        />
        <ProFormText
          name="description"
          label="描述"
          placeholder="请输入描述"
          rules={[{ required: true, message: '请输入描述' }]}
        />
        <Form.Item
          name="pic"
          label="图片"
          rules={[{ required: true, message: '请上传图片' }]}
        >
          <ComUpload
            className={styles.comupload}
            width={750}
            height={750}
            setVal={setImageVal}
            imageSrc={ initialValues.pic || ''}
          />
        </Form.Item>
        <ProFormSelect
          name="type"
          label="类型"
          style={{width: '100%'}}
          rules={[{ required: true, message: '请选择类型' }]}
          options={category}
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

  const getCategory = async () => {
    try {
      const res = await Api.getDemoData()
      const categoryOptions = res.data.data
        .map((item: CategoryType) => ({ value: item.uuid, label: item.name }))
      setCategory(categoryOptions)
    } catch (error: any) {
      console.log(error)
      message.error(error.message)
    }
  }

  const handlePopoverStatus = (status: boolean) => {
    if (status && editorRef.current?.isEmpty()) { return message.warning('干嘛！干嘛！，内容不填发布个der呀') }
    setInitialValues({
      ...record,
      created_at: record.created_at ? dayjs(record.created_at) : dayjs()
    })
    setOpen(status)
  }

  useEffect(() => {
    getCategory()
    setValue(record.content)
  }, [])
  
  return (
    <PageContainer
      className={styles['demo-page-container']}
      header={{
        title: '',
        breadcrumb: {
          items: []
        },
        extra: [
          <Button key="back" onClick={() => navigate('/manage/demo')}>返回</Button>,
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
      <WangEditor ref={editorRef} value={value} onChange={setValue} />
    </PageContainer>
  )
}

export default EditInfo
