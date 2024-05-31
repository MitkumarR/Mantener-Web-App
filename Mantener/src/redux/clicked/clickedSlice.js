import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

export const clickedSlice = createSlice({
  name: "clicked",
  initialState,
  reducers: {
    change: (state) => {
      state.value = !state.value;
    },
  },
});

export const { change } = clickedSlice.actions;

export default clickedSlice.reducer;
