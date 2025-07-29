import { apiClient } from './axios';
import { CreateProductDto, UpdateProductDto } from '../interfaces/product.interface';

export const fetchProducts = async () => {
  try {
    const res = await apiClient.get('/products');
    return res.data;
  } catch (err) {
    console.error('Failed to fetch products:', err);
    throw err;
  }
};

export const fetchProductById = async (id: number) => {
  try {
    const res = await apiClient.get(`/products/${id}`);
    return res.data;
  } catch (err) {
    console.error(`Failed to fetch product ${id}:`, err);
    throw err;
  }
};

export const createProduct = async (data: CreateProductDto) => {
  try {
    const res = await apiClient.post('/products', data);
    return res.data;
  } catch (err) {
    console.error('Failed to create product:', err);
    throw err;
  }
};

export const updateProduct = async (id: number, data: UpdateProductDto) => {
  try {
    const res = await apiClient.put(`/products/${id}`, data);
    return res.data;
  } catch (err) {
    console.error(`Failed to update product ${id}:`, err);
    throw err;
  }
};

export const deleteProduct = async (id: number) => {
  try {
    const res = await apiClient.delete(`/products/${id}`);
    return res.data;
  } catch (err) {
    console.error(`Failed to delete product ${id}:`, err);
    throw err;
  }
};
