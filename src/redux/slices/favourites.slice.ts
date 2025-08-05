import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchFavouritesBbyUserId,
  fetchFavouriteById,
  createFavourite,
  deleteFavourite,
} from '../../services/favouritesService';
import { CreateFavouriteDto, Favourite } from '../../interfaces/favourites.interface';

interface FavouritesState {
  favourites: Favourite[];
  favourite: Favourite | null;
  loading: boolean;
  error: string | null;
}

const initialState: FavouritesState = {
  favourites: [],
  favourite: null,
  loading: false,
  error: null,
};

// Thunks
export const getFavouritesByUserId = createAsyncThunk(
  'favourites/getByUserId',
  async (userId: number, { rejectWithValue }) => {
    try {
      const data = await fetchFavouritesBbyUserId(userId);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getFavouriteById = createAsyncThunk(
  'favourites/getById',
  async (id: number, { rejectWithValue }) => {
    try {
      const data = await fetchFavouriteById(id);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addFavourite = createAsyncThunk(
  'favourites/add',
  async (dto: CreateFavouriteDto, { rejectWithValue }) => {
    try {
      const data = await createFavourite(dto);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const removeFavourite = createAsyncThunk(
  'favourites/delete',
  async (id: number, { rejectWithValue }) => {
    try {
      await deleteFavourite(id);
      return id;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Slice
const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get by userId
      .addCase(getFavouritesByUserId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFavouritesByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.favourites = action.payload;
      })
      .addCase(getFavouritesByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Get by ID
      .addCase(getFavouriteById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFavouriteById.fulfilled, (state, action) => {
        state.loading = false;
        state.favourite = action.payload;
      })
      .addCase(getFavouriteById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Add
      .addCase(addFavourite.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addFavourite.fulfilled, (state, action) => {
        state.loading = false;
        state.favourites.push(action.payload);
      })
      .addCase(addFavourite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Delete
      .addCase(removeFavourite.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFavourite.fulfilled, (state, action) => {
        state.loading = false;
        state.favourites = state.favourites.filter(fav => fav.id !== action.payload);
      })
      .addCase(removeFavourite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default favouritesSlice.reducer;
