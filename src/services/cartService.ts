import { apiClient } from './axios';
import { CreateCartDto, UpdateCartDto, AddItemToCartDto } from '../interfaces/cart.interface';

export const fetchCarts = async () => {
  try {
    const res = await apiClient.get('/carts');
    return res.data;
  } catch (err) {
    console.error('Failed to fetch carts:', err);
    throw err;
  }
};

export const fetchCartByUserId = async (userId: number) => {
  try {
    const res = await apiClient.get(`/carts/${userId}`);
    return res.data;
  } catch (err) {
    console.error(`Failed to fetch cart ${userId}:`, err);
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

export const addItemToCart  = async (data: AddItemToCartDto) => {
  try {
    const res = await apiClient.post('/carts/cartItems', data);
    return res.data;
  } catch (err) {
    console.error('Failed to add items to cart:', err);
    throw err;
  }
};
