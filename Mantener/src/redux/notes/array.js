import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const arraySlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    insert: (state) => {
      state.value = !state.value;
    },
    delete: (state) => {
      state.value = !state.value;
    },
    edit: (state) => {
      state.value = !state.value;
    },
  },
});

export const { refresh } = arraySlice.actions;

export default arraySlice.reducer;
