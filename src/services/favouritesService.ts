import { apiClient } from './axios';
import {
  CreateFavouriteDto,
  UpdateFavouriteDto,
} from '../interfaces/favourite';

export const fetchFavourites = async () => {
  try {
    const res = await apiClient.get('/favourites');
    return res.data;
  } catch (err) {
    console.error('Failed to fetch favourites:', err);
    throw err;
  }
};

export const fetchFavouriteById = async (id: number) => {
  try {
    const res = await apiClient.get(`/favourites/${id}`);
    return res.data;
  } catch (err) {
    console.error(`Failed to fetch favourite ${id}:`, err);
    throw err;
  }
};

export const createFavourite = async (data: CreateFavouriteDto) => {
  try {
    const res = await apiClient.post('/favourites', data);
    return res.data;
  } catch (err) {
    console.error('Failed to create favourite:', err);
    throw err;
  }
};

export const updateFavourite = async (id: number, data: UpdateFavouriteDto) => {
  try {
    const res = await apiClient.put(`/favourites/${id}`, data);
    return res.data;
  } catch (err) {
    console.error(`Failed to update favourite ${id}:`, err);
    throw err;
  }
};

export const deleteFavourite = async (id: number) => {
  try {
    const res = await apiClient.delete(`/favourites/${id}`);
    return res.data;
  } catch (err) {
    console.error(`Failed to delete favourite ${id}:`, err);
    throw err;
  }
};
