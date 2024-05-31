import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

export const refreshedSlice = createSlice({
  name: "refreshed",
  initialState,
  reducers: {
    refresh: (state) => {
      state.value = !state.value;
    },
  },
});

export const { refresh } = refreshedSlice.actions;

export default refreshedSlice.reducer;
