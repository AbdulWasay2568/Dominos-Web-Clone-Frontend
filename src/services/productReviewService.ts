import { apiClient } from './axios';
import {
  CreateProductReviewDto,
  UpdateProductReviewDto,
} from '../interfaces/productReview.interface';

export const fetchProductReviews = async () => {
  try {
    const res = await apiClient.get('/product-reviews');
    return res.data;
  } catch (err) {
    console.error('Failed to fetch product reviews:', err);
    throw err;
  }
};

export const fetchProductReviewById = async (id: number) => {
  try {
    const res = await apiClient.get(`/product-reviews/${id}`);
    return res.data;
  } catch (err) {
    console.error(`Failed to fetch product review ${id}:`, err);
    throw err;
  }
};

export const createProductReview = async (data: CreateProductReviewDto) => {
  try {
    const res = await apiClient.post('/product-reviews', data);
    return res.data;
  } catch (err) {
    console.error('Failed to create product review:', err);
    throw err;
  }
};

export const updateProductReview = async (
  id: number,
  data: UpdateProductReviewDto
) => {
  try {
    const res = await apiClient.put(`/product-reviews/${id}`, data);
    return res.data;
  } catch (err) {
    console.error(`Failed to update product review ${id}:`, err);
    throw err;
  }
};

export const deleteProductReview = async (id: number) => {
  try {
    const res = await apiClient.delete(`/product-reviews/${id}`);
    return res.data;
  } catch (err) {
    console.error(`Failed to delete product review ${id}:`, err);
    throw err;
  }
};
