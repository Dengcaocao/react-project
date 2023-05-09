import React, { useRef } from 'react'
import { PlusOutlined, DownloadOutlined } from '@ant-design/icons'
import type { ActionType, ProColumns } from '@ant-design/pro-components'
import { ProTable } from '@ant-design/pro-components'
import { Button } from 'antd'
// import { v4 as uuid } from 'uuid'
import EditForm from './components/editForm'
import Api from '@/api/test'

type GithubIssueItem = {
  uuid: string,
  link: string,
  created_at: string
}

const columns: ProColumns<GithubIssueItem>[] = [
  {
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48
  },
  {
    title: 'uuid',
    dataIndex: 'uuid',
    copyable: true,
    ellipsis: true
  },
  {
    title: '链接',
    dataIndex: 'link',
    copyable: true,
    ellipsis: true,
    search: false
  },
  {
    title: '创建时间',
    key: 'showTime',
    dataIndex: 'created_at',
    valueType: 'date',
    sorter: true,
    hideInSearch: true
  },
  {
    title: '创建时间',
    dataIndex: 'created_at',
    valueType: 'dateRange',
    hideInTable: true,
    search: {
      transform: (value) => {
        return {
          startTime: value[0],
          endTime: value[1]
        }
      }
    }
  },
  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action?.startEditable?.(record.uuid)
        }}
      >
        编辑
      </a>,
      <a key="deltable">删除</a>
    ]
  }
]

const BannerData = () => {
  const actionRef = useRef<ActionType>()
  const editFormRef = useRef<HTMLInputElement | null>()

  const getData = async () => {
    const res = await Api.getData()
    console.log(res)
    return {
      data: res.data.data,
      success: res.status === 200,
      total: res.data.data.length
    }
  }

  return (
    <>
      <ProTable<GithubIssueItem>
        columns={columns}
        actionRef={actionRef}
        request={getData}
        cardBordered
        editable={{
          type: 'multiple'
        }}
        columnsState={{
          persistenceKey: 'pro-table-singe-demos',
          persistenceType: 'localStorage',
          onChange(value) {
            console.log('value: ', value)
          }
        }}
        rowKey="uuid"
        search={{
          labelWidth: 'auto'
        }}
        options={{
          setting: {
            listsHeight: 400
          }
        }}
        form={{
          // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
          syncToUrl: (values, type) => {
            if (type === 'get') {
              return {
                ...values,
                created_at: [values.startTime, values.endTime]
              }
            }
            return values
          }
        }}
        pagination={{
          pageSize: 5,
          onChange: (page) => console.log(page)
        }}
        dateFormatter="string"
        headerTitle="数据列表"
        toolBarRender={() => [
          <Button
            key="create-button"
            icon={<PlusOutlined />}
            onClick={() => {
              actionRef.current?.reload()
            }}
            type="primary"
          >
            新建
          </Button>,
          <Button
            key="download-button"
            icon={<DownloadOutlined />}
            onClick={() => {
              actionRef.current?.reload()
            }}
            type="primary"
          >
          导出
        </Button>
        ]}
      />
      <EditForm ref={editFormRef} />
    </>
  )
}

export default BannerData
