import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

export const refresherSlice = createSlice({
  name: "refreshed",
  initialState,
  reducers: {
    refresh: (state) => {
      state.value = !state.value;
    },
  },
});

export const { refresh } = refresherSlice.actions;

export default refresherSlice.reducer;
