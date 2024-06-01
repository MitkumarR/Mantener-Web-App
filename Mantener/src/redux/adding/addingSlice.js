import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

export const addingSlice = createSlice({
  name: "adding",
  initialState,
  reducers: {
    note: (state) => {
      state.value = 1;
    },
    list: (state) => {
      state.value = 2;
    },
    draw: (state) => {
      state.value = 3;
    },
    done: (state) => {
      state.value = 0;
    },
    
  },
});

export const { note, list, draw, done} = addingSlice.actions;

export default addingSlice.reducer;
