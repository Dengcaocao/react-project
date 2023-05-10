import React, { useRef, useState } from 'react'
import { PlusOutlined, DownloadOutlined } from '@ant-design/icons'
import type { ActionType, ProColumns } from '@ant-design/pro-components'
import { ProTable } from '@ant-design/pro-components'
import { Button } from 'antd'
import EditForm from './components/editForm'
import Api from '@/api/test'
import dayjs from 'dayjs'
import { v4 as uuid } from 'uuid'

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
  const editFormRef = useRef<any>()

  const [localData, setData] = useState<Array<any>>([])

  const getData = async () => {
    const res = await Api.getData()
    return {
      data: [...localData, ...res.data.data],
      success: res.status === 200,
      total: res.data.data.length
    }
  }

  const handleCreate = (data: object) => {
    setData([data, ...localData])
    actionRef.current?.reload()
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
        // 数据更新请使用数据的uuid
        rowKey={() => uuid()}
        search={{
          labelWidth: 'auto'
        }}
        pagination={{
          pageSize: 5,
          onChange: (page) => console.log(page)
        }}
        dateFormatter={(value) => dayjs(value).format('YYYY-MM-DD HH:ss:mm')}
        headerTitle="数据列表"
        toolBarRender={() => [
          <Button
            key="create-button"
            icon={<PlusOutlined />}
            onClick={() => editFormRef.current.showModal()}
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
      <EditForm ref={editFormRef} createData={handleCreate} />
    </>
  )
}

export default BannerData
