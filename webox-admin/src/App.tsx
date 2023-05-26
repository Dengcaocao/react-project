import React, { useEffect } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import { useAppSelector } from '@/store/hook'
import 'antd/dist/reset.css'
import './App.css'

function App() {

  const location = useLocation()
  const navigate = useNavigate()

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

  const handleNavigate = () => {
    if (location.pathname === '/') {
      navigate('/welcome')
    }
  }

  useEffect(() => {
    handleNavigate()
  }, [location])

  return (
    <ConfigProvider>
      <Routes>
        {routeList()}
      </Routes>
    </ConfigProvider>
  )
}

export default App
