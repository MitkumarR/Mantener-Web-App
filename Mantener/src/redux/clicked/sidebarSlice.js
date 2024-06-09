import { createSlice } from "@reduxjs/toolkit";
import { Update } from "../notes/array";

const initialState = {
  value: 0,
};

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    note: (state) => {
      state.value = 0;
    },
    archive: (state) => {
      state.value = 1;
    },
    bin: (state) => {
      state.value = 2;
    },
    update: (state, action) =>{
      state.value = action.payload;
    }
  },
});

export const { note, archive, bin, update } = sidebarSlice.actions;

export default sidebarSlice.reducer;
