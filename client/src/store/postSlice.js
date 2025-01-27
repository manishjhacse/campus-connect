import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.unshift(action.payload); 
    },

    getAllPosts: (state, action) => {
      return action.payload;
    },

    deletePost: (state, action) => {
      return state.filter((post) => post._id !== action.payload);
    },
  },
});

export const { addPost, getAllPosts, deletePost } = postSlice.actions;

export default postSlice.reducer;
