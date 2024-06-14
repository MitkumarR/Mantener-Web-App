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
    update: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { grid, update } = griddedSlice.actions;

export default griddedSlice.reducer;