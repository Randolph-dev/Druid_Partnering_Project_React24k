import { configureStore } from '@reduxjs/toolkit'
import drupalReducer from '../features/drupalData/drupalSlice'

export const store = configureStore({
  reducer: {
    drupal: drupalReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

// reference: https://redux-toolkit.js.org/tutorials/quick-start