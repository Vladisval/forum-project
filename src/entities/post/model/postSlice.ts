import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchPostsApi } from "../../../shared/api/postsApi.ts";
import { EnhancedPost } from "./PostModel.ts";

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  return await fetchPostsApi();
});


interface PostsState {
  posts: EnhancedPost[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: PostsState = {
  posts: [],
  status: 'idle',
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  selectors: {postById: (sliceState, postId) => {
    return sliceState.posts.find((post) => post.id === postId)}},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const {selectors} = postsSlice
export default postsSlice.reducer;
