import { apiClient } from './axios';
import { CreateAddressDto, UpdateAddressDto } from '../interfaces/address.interface';

export const fetchAddresses = async () => {
  try {
    const res = await apiClient.get('/addresses');
    return res.data;
  } catch (err) {
    console.error('Failed to fetch addresses:', err);
    throw err;
  }
};

export const fetchAddressById = async (id: number) => {
  try {
    const res = await apiClient.get(`/addresses/${id}`);
    return res.data;
  } catch (err) {
    console.error(`Failed to fetch address ${id}:`, err);
    throw err;
  }
};

export const createAddress = async (data: CreateAddressDto) => {
  try {
    const res = await apiClient.post('/addresses', data);
    return res.data;
  } catch (err) {
    console.error('Failed to create address:', err);
    throw err;
  }
};

export const updateAddress = async (id: number, data: UpdateAddressDto) => {
  try {
    const res = await apiClient.put(`/addresses/${id}`, data);
    return res.data;
  } catch (err) {
    console.error(`Failed to update address ${id}:`, err);
    throw err;
  }
};

export const deleteAddress = async (id: number) => {
  try {
    const res = await apiClient.delete(`/addresses/${id}`);
    return res.data;
  } catch (err) {
    console.error(`Failed to delete address ${id}:`, err);
    throw err;
  }
};
