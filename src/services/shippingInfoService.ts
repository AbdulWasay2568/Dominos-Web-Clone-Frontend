import { apiClient } from './axios';
import { CreateShippingInfoDto, UpdateShippingInfoDto } from '../interfaces/shippingInfo';

export const fetchShippingInfos = async () => {
  try {
    const res = await apiClient.get('/shipping-info');
    return res.data;
  } catch (err) {
    console.error('Failed to fetch shipping info:', err);
    throw err;
  }
};

export const fetchShippingInfoById = async (id: number) => {
  try {
    const res = await apiClient.get(`/shipping-info/${id}`);
    return res.data;
  } catch (err) {
    console.error(`Failed to fetch shipping info ${id}:`, err);
    throw err;
  }
};

export const createShippingInfo = async (data: CreateShippingInfoDto) => {
  try {
    const res = await apiClient.post('/shipping-info', data);
    return res.data;
  } catch (err) {
    console.error('Failed to create shipping info:', err);
    throw err;
  }
};

export const updateShippingInfo = async (id: number, data: UpdateShippingInfoDto) => {
  try {
    const res = await apiClient.put(`/shipping-info/${id}`, data);
    return res.data;
  } catch (err) {
    console.error(`Failed to update shipping info ${id}:`, err);
    throw err;
  }
};

export const deleteShippingInfo = async (id: number) => {
  try {
    const res = await apiClient.delete(`/shipping-info/${id}`);
    return res.data;
  } catch (err) {
    console.error(`Failed to delete shipping info ${id}:`, err);
    throw err;
  }
};
