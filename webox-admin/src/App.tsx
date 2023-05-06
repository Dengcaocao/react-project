import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import { useAppSelector } from '@/store/hook'
import 'antd/dist/reset.css'
import './App.css'

function App() {

  const routes = useAppSelector(state => state.appReducer.routes)

  const routeList = () => {
    return routes.map((route, index) => 
      <Route key={index} path={route.path} element={<route.component />}>
        {
          route.children && route.children.map(subroute => {
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
