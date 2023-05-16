import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '@/store/hook'
import { changeLayoutSetting } from '@/store/index'
import { PlusOutlined, DownloadOutlined } from '@ant-design/icons'
import type { ActionType, ParamsType, ProColumns } from '@ant-design/pro-components'
import { PageContainer, ProTable } from '@ant-design/pro-components'
import { Button, Popconfirm, message } from 'antd'
import Api from '@/api'
import { v4 as uuid } from 'uuid'
import dayjs from 'dayjs'
import { InitValueType } from './editInfo'
import { getSessionStorage } from '@/utils/util'

interface CategoryType {
  uuid: string,
  name: string,
  data?: InitValueType[]
}

interface ValueEnumType {
  [key: string]: { text: string, status?: string }
}

const Demo = () => {
  const dispath = useAppDispatch()
  const navigate = useNavigate()

  const actionRef = useRef<ActionType>()

  const [loading, setLoading] = useState<boolean>(false)
  const [category, setCategory] = useState<ValueEnumType>()
  const [statusData] = useState<ValueEnumType>({
    all: { text: '全部', status: 'Default' },
    close: { text: '关闭', status: 'Default' },
    online: { text: '已上线', status: 'Success' }
  })
  const [localData, setLocalData] = useState<Array<InitValueType>>([])
  const [dataSource, setDataSource] = useState<Array<InitValueType>>([])
  const [allData, setAllData] = useState<Array<InitValueType>>([])
  const [isFilter, setIsFilter] = useState<boolean>(false)
  const [filterData, setFilterData] = useState<Array<InitValueType>>([])

  const columns: ProColumns<InitValueType>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48
    },
    {
      title: 'uuid',
      key: 'uuid',
      dataIndex: 'uuid',
      copyable: true,
      ellipsis: true
    },
    {
      title: '标题',
      key: 'title',
      dataIndex: 'title',
      ellipsis: true
    },
    {
      title: '描述',
      key: 'description',
      dataIndex: 'description',
      hideInSearch: true
    },
    {
      title: '类型',
      key: 'type',
      dataIndex: 'type',
      ellipsis: true,
      valueEnum: category,
      render: (text, record) => <span>{category && category[record.uuid]?.text}</span>
    },
    {
      title: '图片',
      key: 'pic',
      dataIndex: 'pic',
      valueType: 'image',
      hideInSearch: true
    },
    {
      title: '地址',
      key: 'link',
      dataIndex: 'link',
      copyable: true,
      ellipsis: true,
      search: false
    },
    {
      title: '状态',
      key: 'status',
      dataIndex: 'status',
      initialValue: 'all',
      filters: true,
      onFilter: true,
      valueEnum: statusData
    },
    {
      title: '创建时间',
      key: 'showTime',
      dataIndex: 'created_at',
      sorter: true,
      ellipsis: true,
      hideInSearch: true
    },
    {
      title: '创建时间',
      key: 'tableShow',
      dataIndex: 'created_at',
      valueType: 'dateTimeRange',
      hideInTable: true,
      search: {
        transform: (value) => {
          return {
            date: value.map((item: dayjs.Dayjs) => dayjs(item).valueOf())
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
          onClick={() => navigateToEditPage(record)}
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
      const res = await Api.getDemoData()
      const category: { [key: string]: any } = {}
      const data = res.data.data
        .map((item: CategoryType) => {
          // 搜索表单类型下拉数据
          category[item.uuid] = { text: item.name }
          // table数据
          return item.data
        })
        .flat()
      setCategory(category)
      setDataSource(data)
    } catch (error: any) {
      console.log(error)
      message.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleFilter = (params: ParamsType) => {
    const newParams: { [key: string]: any } = {}
    for (const i in params) {
      if (i === 'status') {
        params[i] !== 'all' && (newParams[i] = params[i])
        continue
      }
      newParams[i] = params[i]
    }
    if (Object.keys(newParams).length) { setIsFilter(true) }
    const filterData = allData.filter(item => {
      let bool = true
      for (const i in newParams) {
        if (i === 'date') {
          const curTime = dayjs(item.created_at).valueOf()
          if (params[i][0] > curTime || curTime > params[i][1]) { bool = false }
          continue
        }
        if (item[i] !== params[i]) { bool = false }
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
    aTag.download = 'demo.json'
  // 给 a 标签添加点击事件
    aTag.click()
    // 当你结束使用某个 URL 对象之后，应该通过调用这个方法来让浏览器知道不用在内存中继续保留对这个文件的引用了。
    URL.revokeObjectURL(downloadUrl)
    message.success('下载成功')
  }

  const navigateToEditPage = (record?: InitValueType) => {
    dispath(changeLayoutSetting({
      // layout: 'top'
      // menuRender: false
    }))
    navigate(`${record?.uuid || 'create'}`, {
      state: {
        record: record || {}
      }
    })
  }

  useEffect(() => {
    setLocalData(JSON.parse(getSessionStorage('webox-demo') || '[]'))
    getData()
  }, [])

  useEffect(() => {
    setAllData([...localData, ...dataSource])
  }, [localData, dataSource])

  return (
    <PageContainer
      header={{
        title: ''
      }}
    >
      <ProTable<InitValueType>
        columns={columns}
        actionRef={actionRef}
        loading={loading}
        dataSource={isFilter ? filterData : allData}
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
        onReset={() => {
          setFilterData([])
          setIsFilter(false)
        }}
        pagination={{
          pageSize: 10
        }}
        headerTitle="数据列表"
        options={{
          reload: getData
        }}
        toolBarRender={() => [
          <Button
            key="create-button"
            icon={<PlusOutlined />}
            onClick={() => navigateToEditPage()}
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
    </PageContainer>
  )
}

export default Demo
