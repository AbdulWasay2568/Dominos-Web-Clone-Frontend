import { createSlice } from '@reduxjs/toolkit';

interface LoadingState {
  isLoading: boolean;
  pendingRequests: number;
}

const initialState: LoadingState = {
  isLoading: false,
  pendingRequests: 0,
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.pendingRequests += 1;
          state.isLoading = true;
        }
      )
      .addMatcher(
        (action) =>
          action.type.endsWith('/fulfilled') ||
          action.type.endsWith('/rejected'),
        (state) => {
          state.pendingRequests = Math.max(0, state.pendingRequests - 1);
          state.isLoading = state.pendingRequests > 0;
        }
      );
  },
});

export default loadingSlice.reducer;
