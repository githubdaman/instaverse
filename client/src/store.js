import posts from "./reducers/posts.js";
import updateCurrentId from "./reducers/update-current-id.js";
import authReducer from "./reducers/auth.js";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    posts: posts,
    currentId: updateCurrentId,
    authReducer: authReducer,
  },
});

export default store;
