import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const arraySlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    Insert: (state, action) => {
      const { Id, Title, Note} = action.payload;
      if (!Array.isArray(state.value)) {
        console.error("Insert Error: state.value is not an array", state.value);
        state.value = []; // Reset to empty array if not an array
      }
      console.log("Current state:", state.value); // Add logging
      state.value = [...state.value, { Id, Title, Note}];
      console.log("Updated state:", state.value); // Add logging
    },
    Update: (state, action) => {
      state.value = action.payload;
    },
    Delete: (state, action) => {
      state.value = state.value.filter((note) => note.Id !== action.payload);
    },
  },
});

export const { Insert, Delete, Update } = arraySlice.actions;

export default arraySlice.reducer;
