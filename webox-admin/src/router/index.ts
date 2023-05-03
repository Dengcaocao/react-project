import Layout from "../components/layout"
import Sandwiches from "../views/sandwiches"
import Login from '../views/login/login'
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
      title: '首页'
    },
    children: []
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
