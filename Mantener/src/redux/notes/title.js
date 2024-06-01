import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const titleSlice = createSlice({
  name: "title",
  initialState,
  reducers: {
    getTitle: (state) => {
    //   state.value = 
    },
  },
});

export const { getTitle } = titleSlice.actions;

export default titleSlice.reducer;
