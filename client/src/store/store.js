import { configureStore } from "@reduxjs/toolkit";
import loggedinSlice from "./loginSlice";
import userSlice from "./userSlice";

const store=configureStore({
    reducer:{
        isLoggedin:loggedinSlice,
        user:userSlice
    }
})
export default store