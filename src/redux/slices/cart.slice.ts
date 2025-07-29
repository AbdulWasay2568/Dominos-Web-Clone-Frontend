import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  fetchCarts,
  createCart,
  updateCart,
  deleteCart,
  addItemToCart,
  fetchCartByUserId,
} from '../../services/cartService';
import { Cart, AddItemToCartDto } from '../../interfaces/cart.interface';
import { CartItem } from '../../interfaces/cartItem.interface';

interface CartState {
  carts: Cart[];
  currentCart: Cart | null;
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  carts: [],
  currentCart: null,
  loading: false,
  error: null,
};

// Thunks
export const getAllCarts = createAsyncThunk('cart/fetchAll', async () => {
  return await fetchCarts();
});

export const addCart = createAsyncThunk('cart/create', async (data: Cart) => {
  return await createCart(data);
});

export const editCart = createAsyncThunk(
  'cart/update',
  async ({ id, data }: { id: number; data: Cart }) => {
    return await updateCart(id, data);
  }
);

export const removeCart = createAsyncThunk('cart/delete', async (id: number) => {
  await deleteCart(id);
  return id;
});

export const addProductWithAddonsToCart = createAsyncThunk<CartItem, AddItemToCartDto, { rejectValue: string }>(
  'cart/addItemToCart',
  async (data, { rejectWithValue }) => {
    try {
      return await addItemToCart(data);
    } catch (err: any) {
      return rejectWithValue(err?.response?.data?.message || 'Add to cart failed');
    }
  }
);

export const getCartByUserId = createAsyncThunk(
  'cart/fetchByUserId',
  async (userId: number, { rejectWithValue }) => {
    try {
      const cart = await fetchCartByUserId(userId);
      return cart;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'Failed to fetch cart');
    }
  }
);

// Slice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCurrentCart: (state) => {
      state.currentCart = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all
      .addCase(getAllCarts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllCarts.fulfilled, (state, action: PayloadAction<Cart[]>) => {
        state.loading = false;
        state.carts = action.payload;
      })
      .addCase(getAllCarts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch carts';
      })

      // Create
      .addCase(addCart.fulfilled, (state, action: PayloadAction<Cart>) => {
        state.carts.push(action.payload);
      })

      // Update
      .addCase(editCart.fulfilled, (state, action: PayloadAction<Cart>) => {
        const index = state.carts.findIndex((c) => c.id === action.payload.id);
        if (index !== -1) {
          state.carts[index] = action.payload;
        }
      })

      // Delete
      .addCase(removeCart.fulfilled, (state, action: PayloadAction<number>) => {
        state.carts = state.carts.filter((c) => c.id !== action.payload);
      })

      // Add item to cart
      .addCase(addProductWithAddonsToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProductWithAddonsToCart.fulfilled, (state, action: PayloadAction<CartItem>) => {
        state.loading = false;
        if (state.currentCart) {
          if (!('items' in state.currentCart)) {
            (state.currentCart as any).items = [];
          }
          (state.currentCart as any).items.push(action.payload);
        }
      })
      .addCase(addProductWithAddonsToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      })

      // Get cart of a user
      .addCase(getCartByUserId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCartByUserId.fulfilled, (state, action: PayloadAction<Cart>) => {
        state.loading = false;
        state.currentCart = action.payload; // ← FIXED
      })
      .addCase(getCartByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCurrentCart } = cartSlice.actions;
export default cartSlice.reducer;
