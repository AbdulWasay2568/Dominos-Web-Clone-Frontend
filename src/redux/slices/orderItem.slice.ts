import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  fetchOrderItems,
  fetchOrderItemById,
  createOrderItem,
  updateOrderItem,
  deleteOrderItem,
} from '../../services/orderItemService';
import {OrderItem, CreateOrderItemDto, UpdateOrderItemDto} from '../../interfaces/orderItem.interface';

interface OrderItemState {
  orderItems: OrderItem[];
  currentOrderItem: OrderItem | null;
  loading: boolean;
  error: string | null;
}

const initialState: OrderItemState = {
  orderItems: [],
  currentOrderItem: null,
  loading: false,
  error: null,
};

// Thunks
export const getOrderItems = createAsyncThunk('orderItems/fetchAll', async (_, thunkAPI) => {
  try {
    return await fetchOrderItems();
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

export const getOrderItemById = createAsyncThunk(
  'orderItems/fetchById',
  async (id: number, thunkAPI) => {
    try {
      return await fetchOrderItemById(id);
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const createNewOrderItem = createAsyncThunk(
  'orderItems/create',
  async (data: CreateOrderItemDto, thunkAPI) => {
    try {
      return await createOrderItem(data);
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const updateExistingOrderItem = createAsyncThunk(
  'orderItems/update',
  async ({ id, data }: { id: number; data: UpdateOrderItemDto }, thunkAPI) => {
    try {
      return await updateOrderItem(id, data);
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const deleteExistingOrderItem = createAsyncThunk(
  'orderItems/delete',
  async (id: number, thunkAPI) => {
    try {
      await deleteOrderItem(id);
      return id;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// Slice
const orderItemSlice = createSlice({
  name: 'orderItems',
  initialState,
  reducers: {
    clearCurrentOrderItem(state) {
      state.currentOrderItem = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All
      .addCase(getOrderItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderItems.fulfilled, (state, action: PayloadAction<OrderItem[]>) => {
        state.loading = false;
        state.orderItems = action.payload;
      })
      .addCase(getOrderItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch By ID
      .addCase(getOrderItemById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderItemById.fulfilled, (state, action: PayloadAction<OrderItem>) => {
        state.loading = false;
        state.currentOrderItem = action.payload;
      })
      .addCase(getOrderItemById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Create
      .addCase(createNewOrderItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewOrderItem.fulfilled, (state, action: PayloadAction<OrderItem>) => {
        state.loading = false;
        state.orderItems.push(action.payload);
      })
      .addCase(createNewOrderItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update
      .addCase(updateExistingOrderItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateExistingOrderItem.fulfilled, (state, action: PayloadAction<OrderItem>) => {
        state.loading = false;
        state.orderItems = state.orderItems.map((item) =>
          item.id === action.payload.id ? action.payload : item
        );
      })
      .addCase(updateExistingOrderItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Delete
      .addCase(deleteExistingOrderItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteExistingOrderItem.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false;
        state.orderItems = state.orderItems.filter((item) => item.id !== action.payload);
      })
      .addCase(deleteExistingOrderItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCurrentOrderItem } = orderItemSlice.actions;
export default orderItemSlice.reducer;
