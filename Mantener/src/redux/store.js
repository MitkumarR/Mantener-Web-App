import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counter/counterSlice'
import clickedReducer from './clicked/clickedSlice'
import refreshedReducer from './refresher/refresherSlice'
import griddedReducer from './gridded/griddedSlice'
import signedReducer from './signer/signerSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    clicked: clickedReducer,
    refreshed: refreshedReducer,
    gridded: griddedReducer,
    signed: signedReducer, 
  },
})