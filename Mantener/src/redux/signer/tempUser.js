import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

export const tempUserSlice = createSlice({
  name: "tempUser",
  initialState,
  reducers: {
    usetemp: (state) => {
      state.value = true;
      console.log(state.value);
    },
  },
});

export const { usetemp } = tempUserSlice.actions;

export default tempUserSlice.reducer;