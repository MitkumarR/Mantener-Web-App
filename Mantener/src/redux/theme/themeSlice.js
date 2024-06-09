import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "black",
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    white: (state) => {
      state.value = "white";
    },
    black: (state) => {
      state.value = "black";
    },
    updatetheme: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { white, black, updatetheme } = themeSlice.actions;

export default themeSlice.reducer;
