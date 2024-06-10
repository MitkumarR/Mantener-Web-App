import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

export const tempUserSlice = createSlice({
  name: "tempUser",
  initialState,
  reducers: {
    usetemp: (state) => {
      state.value = true;
    },
    savetempUser: (state, action) =>{
      state.value = action.payload;
    },  
  },
});

export const { usetemp, savetempUser } = tempUserSlice.actions;

export default tempUserSlice.reducer;