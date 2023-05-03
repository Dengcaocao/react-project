import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import routes from '../../router'
import styles from './index.module.css'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons'
import { Layout, Menu, Button, Tag, theme } from 'antd'

const { Header, Sider, Content } = Layout

const App = () => {
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer }
  } = theme.useToken()

  const setMenu = () => {
    return routes.map(route => {
      return {
        key: route.path,
        icon: <route.meta.icon />,
        label: route.meta.title,
        children: route.children.map(subroute => {
          return {
            key: subroute.path,
            icon: <subroute.meta.icon />,
            label: subroute.meta.title
          }
        })
      }
    })
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
          items={setMenu()}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
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
