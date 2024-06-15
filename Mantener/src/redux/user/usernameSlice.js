import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: '',
};

export const usernameSlice = createSlice({
  name: "username",
  initialState,
  reducers: {
    updateUsername: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { updateUsername } = usernameSlice.actions;

export default usernameSlice.reducer;
