import Layout from "../components/layout"
import Sandwiches from "../views/sandwiches"

const routes = [
  {
    path: '/banner',
    component: Layout,
    meta: {
      icon: '000',
      title: '首页'
    },
    routes: [
      {
        path: 'manage',
        component: Sandwiches,
        meta: {
          icon: 'VerticalAlignBottomOutlined',
          title: 'banner管理'
        }
      }
    ]
  }
]

export default routes
