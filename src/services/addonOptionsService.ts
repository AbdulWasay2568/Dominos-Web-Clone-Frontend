import { apiClient } from './axios';
import {
  CreateAddonOptionDto,
  UpdateAddonOptionDto,
} from '../interfaces/addonOptions.interface';

export const fetchAddonOptions = async () => {
  try {
    const res = await apiClient.get('/addon-options');
    return res.data;
  } catch (err) {
    console.error('Failed to fetch addon options:', err);
    throw err;
  }
};

export const fetchAddonOptionById = async (id: number) => {
  try {
    const res = await apiClient.get(`/addon-options/${id}`);
    return res.data;
  } catch (err) {
    console.error(`Failed to fetch addon option ${id}:`, err);
    throw err;
  }
};

export const createAddonOption = async (data: CreateAddonOptionDto) => {
  try {
    const res = await apiClient.post('/addon-options', data);
    return res.data;
  } catch (err) {
    console.error('Failed to create addon option:', err);
    throw err;
  }
};

export const updateAddonOption = async (
  id: number,
  data: UpdateAddonOptionDto
) => {
  try {
    const res = await apiClient.put(`/addon-options/${id}`, data);
    return res.data;
  } catch (err) {
    console.error(`Failed to update addon option ${id}:`, err);
    throw err;
  }
};

export const deleteAddonOption = async (id: number) => {
  try {
    const res = await apiClient.delete(`/addon-options/${id}`);
    return res.data;
  } catch (err) {
    console.error(`Failed to delete addon option ${id}:`, err);
    throw err;
  }
};
