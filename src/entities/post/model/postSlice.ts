import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addPostToApi, deletePostFromApi, fetchPostsApi } from "../../../shared/api/postsApi.ts";
import { EnhancedPost } from "./PostModel.ts";

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  return await fetchPostsApi();
});

export const addPost = createAsyncThunk('posts/addPost', async (newPost: Omit<EnhancedPost, 'id'| 'author'>) => {
  return await addPostToApi(newPost);
});

export const deletePost = createAsyncThunk('posts/deletePost', async (postId: string) => {
  await deletePostFromApi(postId);
  return postId;
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
  reducers: {
    likePost: (state, action: PayloadAction<string>) => {
      const post = state.posts.find((p) => p.id === action.payload);
      if (post) {
        if (post.likedByUser) {
          post.likes -= 1;
          post.likedByUser = false;
        } else {
          post.likes += 1;
          post.likedByUser = true;

          if (post.dislikedByUser) {
            post.dislikes -= 1;
            post.dislikedByUser = false;
          }
        }
      }
    },
    dislikePost: (state, action: PayloadAction<string>) => {
      const post = state.posts.find((p) => p.id === action.payload);
      if (post) {
        if (post.dislikedByUser) {
          post.dislikes -= 1;
          post.dislikedByUser = false;
        } else {
          post.dislikes += 1;
          post.dislikedByUser = true;

          if (post.likedByUser) {
            post.likes -= 1;
            post.likedByUser = false;
          }
        }
      }
    },
    toggleIsFavorite: (state, action: PayloadAction<string>) => {
      const post = state.posts.find((post) => post.id === action.payload);
      post!.isFavorite = !post!.isFavorite;
    },
  },
  selectors: {
    postById: (sliceState, postId) => {
    return sliceState.posts.find((post) => post.id === postId)}
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload.map((post) => ({
          ...post,
          likes: Math.floor(Math.random() * 100),
          dislikes: Math.floor(Math.random() * 50),
          isFavorite: false,
        }));
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.posts.unshift({
          ...action.payload,
          userId: 1,
          likes: 0,
          dislikes: 0,
          likedByUser: false,
          dislikedByUser: false,
          isFavorite: false,
        });
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post.id !== action.payload);
      });
  },
});

export const {postById} = postsSlice.selectors;
export const {likePost, dislikePost, toggleIsFavorite} = postsSlice.actions;
export default postsSlice.reducer;
