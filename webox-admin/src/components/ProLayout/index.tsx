import { LogoutOutlined, GithubFilled } from '@ant-design/icons'
import {
  MenuDataItem,
  ProSettings,
  PageContainer,
  ProConfigProvider,
  ProLayout,
  SettingDrawer
} from '@ant-design/pro-components'
import { Dropdown, Tag } from 'antd'
import React, { useState } from 'react'
import { useAppSelector } from '@/store/hook'
import { Outlet, useNavigate } from 'react-router-dom'
import defaultProps from '@/config'

const Layout = () => {
  const routes = useAppSelector(state => state.appReducer.routes)

  const [settings, setSetting] = useState<Partial<ProSettings> | undefined>({
    fixSiderbar: true,
    layout: 'mix',
    splitMenus: false
  })

  const [pathname, setPathname] = useState('/')

  const navigate = useNavigate()
  return (
    <div
      id="test-pro-layout"
      style={{ height: '100vh' }}>
      <ProConfigProvider hashed={false}>
        <ProLayout
          prefixCls="my-prefix"
          title="WeBox"
          logo={() => {
            return (
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
            )
          }}
          {...defaultProps}
          route={{
            path: '/',
            routes
          }}
          location={{ pathname }}
          menu={{ collapsedShowGroupTitle: true }}
          avatarProps={{
            src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
            size: 'small',
            title: '七妮妮',
            render: (props: MenuDataItem, dom: React.ReactNode) => {
              return (
                <Dropdown
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
          menuFooterRender={(props: { collapsed: unknown }) => {
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
          {...settings}
        >
          <PageContainer header={{ title: '' }}>
            <Outlet />
          </PageContainer>

          <SettingDrawer
            pathname={pathname}
            enableDarkTheme
            getContainer={() => document.getElementById('test-pro-layout')}
            settings={settings}
            onSettingChange={(changeSetting) => {
              setSetting(changeSetting)
            }}
            disableUrlParams={false}
          />
        </ProLayout>
      </ProConfigProvider>
    </div>
  )
}

export default Layout
