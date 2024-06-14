import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: '',
};

export const useridSlice = createSlice({
  name: "userid",
  initialState,
  reducers: {
    userid: (state, action) => {
      state.value = action.payload;
    },
  
  },
});

export const { userid } = useridSlice.actions;

export default useridSlice.reducer;
