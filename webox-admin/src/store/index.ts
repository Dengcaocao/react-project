import { createSlice, configureStore } from '@reduxjs/toolkit'
import routes from '@/router/index'

const appReducer = createSlice({
  name: 'appReducer',
  initialState: {
    routes,
    layoutSetting: {
      layout: 'mix'
    }
  },
  reducers: {
    changeLayoutSetting (state, action) {
      state.layoutSetting = {
        // ...state.layoutSetting,
        ...action.payload
      }
    }
  }
})

export const { changeLayoutSetting } = appReducer.actions

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
