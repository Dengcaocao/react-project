import React, { useEffect, useRef, useState } from 'react'
import { PlusOutlined, DownloadOutlined } from '@ant-design/icons'
import type { ActionType, ProColumns } from '@ant-design/pro-components'
import { ProTable } from '@ant-design/pro-components'
import { Button, message } from 'antd'
import EditForm, { InitValueType } from './components/editForm'
import Api from '@/api/test'
import { v4 as uuid } from 'uuid'
import dayjs from 'dayjs'

const BannerData = () => {
  const actionRef = useRef<ActionType>()
  const editFormRef = useRef<any>()

  const [loading, setLoading] = useState<boolean>(false)
  const [localData, setLocalData] = useState<Array<InitValueType>>([])
  const [dataSource, setDataSource] = useState<Array<InitValueType>>([])
  const [allData, setAllData] = useState<Array<InitValueType>>([])
  const [bannerInfo, setBannerInfo] = useState<InitValueType | null>(null)

  const columns: ProColumns<InitValueType>[] = [
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
      render: (text, record) => [
        <a
          key="editable"
          onClick={() => {
            setBannerInfo({
              ...record,
              created_at: dayjs(record.created_at as string)
            })
            editFormRef.current.showModal()
          }}
        >
          编辑
        </a>,
        <a key="deltable">删除</a>
      ]
    }
  ]

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

  const handleCreate = (type: string, data: InitValueType) => {
    if (type === 'create') return setLocalData([data, ...localData])
    const index = allData.findIndex(item => item.uuid === data.uuid)
    allData.splice(index, 1, data)
    setAllData([...allData])
  }

  const handleExportData = async () => {
    // 设置文件格式
    const formatData = {
      code: 200,
      data: allData
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

  useEffect(() => {
    setAllData([...localData, ...dataSource])
  }, [localData, dataSource])

  return (
    <>
      <ProTable<InitValueType>
        columns={columns}
        actionRef={actionRef}
        loading={loading}
        dataSource={allData}
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
            onClick={() => {
              setBannerInfo({
                created_at: dayjs()
              })
              editFormRef.current.showModal()
            }}
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
      <EditForm ref={editFormRef} createData={handleCreate} initVal={bannerInfo} />
    </>
  )
}

export default BannerData
