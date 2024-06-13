import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counter/counterSlice'
import clickedReducer from './clicked/clickedSlice'
import refreshedReducer from './refresher/refresherSlice'
import griddedReducer from './gridded/griddedSlice'
import signedReducer from './signer/signerSlice'
import addedReducer from './adder/adderSlice'
import addingReducer from './adding/addingSlice'
import arrayReducer from './notes/array'

import sidebarReducer from './clicked/sidebarSlice'
import themeReducer from './theme/themeSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    clicked: clickedReducer,
    refreshed: refreshedReducer,
    gridded: griddedReducer,
    signed: signedReducer, 
    added: addedReducer,
    adding: addingReducer,
    notes: arrayReducer,
    sidebar: sidebarReducer,
    theme: themeReducer,

  },
})