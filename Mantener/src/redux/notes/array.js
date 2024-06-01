import { createSlice } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";
import { getNote } from "./note";
import { getTitle } from "./title";

import { v4 as uuidv4 } from "uuid";

const initialState = {
    value: [],
};



export const arraySlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    insert: (state) => {

      state.value = [...state.value, { id: uuidv4(), Title, Note }];
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
