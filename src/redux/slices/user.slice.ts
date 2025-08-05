import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  fetchUsers,
  fetchUserById,
  createUser,
  updateUser,
  deleteUser,
  updateUserImage,
} from '../../services/usersService';
import { CreateUserDto, UpdateUserDto, User } from '../../interfaces/users.interface';

interface UserState {
  users: User[];
  currentUser: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  currentUser: null,
  loading: false,
  error: null,
};

// Thunks with try-catch
export const getAllUsers = createAsyncThunk('users/getAll', async (_, { rejectWithValue }) => {
  try {
    return await fetchUsers();
  } catch (error) {
    return rejectWithValue('Failed to fetch users' + error);
  }
});

export const getUserById = createAsyncThunk('users/getById', async (id: number, { rejectWithValue }) => {
  try {
    return await fetchUserById(id);
  } catch (error) {
    return rejectWithValue(`Failed to fetch user ${id}` + error);
  }
});

export const createNewUser = createAsyncThunk(
  'users/create',
  async (data: CreateUserDto, { rejectWithValue }) => {
    try {
      return await createUser(data);
    } catch (error) {
      return rejectWithValue('Failed to create user' + error);
    }
  }
);

export const updateUserById = createAsyncThunk(
  'users/update',
  async ({ id, data }: { id: number; data: UpdateUserDto }, { rejectWithValue }) => {
    try {
      return await updateUser(id, data);
    } catch (error) {
      return rejectWithValue(`Failed to update user ${id}` + error);
    }
  }
);

export const deleteUserById = createAsyncThunk(
  'users/delete',
  async (id: number, { rejectWithValue }) => {
    try {
      await deleteUser(id);
      return id;
    } catch (error) {
      return rejectWithValue(`Failed to delete user ${id}` + error);
    }
  }
);

export const updateUserImageById = createAsyncThunk(
  'users/updateImage',
  async ({ userId, imageFile }: { userId: number; imageFile: File }, { rejectWithValue }) => {
    try {
      return await updateUserImage(userId, imageFile);
    } catch (error) {
      return rejectWithValue(`Failed to update user image for user ${userId}` + error);
    }
  }
);

// Slice
const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearCurrentUser(state) {
      state.currentUser = null;
    },
     setCurrentUser(state, action: PayloadAction<User>) {
    state.currentUser = action.payload;
  },
},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(getUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(createNewUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(createNewUser.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      .addCase(updateUserById.fulfilled, (state, action) => {
        const index = state.users.findIndex((u) => u.id === action.payload.id);
        if (index !== -1) state.users[index] = action.payload;
        if (state.currentUser?.id === action.payload.id) {
          state.currentUser = action.payload;
        }
      })
      .addCase(updateUserById.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      .addCase(deleteUserById.fulfilled, (state, action) => {
        state.users = state.users.filter((u) => u.id !== action.payload);
      })
      .addCase(deleteUserById.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      .addCase(updateUserImageById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserImageById.fulfilled, (state, action) => {
        state.loading = false;
        const updatedUser = action.payload;
        const index = state.users.findIndex((u) => u.id === updatedUser.id);
        if (index !== -1) state.users[index] = updatedUser;
        if (state.currentUser?.id === updatedUser.id) {
          state.currentUser = updatedUser;
        }
      })
      .addCase(updateUserImageById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCurrentUser, setCurrentUser } = userSlice.actions;
export default userSlice.reducer;
