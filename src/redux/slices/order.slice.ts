import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  fetchOrders,
  fetchOrderById,
  fetchOrdersByUserId,
  createOrder,
  updateOrder,
  deleteOrder,
} from '../../services/orderService';
import { CreateOrderDto, UpdateOrderDto, Order } from '../../interfaces/order.interfaces';

interface OrderState {
  orders: Order[];
  currentOrder: Order | null;
  grandTotal: number | null;
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  orders: [],
  currentOrder: null,
  grandTotal: null,
  loading: false,
  error: null,
};

// Thunks
export const getAllOrders = createAsyncThunk('orders/fetchAll', async (_, thunkAPI) => {
  try {
    return await fetchOrders();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const getOrderById = createAsyncThunk('orders/fetchById', async (id: number, thunkAPI) => {
  try {
    return await fetchOrderById(id);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const getOrdersByUserId = createAsyncThunk('orders/fetchByUserId', async (userId: number, thunkAPI) => {
  try {
    return await fetchOrdersByUserId(userId);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const createNewOrder = createAsyncThunk('orders/create', async (data: CreateOrderDto, thunkAPI) => {
  try {
    return await createOrder(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const updateExistingOrder = createAsyncThunk(
  'orders/update',
  async ({ id, data }: { id: number; data: UpdateOrderDto }, thunkAPI) => {
    try {
      return await updateOrder(id, data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteExistingOrder = createAsyncThunk('orders/delete', async (id: number, thunkAPI) => {
  try {
    await deleteOrder(id);
    return id;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

// Slice
const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearCurrentOrder(state) {
      state.currentOrder = null;
    },
    setGrandTotal(state, action: PayloadAction<number>) {
        state.grandTotal = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All Orders
      .addCase(getAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllOrders.fulfilled, (state, action: PayloadAction<Order[]>) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch Single Order
      .addCase(getOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderById.fulfilled, (state, action: PayloadAction<Order>) => {
        state.loading = false;
        state.currentOrder = action.payload;
      })
      .addCase(getOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      //Fetch orders by userId
      .addCase(getOrdersByUserId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrdersByUserId.fulfilled, (state, action: PayloadAction<Order[]>) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getOrdersByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Create Order
      .addCase(createNewOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewOrder.fulfilled, (state, action: PayloadAction<Order>) => {
        state.loading = false;
        state.orders.push(action.payload);
      })
      .addCase(createNewOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update Order
      .addCase(updateExistingOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateExistingOrder.fulfilled, (state, action: PayloadAction<Order>) => {
        state.loading = false;
        state.orders = state.orders.map((order) =>
          order.id === action.payload.id ? action.payload : order
        );
      })
      .addCase(updateExistingOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Delete Order
      .addCase(deleteExistingOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteExistingOrder.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false;
        state.orders = state.orders.filter((order) => order.id !== action.payload);
      })
      .addCase(deleteExistingOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCurrentOrder, setGrandTotal } = orderSlice.actions;
export default orderSlice.reducer;
