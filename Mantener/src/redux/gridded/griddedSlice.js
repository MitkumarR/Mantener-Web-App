import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

export const griddedSlice = createSlice({
  name: "gridded",
  initialState,
  reducers: {
    grid: (state) => {
      state.value = !state.value;
    },
  },
});

export const { grid } = griddedSlice.actions;

export default griddedSlice.reducer;
