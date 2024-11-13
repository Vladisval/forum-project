import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchUsersApi } from "../../../shared/api/usersApi.ts";
import { UserModel } from "./UserModel.ts";

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  return await fetchUsersApi();
});

interface UsersState {
  users: UserModel[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: UsersState = {
  users: [],
  status: 'idle',
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default usersSlice.reducer;