import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { registerUser, loginUser } from "../../services/authService";
import { clearCurrentUser } from "./user.slice";
import { User } from "../../interfaces/users.interface";
import { Role } from "../../interfaces/enums.interface";

// --- Auth state ---
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

// --- Only returned by login ---
interface LoginResponse {
  id: number;
  role: Role;
}

// --- Thunks ---
// Register returns full User
export const register = createAsyncThunk<User, RegisterInput>(
  'auth/register',
  async (userData) => {
    const response = await registerUser(userData);
    return response; // full User
  }
);

// Login returns only id + role
export const login = createAsyncThunk<LoginResponse, LoginInput>(
  'auth/login',
  async (credentials) => {
    const response = await loginUser(credentials);
    return response; // matches LoginResponse exactly
  }
);

// Logout clears current user
export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { dispatch }) => {
    dispatch(clearCurrentUser());
    return;
  }
);

// --- Initial state ---
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null
};

// --- Slice ---
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // --- Register ---
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
      });

    // --- Login ---
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
        state.loading = false;
        // Store only id and role in state.user
        state.user = { 
          id: action.payload.id, 
          role: action.payload.role 
        } as User; // cast if User type has extra props
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Login failed";
      });

    // --- Logout ---
    builder
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
