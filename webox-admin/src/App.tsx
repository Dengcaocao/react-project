import React from 'react'
import { ConfigProvider } from 'antd'
import Layout from './components/layout'
import 'antd/dist/reset.css'
import './App.css'

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#00b96b'
        }
      }}
    >
      <Layout />
    </ConfigProvider>
  )
}

export default App
