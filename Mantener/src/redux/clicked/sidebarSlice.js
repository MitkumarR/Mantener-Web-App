import { createSlice } from "@reduxjs/toolkit";

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
    achive: (state) => {
      state.value = 1;
    },
    bin: (state) => {
      state.value = 2;
    },

  },
});

export const { note, achive, bin } = sidebarSlice.actions;

export default sidebarSlice.reducer;
