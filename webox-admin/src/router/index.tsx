import React from 'react'
import {
  ChromeFilled,
  CrownFilled,
  SmileFilled
} from '@ant-design/icons'
import ProLayout from '@/components/ProLayout'
import home from '@/views/home/home'
import banner from '@/views/banner'
import friendChain from '@/views/friend-chain'

interface IBaseConfig {
  path: string,
  name: string,
  icon: React.ReactElement | string,
  access?: string,
  component?: () => JSX.Element,
  [key: string]: any
}

interface IRouteConfig extends IBaseConfig {
  routes?: IBaseConfig[]
}

const routes: IRouteConfig[] = [
  {
    path: '/',
    name: '欢迎',
    icon: <SmileFilled />,
    component: ProLayout,
    redirect: '/welcome',
    hideChildrenInMenu: true,
    routes: [
      {
        path: '/welcome',
        name: '首页',
        icon: 'https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg',
        component: home
      }
    ]
  },
  {
    path: '/manage',
    name: '数据管理',
    icon: <CrownFilled />,
    access: 'canAdmin',
    component: ProLayout,
    routes: [
      {
        path: '/manage/banner',
        name: 'banner数据',
        icon: 'https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg',
        component: banner
      },
      {
        path: '/manage/friend-chain',
        name: '友链入口',
        icon: 'https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg',
        component: friendChain
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
