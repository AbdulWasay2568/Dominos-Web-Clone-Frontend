import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { registerUser, loginUser } from "../../services/authService";
import { clearCurrentUser } from "./user.slice"
import { User } from "../../interfaces/users.interface";
import { Role } from "../../interfaces/enums.interface"
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

interface RegisterInput {
  name: string;
  email: string;
  password: string;
  role: Role;
}

interface LoginInput {
  email: string;
  password: string;
}

// 2. Thunks with explicit return type
export const register = createAsyncThunk<User, RegisterInput>(
  'auth/register',
  async (userData) => {
    const response = await registerUser(userData);
    return response; // assume response is of type User
  }
);

export const login = createAsyncThunk<User, LoginInput>(
  'auth/login',
  async (credentials) => {
    const response = await loginUser(credentials);
    return response;
  }
);


export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { dispatch }) => {
    dispatch(clearCurrentUser());
    return; 
  }
);


// 3. Initial state
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null
};

// 4. Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Registration failed";
      })

      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Login failed";
      })

      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Logout failed";
      });
      }
});

export default authSlice.reducer;
