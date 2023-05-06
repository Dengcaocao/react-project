import Layout from "@/components/layout"
import Sandwiches from "@/views/sandwiches"
import Login from '@/views/login/login'
import Home from '@/views/home/home'
import {
  AlipayOutlined,
  LockOutlined,
  MobileOutlined
} from '@ant-design/icons'
import { ForwardRefExoticComponent } from "react"

interface IMetaType {
  title: string,
  icon: ForwardRefExoticComponent<any>,
  hideInMenu?: boolean,
  role?: string[]
}

interface IBaseConfig {
  path: string,
  component: () => JSX.Element,
  redirect?: string,
  meta: IMetaType
}

interface IRouteConfig extends IBaseConfig {
  children?: IBaseConfig[]
}

/**
 * path 路由名称
 * component 菜单渲染的组件
 * redirect 重定向
 * meta 菜单信息
 *  title 菜单名称
 *  icon 菜单图标
 *  hideInMenu 是否展示在菜单
 *  role 访问权限
 */

const routes: IRouteConfig[] = [
  {
    path: '/login',
    component: Login,
    meta: {
      title: '登录页',
      icon: AlipayOutlined,
      hideInMenu: true
    }
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    meta: {
      title: '首页',
      icon: AlipayOutlined
    },
    children: [
      {
        path: 'home',
        component: Home,
        meta: {
          title: '首页',
          icon: MobileOutlined,
          hideInMenu: true
        }
      }
    ]
  },
  {
    path: '/banner',
    component: Layout,
    meta: {
      title: 'banner管理',
      icon: LockOutlined
    },
    children: [
      {
        path: 'manage',
        component: Sandwiches,
        meta: {
          title: 'banner管理',
          icon: MobileOutlined,
          role: ['user', 'admin']
        }
      }
    ]
  }
]

export default routes
