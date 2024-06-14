import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: '',
};

export const usernameSlice = createSlice({
  name: "username",
  initialState,
  reducers: {
    username: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { username } = usernameSlice.actions;

export default usernameSlice.reducer;
