import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

export const tempUserSlice = createSlice({
  name: "tempUser",
  initialState,
  reducers: {
    tempUse: (state) => {
      state.value = true;
    },
    
    update_tempUse: (state, action) => {
      state.value = action.payload;
    },
    
  },
});

export const { tempUse, update_tempUse } = tempUserSlice.actions;

export default tempUserSlice.reducer;
