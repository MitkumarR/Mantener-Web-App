import { configureStore } from '@reduxjs/toolkit'
import clickedReducer from './clicked/clickedSlice'
import refreshedReducer from './refresher/refresherSlice'
import signedReducer from './signer/signerSlice'
import addedReducer from './adder/adderSlice'
import addingReducer from './adding/addingSlice'
import arrayReducer from './notes/array'
import griddedReducer from './gridded/griddedSlice'
import sidebarReducer from './clicked/sidebarSlice'
import usernameReducer from './user/usernameSlice'
import useridReducer from './user/useridSlice'
import tempUserReducer from './signer/tempUserSlice'

export const store = configureStore({
  reducer: {
    clicked: clickedReducer,
    refreshed: refreshedReducer,
    signed: signedReducer, 
    added: addedReducer,
    adding: addingReducer,
    notes: arrayReducer,
    sidebar: sidebarReducer,
    gridded: griddedReducer,
    username: usernameReducer,
    userid: useridReducer,
    tempUser: tempUserReducer,
  },
})