import React from 'react'
import { ConfigProvider, Button } from 'antd'
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
      <Button type="primary">Button</Button>
    </ConfigProvider>
  )
}

export default App
