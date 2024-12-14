import { createSlice } from "@reduxjs/toolkit";
const initialState = localStorage.getItem("isLoggedin")
  ? JSON.parse(localStorage.getItem("isLoggedin"))
  : false;
const loggedinSlice = createSlice({
  name: "isLoggedin",
  initialState,
  reducers: {
    changeLoggedIn: (state, action) => {
      const newState = action.payload;
      localStorage.setItem("isLoggedin", JSON.stringify(newState));
      return newState;
    },
  },
});
export const { changeLoggedIn } = loggedinSlice.actions;
export default loggedinSlice.reducer;
