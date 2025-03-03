import { createSlice } from "@reduxjs/toolkit";
const initialState = localStorage.getItem("adminData")
? JSON.parse(localStorage.getItem("adminData"))
: {};;
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
