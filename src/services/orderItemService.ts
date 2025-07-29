import { apiClient } from './axios';
import { CreateOrderItemDto, UpdateOrderItemDto } from '../interfaces/orderItem.interface';

export const fetchOrderItems = async () => {
  try {
    const res = await apiClient.get('/order-items');
    return res.data;
  } catch (err) {
    console.error('Failed to fetch order items:', err);
    throw err;
  }
};

export const fetchOrderItemById = async (id: number) => {
  try {
    const res = await apiClient.get(`/order-items/${id}`);
    return res.data;
  } catch (err) {
    console.error(`Failed to fetch order item ${id}:`, err);
    throw err;
  }
};

export const createOrderItem = async (data: CreateOrderItemDto) => {
  try {
    const res = await apiClient.post('/order-items', data);
    return res.data;
  } catch (err) {
    console.error('Failed to create order item:', err);
    throw err;
  }
};

export const updateOrderItem = async (id: number, data: UpdateOrderItemDto) => {
  try {
    const res = await apiClient.put(`/order-items/${id}`, data);
    return res.data;
  } catch (err) {
    console.error(`Failed to update order item ${id}:`, err);
    throw err;
  }
};

export const deleteOrderItem = async (id: number) => {
  try {
    const res = await apiClient.delete(`/order-items/${id}`);
    return res.data;
  } catch (err) {
    console.error(`Failed to delete order item ${id}:`, err);
    throw err;
  }
};
