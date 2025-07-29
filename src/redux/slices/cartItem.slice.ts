import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  fetchCartItems,
  fetchCartItemById,
  createCartItem,
  updateCartItem,
  deleteCartItem,
} from '../../services/cartItemService';
import { CartItem } from '../../interfaces/cartItem.interface';

interface CartItemState {
  items: CartItem[];
  selectedItem: CartItem | null;
  loading: boolean;
  error: string | null;
}

const initialState: CartItemState = {
  items: [],
  selectedItem: null,
  loading: false,
  error: null,
};

// Thunks
export const getCartItems = createAsyncThunk('cartItems/getAll', async () => {
  return await fetchCartItems();
});

export const getCartItemById = createAsyncThunk('cartItems/getById', async (id: number) => {
  return await fetchCartItemById(id);
});

export const addCartItem = createAsyncThunk('cartItems/create', async (data: CartItem) => {
  return await createCartItem(data);
});

export const editCartItem = createAsyncThunk(
  'cartItems/update',
  async ({ id, data }: { id: number; data: CartItem }) => {
    return await updateCartItem(id, data);
  }
);

export const removeCartItem = createAsyncThunk('cartItems/delete', async (id: number) => {
  await deleteCartItem(id);
  return id;
});

// Slice
const cartItemSlice = createSlice({
  name: 'cartItems',
  initialState,
  reducers: {
    clearSelectedCartItem(state) {
      state.selectedItem = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All
      .addCase(getCartItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCartItems.fulfilled, (state, action: PayloadAction<CartItem[]>) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(getCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to fetch cart items';
      })

      // Fetch One
      .addCase(getCartItemById.fulfilled, (state, action: PayloadAction<CartItem>) => {
        state.selectedItem = action.payload;
      })

      // Create
      .addCase(addCartItem.fulfilled, (state, action: PayloadAction<CartItem>) => {
        state.items.push(action.payload);
      })

      // Update
      .addCase(editCartItem.fulfilled, (state, action: PayloadAction<CartItem>) => {
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })

      // Delete
      .addCase(removeCartItem.fulfilled, (state, action: PayloadAction<number>) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      });
  },
});

export const { clearSelectedCartItem } = cartItemSlice.actions;
export default cartItemSlice.reducer;
