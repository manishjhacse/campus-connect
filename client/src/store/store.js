import { configureStore } from "@reduxjs/toolkit";
import loggedinSlice from "./loginSlice";
import userSlice from "./userSlice";
import postSlice from "./postSlice";
import adminSlice from "./adminSlice";

const store = configureStore({
  reducer: {
    isLoggedin: loggedinSlice,
    user: userSlice,
    posts: postSlice,
    admin: adminSlice,
  },
});
export default store;
