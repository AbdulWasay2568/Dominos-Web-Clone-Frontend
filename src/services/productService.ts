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


export const createProductWithAddons = async (data: CreateProductDto, imageFile: File) => {
  try {
    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('data', JSON.stringify(data));

    const res = await apiClient.post('/products/addons/', formData);
    return res.data;
  } catch (err) {
    console.error('Failed to create product with addons:', err);
    throw err;
  }
};

export const updateProductImage = async (productId: number, imageFile: File) => {
  const formData = new FormData();
  formData.append('image', imageFile);

  const response = await apiClient.patch(
    `/products/${productId}/image`,
    formData
  );
  return response.data;
};