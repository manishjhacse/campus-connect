import { configureStore } from "@reduxjs/toolkit";
import loggedinSlice from "./loginSlice";
import userSlice from "./userSlice";
import postSlice from "./postSlice";

const store=configureStore({
    reducer:{
        isLoggedin:loggedinSlice,
        user:userSlice,
        posts:postSlice
    }
})
export default store