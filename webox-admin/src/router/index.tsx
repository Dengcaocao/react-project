import React from 'react'
import {
  ChromeFilled,
  CrownFilled,
  SmileFilled,
  PictureOutlined
} from '@ant-design/icons'
import ProLayout from '@/components/ProLayout'
import Login from '@/views/login/login'
import Home from '@/views/home/home'
import Banner from '@/views/banner'
import FriendChain from '@/views/friend-chain'
import Demo from '@/views/demo'
import DemoEditInfo from '@/views/demo/editInfo'
import Resource from '@/views/resource'
import Error_404 from '@/views/error-page/404'

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
    path: '/login',
    name: '登录',
    icon: <SmileFilled />,
    component: Login,
    hideInMenu: true
  },
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
        component: Home
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
        component: Banner
      },
      {
        path: '/manage/friend-chain',
        name: '友链入口',
        icon: 'https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg',
        component: FriendChain
      },
      {
        path: '/manage/demo',
        name: 'Demo',
        icon: 'https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg',
        component: Demo
      },
      {
        path: '/manage/demo/:uuid',
        name: 'DemoInfo',
        icon: 'https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg',
        hideInMenu: true,
        component: DemoEditInfo
      },
      {
        path: '/manage/resource',
        name: '图片资源',
        icon: <PictureOutlined />,
        component: Resource
      }
    ]
  },
  {
    path: '*',
    name: 'error_404',
    icon: '',
    hideInMenu: true,
    component: Error_404
  },
  {
    path: 'https://ant.design',
    name: 'Ant Design 官网外链',
    icon: <ChromeFilled />
  }
]

export default routes
