import { apiClient } from './axios';
import { CreateCartDto, UpdateCartDto } from '../interfaces/cart';

export const fetchCarts = async () => {
  try {
    const res = await apiClient.get('/carts');
    return res.data;
  } catch (err) {
    console.error('Failed to fetch carts:', err);
    throw err;
  }
};

export const fetchCartById = async (id: number) => {
  try {
    const res = await apiClient.get(`/carts/${id}`);
    return res.data;
  } catch (err) {
    console.error(`Failed to fetch cart ${id}:`, err);
    throw err;
  }
};

export const createCart = async (data: CreateCartDto) => {
  try {
    const res = await apiClient.post('/carts', data);
    return res.data;
  } catch (err) {
    console.error('Failed to create cart:', err);
    throw err;
  }
};

export const updateCart = async (id: number, data: UpdateCartDto) => {
  try {
    const res = await apiClient.put(`/carts/${id}`, data);
    return res.data;
  } catch (err) {
    console.error(`Failed to update cart ${id}:`, err);
    throw err;
  }
};

export const deleteCart = async (id: number) => {
  try {
    const res = await apiClient.delete(`/carts/${id}`);
    return res.data;
  } catch (err) {
    console.error(`Failed to delete cart ${id}:`, err);
    throw err;
  }
};
