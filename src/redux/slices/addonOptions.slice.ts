import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  fetchAddonOptions,
  fetchAddonOptionById,
  createAddonOption,
  updateAddonOption,
  deleteAddonOption,
} from '../../services/addonOptionsService';


interface AddonOption {
  id: number;
  optionName: string;
  additionalPrice: number;
  createdAt: string;
  updatedAt: string;
  addonId: number;
}

interface AddonOptionsState {
  addonOptions: AddonOption[];
  selectedAddonOption: AddonOption | null;
  loading: boolean;
  error: string | null;
}

const initialState: AddonOptionsState = {
  addonOptions: [],
  selectedAddonOption: null,
  loading: false,
  error: null,
};

// Thunks
export const getAddonOptions = createAsyncThunk(
  'addonOptions/fetchAll',
  fetchAddonOptions
);

export const getAddonOptionById = createAsyncThunk(
  'addonOptions/fetchById',
  async (id: number) => await fetchAddonOptionById(id)
);

export const addAddonOption = createAsyncThunk(
  'addonOptions/create',
  async (data: AddonOption) => await createAddonOption(data)
);

export const editAddonOption = createAsyncThunk(
  'addonOptions/update',
  async ({ id, data }: { id: number; data: AddonOption }) =>
    await updateAddonOption(id, data)
);

export const removeAddonOption = createAsyncThunk(
  'addonOptions/delete',
  async (id: number) => {
    await deleteAddonOption(id);
    return { id };
  }
);

// Slice
const addonOptionsSlice = createSlice({
  name: 'addonOptions',
  initialState,
  reducers: {
    clearSelectedAddonOption(state) {
      state.selectedAddonOption = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all
      .addCase(getAddonOptions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAddonOptions.fulfilled,
        (state, action: PayloadAction<AddonOption[]>) => {
          state.loading = false;
          state.addonOptions = action.payload;
        }
      )
      .addCase(getAddonOptions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to fetch addon options';
      })

      // Fetch one
      .addCase(
        getAddonOptionById.fulfilled,
        (state, action: PayloadAction<AddonOption>) => {
          state.selectedAddonOption = action.payload;
        }
      )

      // Create
      .addCase(
        addAddonOption.fulfilled,
        (state, action: PayloadAction<AddonOption>) => {
          state.addonOptions.push(action.payload);
        }
      )

      // Update
      .addCase(
        editAddonOption.fulfilled,
        (state, action: PayloadAction<AddonOption>) => {
          const index = state.addonOptions.findIndex(
            (opt) => opt.id === action.payload.id
          );
          if (index !== -1) state.addonOptions[index] = action.payload;
        }
      )

      // Delete
      .addCase(
        removeAddonOption.fulfilled,
        (state, action: PayloadAction<{ id: number }>) => {
          state.addonOptions = state.addonOptions.filter(
            (opt) => opt.id !== action.payload.id
          );
        }
      );
  },
});

export const { clearSelectedAddonOption } = addonOptionsSlice.actions;
export default addonOptionsSlice.reducer;
