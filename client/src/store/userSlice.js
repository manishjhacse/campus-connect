import { createSlice } from "@reduxjs/toolkit";

const getInitialState = () => {
  try {
    const storedUser = localStorage.getItem("loggedInUser");
    return storedUser ? JSON.parse(storedUser) : {};
  } catch (error) {
    console.error("Error parsing loggedInUser from localStorage:", error);
    return {};
  }
};

const initialState = getInitialState();

const userSlice = createSlice({
  name: "loggedInUser",
  initialState,
  reducers: {
    changeLoggedInUser: (state, action) => {
      Object.assign(state, action.payload); // Mutates state instead of replacing it
      localStorage.setItem("loggedInUser", JSON.stringify(state));
    },
  },
});

export const { changeLoggedInUser } = userSlice.actions;
export default userSlice.reducer;
