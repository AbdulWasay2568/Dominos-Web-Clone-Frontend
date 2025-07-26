import { apiClient } from './axios';
import { CreateOrderDto, UpdateOrderDto } from '../interfaces/order';

export const fetchOrders = async () => {
  try {
    const res = await apiClient.get('/orders');
    return res.data;
  } catch (err) {
    console.error('Failed to fetch orders:', err);
    throw err;
  }
};

export const fetchOrderById = async (id: number) => {
  try {
    const res = await apiClient.get(`/orders/${id}`);
    return res.data;
  } catch (err) {
    console.error(`Failed to fetch order ${id}:`, err);
    throw err;
  }
};

export const createOrder = async (data: CreateOrderDto) => {
  try {
    const res = await apiClient.post('/orders', data);
    return res.data;
  } catch (err) {
    console.error('Failed to create order:', err);
    throw err;
  }
};

export const updateOrder = async (id: number, data: UpdateOrderDto) => {
  try {
    const res = await apiClient.put(`/orders/${id}`, data);
    return res.data;
  } catch (err) {
    console.error(`Failed to update order ${id}:`, err);
    throw err;
  }
};

export const deleteOrder = async (id: number) => {
  try {
    const res = await apiClient.delete(`/orders/${id}`);
    return res.data;
  } catch (err) {
    console.error(`Failed to delete order ${id}:`, err);
    throw err;
  }
};
