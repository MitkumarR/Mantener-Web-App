import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

export const addedSlice = createSlice({
  name: "added",
  initialState,
  reducers: {
    add: (state) => {
      state.value = !state.value;
    },
  },
});

export const { add } = addedSlice.actions;

export default addedSlice.reducer;
