import { configureStore } from "@reduxjs/toolkit";
import postsReducer from '../../entities/post/model/postSlice.ts';
import usersReducer from '../../entities/user/model/userSlice.ts';
import { commentsReducer } from "../../entities/comment/model/commentSlice.ts";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
    comments: commentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;