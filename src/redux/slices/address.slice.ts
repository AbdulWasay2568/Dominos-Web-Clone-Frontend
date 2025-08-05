import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  fetchAddresses,
  fetchAddressById,
  fetchAddressesByUserId,
  createAddress,
  updateAddress,
  deleteAddress,
} from '../../services/addressService';
import { CreateAddressDto, UpdateAddressDto } from '../../interfaces/address.interface';

export interface Address {
  id: number;
  houseNo: string;
  street: string;
  society: string;
  city: string;
  zipCode: string;
  userId: number;
}

interface AddressState {
  addresses: Address[];
  loading: boolean;
  error: string | null;
}

const initialState: AddressState = {
  addresses: [],
  loading: false,
  error: null,
};

export const getAllAddresses = createAsyncThunk('addresses/getAll', async (_, thunkAPI) => {
  try {
    return await fetchAddresses();
  } catch (error) {
    return thunkAPI.rejectWithValue('Failed to fetch addresses'+ error);
  }
});

export const getAddressById = createAsyncThunk('addresses/getById', async (id: number, thunkAPI) => {
  try {
    return await fetchAddressById(id);
  } catch (error) {
    return thunkAPI.rejectWithValue(`Failed to fetch address with id ${id}`+ error);
  }
});

export const getAddressesByUserId = createAsyncThunk('addresses/getByUser', async (userId: number, thunkAPI) => {
  try {
    return await fetchAddressesByUserId(userId);
  } catch (error) {
    return thunkAPI.rejectWithValue(`Failed to fetch addresses for user ${userId}`+ error);
  }
});

export const addAddress = createAsyncThunk('addresses/create', async (data: CreateAddressDto, thunkAPI) => {
  try {
    return await createAddress(data);
  } catch (error) {
    return thunkAPI.rejectWithValue('Failed to create address'+ error);
  }
});

export const editAddress = createAsyncThunk(
  'addresses/update',
  async ({ id, data }: { id: number; data: UpdateAddressDto }, thunkAPI) => {
    try {
      return await updateAddress(id, data);
    } catch (error) {
      return thunkAPI.rejectWithValue(`Failed to update address with id ${id}`+ error);
    }
  }
);

export const removeAddress = createAsyncThunk('addresses/delete', async (id: number, thunkAPI) => {
  try {
    await deleteAddress(id);
    return id;
  } catch (error) {
    return thunkAPI.rejectWithValue(`Failed to delete address with id ${id}`+ error);
  }
});

// Slice
const addressSlice = createSlice({
  name: 'addresses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get All
      .addCase(getAllAddresses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllAddresses.fulfilled, (state, action: PayloadAction<Address[]>) => {
        state.loading = false;
        state.addresses = action.payload;
      })
      .addCase(getAllAddresses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch addresses';
      })

      // Get by User
      .addCase(getAddressesByUserId.fulfilled, (state, action: PayloadAction<Address[]>) => {
        state.addresses = action.payload;
      })

      // Create
      .addCase(addAddress.fulfilled, (state, action: PayloadAction<Address>) => {
        state.addresses.push(action.payload);
      })

      // Update
      .addCase(editAddress.fulfilled, (state, action: PayloadAction<Address>) => {
        const index = state.addresses.findIndex((addr) => addr.id === action.payload.id);
        if (index !== -1) {
          state.addresses[index] = action.payload;
        }
      })

      // Delete
      .addCase(removeAddress.fulfilled, (state, action: PayloadAction<number>) => {
        state.addresses = state.addresses.filter((addr) => addr.id !== action.payload);
      });
  },
});

export default addressSlice.reducer;
