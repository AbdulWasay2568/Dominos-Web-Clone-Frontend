import { apiClient } from './axios';
import { CreateCartItemDto, UpdateCartItemDto } from '../interfaces/cartItem';

export const fetchCartItems = async () => {
  try {
    const res = await apiClient.get('/cart-items');
    return res.data;
  } catch (err) {
    console.error('Failed to fetch cart items:', err);
    throw err;
  }
};

export const fetchCartItemById = async (id: number) => {
  try {
    const res = await apiClient.get(`/cart-items/${id}`);
    return res.data;
  } catch (err) {
    console.error(`Failed to fetch cart item ${id}:`, err);
    throw err;
  }
};

export const createCartItem = async (data: CreateCartItemDto) => {
  try {
    const res = await apiClient.post('/cart-items', data);
    return res.data;
  } catch (err) {
    console.error('Failed to create cart item:', err);
    throw err;
  }
};

export const updateCartItem = async (id: number, data: UpdateCartItemDto) => {
  try {
    const res = await apiClient.put(`/cart-items/${id}`, data);
    return res.data;
  } catch (err) {
    console.error(`Failed to update cart item ${id}:`, err);
    throw err;
  }
};

export const deleteCartItem = async (id: number) => {
  try {
    const res = await apiClient.delete(`/cart-items/${id}`);
    return res.data;
  } catch (err) {
    console.error(`Failed to delete cart item ${id}:`, err);
    throw err;
  }
};
