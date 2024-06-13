import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

export const signedSlice = createSlice({
  name: "signed",
  initialState,
  reducers: {
    signin: (state) => {
      state.value = true;
    },
  },
});

export const { signin } = signedSlice.actions;

export default signedSlice.reducer;
