import React, { useEffect, useRef, useState } from 'react'
import { PlusOutlined, DownloadOutlined } from '@ant-design/icons'
import type { ActionType, ProColumns } from '@ant-design/pro-components'
import { ProTable } from '@ant-design/pro-components'
import { Button, message } from 'antd'
import EditForm from './components/editForm'
import Api from '@/api/test'
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

  const [loading, setLoading] = useState<boolean>(false)
  const [localData, setLocalData] = useState<Array<any>>([])
  const [dataSource, setDataSource] = useState<Array<any>>([])

  const getData = async () => {
    try {
      setLoading(true)
      const res = await Api.getData()
      setDataSource(res.data.data)
    } catch (error: any) {
      console.log(error)
      message.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = (data: object) => {
    setLocalData([data, ...localData])
  }

  const handleExportData = async () => {
    // 设置文件格式
    const formatData = {
      code: 200,
      data: [...localData, ...dataSource]
    }
    const blob = new Blob([JSON.stringify(formatData)], { type: 'application/json' })
    const downloadUrl = URL.createObjectURL(blob)
    // 创建一个 a 标签Tag
    const aTag = document.createElement('a')
    // 设置文件的下载地址
    aTag.href = downloadUrl
    // 设置保存后的文件名称
    aTag.download = 'index-banner.json'
  // 给 a 标签添加点击事件
    aTag.click()
    // 当你结束使用某个 URL 对象之后，应该通过调用这个方法来让浏览器知道不用在内存中继续保留对这个文件的引用了。
    URL.revokeObjectURL(downloadUrl)
    message.success('下载成功')
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <ProTable<GithubIssueItem>
        columns={columns}
        actionRef={actionRef}
        loading={loading}
        dataSource={[...localData, ...dataSource]}
        cardBordered
        editable={{
          type: 'multiple'
        }}
        // 数据更新请使用数据的uuid
        rowKey={() => uuid()}
        search={{
          labelWidth: 'auto'
        }}
        onSubmit={() => console.log('onSubmit')}
        pagination={{
          pageSize: 5,
          onChange: (page) => console.log(page)
        }}
        headerTitle="数据列表"
        options={{
          reload: getData
        }}
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
            onClick={handleExportData}
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
