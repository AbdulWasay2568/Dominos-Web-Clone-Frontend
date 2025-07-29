import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  fetchAddons,
  fetchAddonById,
  createAddon,
  updateAddon,
  deleteAddon,
} from '../../services/addonsService';
import { CreateAddonDto, UpdateAddonDto } from '../../interfaces/addons.interface';

interface Addon {
  id: number;
  name: string;
  price: number;
  createdAt: string;
  updatedAt: string;
  productId: number;
}

interface AddonsState {
  addons: Addon[];
  selectedAddon: Addon | null;
  loading: boolean;
  error: string | null;
}

const initialState: AddonsState = {
  addons: [],
  selectedAddon: null,
  loading: false,
  error: null,
};

// Thunks
export const getAddons = createAsyncThunk<Addon[]>('addons/fetchAll', fetchAddons);

export const getAddonById = createAsyncThunk<Addon, number>(
  'addons/fetchById',
  async (id) => await fetchAddonById(id)
);

export const addAddon = createAsyncThunk<Addon, CreateAddonDto>(
  'addons/create',
  async (data) => await createAddon(data)
);

export const editAddon = createAsyncThunk<Addon, { id: number; data: UpdateAddonDto }>(
  'addons/update',
  async ({ id, data }) => await updateAddon(id, data)
);

export const removeAddon = createAsyncThunk<number, number>(
  'addons/delete',
  async (id) => {
    await deleteAddon(id);
    return id;
  }
);

// Slice
const addonsSlice = createSlice({
  name: 'addons',
  initialState,
  reducers: {
    clearSelectedAddon(state) {
      state.selectedAddon = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All
      .addCase(getAddons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAddons.fulfilled, (state, action: PayloadAction<Addon[]>) => {
        state.loading = false;
        state.addons = action.payload;
      })
      .addCase(getAddons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch addons';
      })

      // Fetch One
      .addCase(getAddonById.fulfilled, (state, action: PayloadAction<Addon>) => {
        state.selectedAddon = action.payload;
      })

      // Create
      .addCase(addAddon.fulfilled, (state, action: PayloadAction<Addon>) => {
        state.addons.push(action.payload);
      })

      // Update
      .addCase(editAddon.fulfilled, (state, action: PayloadAction<Addon>) => {
        const index = state.addons.findIndex((a) => a.id === action.payload.id);
        if (index !== -1) state.addons[index] = action.payload;
      })

      // Delete
      .addCase(removeAddon.fulfilled, (state, action: PayloadAction<number>) => {
        state.addons = state.addons.filter((addon) => addon.id !== action.payload);
      });
  },
});

export const { clearSelectedAddon } = addonsSlice.actions;
export default addonsSlice.reducer;
