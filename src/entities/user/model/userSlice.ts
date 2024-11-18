import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
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
  reducers: {
    updateUser: (state, action: PayloadAction<UserModel>) => {
      const index = state.users.findIndex(user => user.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    }
  },
  selectors: {
    userById: (sliceState) => {return sliceState.users.find((user) => user.id === '1')}
  },
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
export const {userById} = usersSlice.selectors;
export const {updateUser} = usersSlice.actions;
export default usersSlice.reducer;