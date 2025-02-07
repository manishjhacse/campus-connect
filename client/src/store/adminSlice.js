import { createSlice } from "@reduxjs/toolkit";
const initialState = {};
const adminSlice = createSlice({
  initialState,
  name: "admin",
  reducers: {
    changeLoggedInAdmin: (state, action) => {
      return action.payload;
    },
  },
});
export const { changeLoggedInAdmin } = adminSlice.actions;
export default adminSlice.reducer;
