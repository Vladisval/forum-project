import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addComment, fetchCommentsByPostId } from "../../../shared/api/commentApi.ts";
import { CommentModel } from "./CommentModel.ts";

interface CommentsState {
  comments: CommentModel[];
  loading: boolean;
  error: string | null;
}

const initialState: CommentsState = {
  comments: [],
  loading: false,
  error: null,
};

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (postId: string) => await fetchCommentsByPostId(postId)
);

export const createComment = createAsyncThunk(
  'comments/createComment',
  async (newComment: Omit<CommentModel, 'id' | 'createdAt'>) => await addComment(newComment)
);


const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload.map((comment) => ({
          ...comment,
          createdAt: new Date().toISOString()
        }));
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка';
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.comments.push(action.payload);
      });
  },
});

export const commentsReducer = commentsSlice.reducer;