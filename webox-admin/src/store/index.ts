import { createSlice, configureStore } from '@reduxjs/toolkit'
import routes from '@/router/index'
import { ProSettings } from '@ant-design/pro-components'

const layoutSetting: ProSettings = {
  layout: 'mix'
}

const host = 'https://dengcaocao.github.io/resources/images/'

const appReducer = createSlice({
  name: 'appReducer',
  initialState: {
    routes,
    collapsed: false,
    layoutSetting,
    host,
    userInfo: {
      avatar: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
      name: 'Deng·草草'
    }
  },
  reducers: {
    changeLayoutSetting (state, action) {
      state.layoutSetting = {
        ...state.layoutSetting,
        ...action.payload
      }
    },
    setCollapsed (state, action) {
      state.collapsed = action.payload
    }
  }
})

export const { setCollapsed, changeLayoutSetting } = appReducer.actions

const store = configureStore({
  reducer: {
    appReducer: appReducer.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
})

// 从 store 本身推断出 `RootState` 和 `AppDispatch` 类型
export type RootState = ReturnType<typeof store.getState>
// 推断出类型: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store
