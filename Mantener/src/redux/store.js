import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counter/counterSlice'
import clickedReducer from './clicked/clickedSlice'
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    clicked: clickedReducer
  },
})