import { createSlice } from "@reduxjs/toolkit";
import { RxColumnSpacing } from "react-icons/rx";
import Archived from "../../components/Home/Main/Archived";

const initialState = {
  value: [],
};

export const arraySlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    Insert: (state, action) => {
      const { Id, Title, Note, Deleted, Pinned, Archived, Hovered } =
        action.payload;
      if (!Array.isArray(state.value)) {
        console.error("Insert Error: state.value is not an array", state.value);
        state.value = []; // Reset to empty array if not an array
      }
      console.log("Current state:", state.value); // Add logging
      state.value = [
        ...state.value,
        { Id, Title, Note, Deleted, Pinned, Archived, Hovered },
      ];
      console.log("Updated state:", state.value); // Add logging
    },
    Update: (state, action) => {
      state.value = action.payload;
    },
    Delete: (state, action) => {
      const noteId = action.payload;
      state.value = state.value.map((note) =>
        note.Id === noteId
          ? { ...note, Deleted: !note.Deleted, Archived: false, Pinned: false }
          : note
      );
      console.log(state.value);
    },
    Hover: (state, action) => {
      const noteId = action.payload;
      state.value = state.value.map((note) =>
        note.Id === noteId ? { ...note, Hovered: !note.Hovered } : note
      );
    },
    Archive: (state, action) => {
      const noteId = action.payload;
      state.value = state.value.map((note) =>
        note.Id === noteId
          ? { ...note, Archived: !note.Archived, Deleted: false, Pinned: false }
          : note
      );
      console.log(state.value);
    },
    Pin: (state, action) => {
      const noteId = action.payload;
      state.value = state.value.map((note) =>
        note.Id === noteId
          ? { ...note, Pinned: !note.Pinned, Deleted: false, Archived: false }
          : note
      );

      console.log(state.value);
    },

    Remove: (state, action) => {
      state.value = state.value.filter((note) => note.Id !== action.payload);
    },

    Erase: (state) => {
      state.value = [];
    },
  },
});

export const { Insert, Delete, Update, Hover, Archive, Pin, Remove, Erase } =
  arraySlice.actions;

export default arraySlice.reducer;
