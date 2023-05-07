import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAppSelector } from '@/store/hook'
import styles from './index.module.scss'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined
} from '@ant-design/icons'
import { Layout, Menu, Button, Tag, theme, Space, Avatar } from 'antd'
import { ItemType, SubMenuType } from 'antd/lib/menu/hooks/useItems'

const { Header, Sider, Content } = Layout

const App = () => {
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer }
  } = theme.useToken()

  const routes = useAppSelector(state => state.appReducer.routes)

  const navigate = useNavigate()

  const checkRole = (role: string[] | undefined) => {
    const currole = 'user'
    if (!role) return true
    return role.includes(currole)
  }

  const createMenu = () => {
    return routes
      // 过滤一级不展示的菜单
      .filter(item => !item.meta.hideInMenu && checkRole(item.meta.role))
      // 过滤二级菜单
      .map(item => {
        const routeConfig = {
          ...item,
          children: item.children?.filter(subItem => !subItem.meta.hideInMenu && checkRole(subItem.meta.role))
        };
        (!routeConfig.children?.length) && delete routeConfig.children
        return routeConfig
      })
      // 创建菜单
      .map(route => {
        let menuItem: ItemType | null
        if (route.children) {
          if (route.children.length === 1) {
            menuItem = route.children.map(subroute => {
              return {
                key: `${route.path}${/\/$/.test(route.path) ? '' : '/'}${subroute.path}`,
                icon: <subroute.meta.icon />,
                label: subroute.meta.title
              }
            })[0]
          } else {
            menuItem = {
              key: route.path,
              icon: <route.meta.icon />,
              label: route.meta.title
            };
            (menuItem as SubMenuType).children = route.children.map(subroute => {
              return {
                key: subroute.path,
                icon: <subroute.meta.icon />,
                label: subroute.meta.title
              }
            })
          }
        }
        else {
          menuItem = null
        }
        return menuItem
      })
  }

  const handleView = (params: { key: string }) => {
    navigate(params.key)
  }

  return (
    <Layout style={{ height: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className={styles.logo} style={{ justifyContent: collapsed ? 'center' : '' }}>
          <Tag className={styles.icon} color="#00b96b">
            <div>we</div>
            <div>box</div>
          </Tag>
          { !collapsed && <h3 className={styles.title}>WeBox</h3>}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={createMenu()}
          onClick={handleView}
        />
      </Sider>
      <Layout>
        <Header className={styles.header} style={{ background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64
            }}
          />
          <Space>
            <div className={styles.user}>
              <Avatar icon={<UserOutlined />} />
              Deng·草草
            </div>
          </Space>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default App
