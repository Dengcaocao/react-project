import React from 'react'
import {
  ChromeFilled,
  CrownFilled,
  SmileFilled,
  TabletFilled
} from '@ant-design/icons'
import ProLayout from '@/components/ProLayout'
import banner from '@/views/sandwiches'

interface IBaseConfig {
  path: string,
  name: string,
  icon: React.ReactElement | string,
  access?: string,
  component?: () => JSX.Element,
  [key: string]: unknown
}

interface IRouteConfig extends IBaseConfig {
  routes?: IBaseConfig[]
}

const routes: IRouteConfig[] = [
  {
    path: '/welcome',
    name: '欢迎',
    icon: <SmileFilled />,
    component: ProLayout
  },
  {
    path: '/admin',
    name: '管理页',
    icon: <CrownFilled />,
    access: 'canAdmin',
    component: ProLayout,
    routes: [
      {
        path: '/admin/sub-page1',
        name: '一级页面',
        icon: 'https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg',
        component: banner
      }
    ]
  },
  {
    name: '列表页',
    icon: <TabletFilled />,
    path: '/list',
    component: ProLayout,
    routes: [
      {
        path: '/list/sub-page',
        name: '列表页面',
        icon: <CrownFilled />,
        component: banner
      }
    ]
  },
  {
    path: 'https://ant.design',
    name: 'Ant Design 官网外链',
    icon: <ChromeFilled />
  }
]

export default routes
