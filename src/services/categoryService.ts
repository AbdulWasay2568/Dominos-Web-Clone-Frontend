import { apiClient } from './axios';
import { CreateCategoryDto, UpdateCategoryDto } from '../interfaces/category.interface';

export const fetchCategories = async () => {
  try {
    const res = await apiClient.get('/categories');
    return res.data;
  } catch (err) {
    console.error('Failed to fetch categories:', err);
    throw err;
  }
};

export const fetchCategoryById = async (id: number) => {
  try {
    const res = await apiClient.get(`/categories/${id}`);
    return res.data;
  } catch (err) {
    console.error(`Failed to fetch category ${id}:`, err);
    throw err;
  }
};

export const createCategory = async (data: CreateCategoryDto) => {
  try {
    const res = await apiClient.post('/categories', data);
    return res.data;
  } catch (err) {
    console.error('Failed to create category:', err);
    throw err;
  }
};

export const updateCategory = async (id: number, data: UpdateCategoryDto) => {
  try {
    const res = await apiClient.put(`/categories/${id}`, data);
    return res.data;
  } catch (err) {
    console.error(`Failed to update category ${id}:`, err);
    throw err;
  }
};

export const deleteCategory = async (id: number) => {
  try {
    const res = await apiClient.delete(`/categories/${id}`);
    return res.data;
  } catch (err) {
    console.error(`Failed to delete category ${id}:`, err);
    throw err;
  }
};
