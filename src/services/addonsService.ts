import { apiClient } from './axios';
import { CreateAddonDto, UpdateAddonDto } from '../interfaces/addon';

export const fetchAddons = async () => {
  try {
    const res = await apiClient.get('/addons');
    return res.data;
  } catch (err) {
    console.error('Failed to fetch addons:', err);
    throw err;
  }
};

export const fetchAddonById = async (id: string) => {
  try {
    const res = await apiClient.get(`/addons/${id}`);
    return res.data;
  } catch (err) {
    console.error(`Failed to fetch addon ${id}:`, err);
    throw err;
  }
};

export const createAddon = async (data: CreateAddonDto) => {
  try {
    const res = await apiClient.post('/addons', data);
    return res.data;
  } catch (err) {
    console.error('Failed to create addon:', err);
    throw err;
  }
};

export const updateAddon = async (id: string, data: UpdateAddonDto) => {
  try {
    const res = await apiClient.put(`/addons/${id}`, data);
    return res.data;
  } catch (err) {
    console.error(`Failed to update addon ${id}:`, err);
    throw err;
  }
};

export const deleteAddon = async (id: string) => {
  try {
    const res = await apiClient.delete(`/addons/${id}`);
    return res.data;
  } catch (err) {
    console.error(`Failed to delete addon ${id}:`, err);
    throw err;
  }
};
