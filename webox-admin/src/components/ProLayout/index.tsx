import { LogoutOutlined, GithubFilled } from '@ant-design/icons'
import {
  MenuDataItem,
  ProConfigProvider,
  ProLayout,
  SettingDrawer
} from '@ant-design/pro-components'
import { AvatarProps, Dropdown, Tag } from 'antd'
import React, { useState } from 'react'
import { useAppSelector, useAppDispatch } from '@/store/hook'
import { setCollapsed, changeLayoutSetting } from '@/store/index'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import defaultProps from '@/config'

const Layout = () => {
  const dispath = useAppDispatch()
  const routes = useAppSelector(state => state.appReducer.routes)
  const collapsed = useAppSelector(state => state.appReducer.collapsed)
  const layoutSetting = useAppSelector(state => state.appReducer.layoutSetting)
  const userInfo = useAppSelector(state => state.appReducer.userInfo)

  const [pathname, setPathname] = useState<string>(useLocation().pathname)

  const navigate = useNavigate()
  return (
    <div
      id="test-pro-layout"
      style={{ height: '100vh' }}>
      <ProConfigProvider hashed={false}>
        <ProLayout
          prefixCls="my-prefix"
          title="WeBox"
          logo={
            <Tag
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '32px',
                height: '32px',
                lineHeight: '12px',
                fontWeight: 'bold'
              }}
              color="#00b96b"
            >
              <div>we</div>
              <div>box</div>
            </Tag>
          }
          collapsed={collapsed}
          onCollapse={status => dispath(setCollapsed(status))}
          {...defaultProps}
          route={{
            path: '/',
            routes
          }}
          location={{ pathname }}
          menu={{ collapsedShowGroupTitle: true }}
          avatarProps={{
            src: userInfo.avatar,
            size: 'small',
            title: userInfo.name,
            render: (props: AvatarProps, dom: React.ReactNode) => {
              return (
                <Dropdown
                  arrow
                  placement="bottomRight"
                  menu={{
                    items: [
                      {
                        key: 'logout',
                        icon: <LogoutOutlined />,
                        label: '退出登录'
                      }
                    ]
                  }}
                >
                  {dom}
                </Dropdown>
              )
            }
          }}
          actionsRender={() => {
            return [
              <GithubFilled key="GithubFilled" />
            ]
          }}
          menuFooterRender={(props: any) => {
            if (props?.collapsed) {return undefined}
            return (
              <div
                style={{
                  textAlign: 'center',
                  paddingBlockStart: 12
                }}
              >
                <div>动画管理平台</div>
              </div>
            )
          }}
          onMenuHeaderClick={() => navigate('/')}
          menuItemRender={(itemProps: MenuDataItem, defaultDom: React.ReactNode) => 
            <div
              onClick={() => {
                setPathname(itemProps.path || '/')
                navigate(itemProps.redirect || itemProps.path)
              }}
            >
              {defaultDom}
            </div>
          }
          {...layoutSetting}
        >
          <Outlet />
          <SettingDrawer
            pathname={pathname}
            enableDarkTheme
            getContainer={() => document.getElementById('test-pro-layout')}
            settings={layoutSetting}
            onSettingChange={(changeSetting) => {
              dispath(changeLayoutSetting(changeSetting))
            }}
            disableUrlParams={false}
          />
        </ProLayout>
      </ProConfigProvider>
    </div>
  )
}

export default Layout
