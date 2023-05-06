import Layout from "../components/layout"
import Sandwiches from "../views/sandwiches"
import Login from '../views/login/login'
import Home from '../views/home/home'
import {
  AlipayOutlined,
  LockOutlined,
  MobileOutlined
} from '@ant-design/icons'

const routes = [
  {
    path: '/login',
    component: Login,
    meta: {
      icon: AlipayOutlined,
      title: '登录页'
    }
  },
  {
    path: '/',
    component: Layout,
    meta: {
      icon: AlipayOutlined,
      title: '首页'
    },
    children: [
      {
        path: 'home',
        component: Home,
        meta: {
          icon: MobileOutlined,
          title: 'banner管理'
        }
      }
    ]
  },
  {
    path: '/banner',
    component: Layout,
    meta: {
      icon: LockOutlined,
      title: '首页'
    },
    children: [
      {
        path: 'manage',
        component: Sandwiches,
        meta: {
          icon: MobileOutlined,
          title: 'banner管理'
        }
      }
    ]
  }
]

export default routes
