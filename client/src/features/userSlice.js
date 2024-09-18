import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "dark",
  user: null,
  token: "",
  posts: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    login: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.user = null;
      state.token = "";
    },
    setUser: (action, payload) => {
      state.user = action.payload;
    },
    updatePost: (state, action) => {
      state.posts = state.posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    },
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload;
      } else {
        console.error("user friends non-existent :(");
      }
    },
  },
});

export const {
  setMode,
  login,
  logout,
  setUser,
  updatePost,
  setPosts,
  setFriends,
} = userSlice.actions;
export default userSlice.reducer;
