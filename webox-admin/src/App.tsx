import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import { useAppSelector } from '@/store/hook'
import 'antd/dist/reset.css'
import './App.css'

function App() {

  const routes = useAppSelector(state => state.appReducer.routes)

  const routeList = () => {
    return routes.map(routeItem => 
      <Route
        key={routeItem.path}
        path={routeItem.path}
        element={routeItem.component && <routeItem.component />}
      >
        {
          routeItem.routes && routeItem.routes.map(subRouteItem => {
            return <Route
              key={subRouteItem.path}
              path={subRouteItem.path}
              element={subRouteItem.component && <subRouteItem.component />}
            />
          })
        }
      </Route>
    )
  }  

  return (
    <ConfigProvider>
      <Routes>
        {routeList()}
      </Routes>
    </ConfigProvider>
  )
}

export default App
