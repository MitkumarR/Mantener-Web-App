import { createSlice } from "@reduxjs/toolkit";
import { useContext } from 'react';

const initialState = {
  value: [],
};

export const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    getNote: (state) => {
    //   state.value = 
    },
  },
});

export const { getNote } = noteSlice.actions;

export default noteSlice.reducer;
