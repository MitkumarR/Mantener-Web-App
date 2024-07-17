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
    
    update_signin: (state, action) => {
      state.value = action.payload;
    },
    
  },
});

export const { signin, update_signin } = signedSlice.actions;

export default signedSlice.reducer;
