import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const arraySlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    Insert: (state, action) => {
      const { Id, Title, Note, Deleted, Pinned, Achived, Hovered} = action.payload;
      if (!Array.isArray(state.value)) {
        console.error("Insert Error: state.value is not an array", state.value);
        state.value = []; // Reset to empty array if not an array
      }
      console.log("Current state:", state.value); // Add logging
      state.value = [...state.value, { Id, Title, Note, Deleted, Pinned, Achived, Hovered}];
      console.log("Updated state:", state.value); // Add logging
    },
    Update: (state, action) => {
      state.value = action.payload;
    },
    Delete: (state, action) => {
      const noteId = action.payload;
      state.value = state.value.map((note) =>
        note.Id === noteId ? { ...note, Deleted: !note.Hovered } : note
      );
    },
    Hover: (state, action) => {
      const noteId = action.payload;
      state.value = state.value.map((note) =>
        note.Id === noteId ? { ...note, Hovered: !note.Hovered } : note
      );
    },
    Achive: (state, action) => {
      const noteId = action.payload;
      state.value = state.value.map((note) =>
        note.Id === noteId ? { ...note, Achived: !note.Hovered } : note
      );
    },
    Pin: (state, action) => {
      const noteId = action.payload;
      state.value = state.value.map((note) =>
        note.Id === noteId ? { ...note, Pinned: !note.Hovered } : note
      );
    },
    
  },
});

export const { Insert, Delete, Update, Hover, Achive, Pin } = arraySlice.actions;

export default arraySlice.reducer;
