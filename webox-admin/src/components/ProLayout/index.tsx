import { LogoutOutlined } from '@ant-design/icons'
import type { MenuDataItem, ProSettings } from '@ant-design/pro-components'
import {
  PageContainer,
  ProCard,
  ProConfigProvider,
  ProLayout,
  SettingDrawer
} from '@ant-design/pro-components'
import { Dropdown } from 'antd'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import defaultProps from './_defaultProps'

const Layout = () => {
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
          {...defaultProps}
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
          menuFooterRender={(props: { collapsed: any }) => {
            if (props?.collapsed) return undefined
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
          menuItemRender={(itemProps: MenuDataItem, defaultDom: React.ReactNode) => (
            <div
              onClick={() => {
                setPathname(itemProps.path || '/')
                navigate(itemProps.path)
              }}
            >
              {defaultDom}
            </div>
          )}
          {...settings}
        >
          <PageContainer header={{ title: '' }}>
            <ProCard
              style={{
                height: '200vh',
                minHeight: 800
              }}
            >
              <div />
            </ProCard>
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
