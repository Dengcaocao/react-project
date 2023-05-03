import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import routes from './router'
import 'antd/dist/reset.css'
import './App.css'

function App() {

  const routeList = () => {
    return routes.map((route, index) => 
      <Route key={index} path={route.path} element={<route.component />}>
        {
          route.children.map(subroute => {
            return <Route key={`sub${index}`} path={subroute.path} element={<subroute.component />} />
          })
        }
      </Route>
    )
  }  

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#00b96b'
        }
      }}
    >
      <Routes>
        {routeList()}
      </Routes>
    </ConfigProvider>
  )
}

export default App
