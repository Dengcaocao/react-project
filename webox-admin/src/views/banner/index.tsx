import React, { useEffect, useRef, useState } from 'react'
import { PlusOutlined, DownloadOutlined } from '@ant-design/icons'
import type { ActionType, ParamsType, ProColumns } from '@ant-design/pro-components'
import { ProTable } from '@ant-design/pro-components'
import { Button, Popconfirm, message } from 'antd'
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
  const [filterData, setFilterData] = useState<Array<InitValueType>>([])
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
      valueType: 'dateTimeRange',
      hideInTable: true,
      search: {
        transform: (value) => {
          return {
            date: value.map((item: any) => dayjs(item).valueOf())
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
        <Popconfirm
          key="deltable"
          title="确定删除这条配置信息吗？"
          onConfirm={() => handleDelConfirm(record.uuid as string)}
          okText="Yes"
          cancelText="No"
        >
          <a>删除</a>
        </Popconfirm>
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

  const handleFilter = (params: ParamsType) => {
    const filterData = allData.filter(item => {
      let bool = true
      for (const i in params) {
        if (i === 'date') {
          const curTime = dayjs(item.created_at as string).valueOf()
          if (params[i][0] > curTime || curTime > params[i][1]) bool = false
          continue
        }
        if (item[i] !== params[i]) bool = false
      }
      return bool
    })
    setFilterData(filterData)
  }

  const handleDelConfirm = (uuid: string) => {
    if (filterData.length) {
      const fData = filterData.filter(item => item.uuid !== uuid)
      setFilterData(fData)
    }
    const lData = localData.filter(item => item.uuid !== uuid)
    setLocalData(lData)
    const dData = dataSource.filter(item => item.uuid !== uuid)
    setDataSource(dData)
    message.success('删除成功')
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
        dataSource={filterData.length ? filterData : allData}
        cardBordered
        editable={{
          type: 'multiple'
        }}
        // 数据更新请使用数据的uuid
        rowKey={() => uuid()}
        search={{
          labelWidth: 'auto'
        }}
        onSubmit={handleFilter}
        onReset={() => setFilterData([])}
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
