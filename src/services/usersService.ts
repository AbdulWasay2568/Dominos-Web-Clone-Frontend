import { apiClient } from './axios';
import { CreateUserDto, UpdateUserDto } from '../interfaces/users.interface';

export const fetchUsers = async () => {
  try {
    const res = await apiClient.get('/users');
    return res.data;
  } catch (err) {
    console.error('Failed to fetch users:', err);
    throw err;
  }
};

export const fetchUserById = async (id: number) => {
  try {
    const res = await apiClient.get(`/users/${id}`);
    return res.data.user;
  } catch (err) {
    console.error(`Failed to fetch user ${id}:`, err);
    throw err;
  }
};

export const createUser = async (data: CreateUserDto) => {
  try {
    const res = await apiClient.post('/users', data);
    return res.data;
  } catch (err) {
    console.error('Failed to create user:', err);
    throw err;
  }
};

export const updateUser = async (id: number, data: UpdateUserDto) => {
  try {
    const res = await apiClient.put(`/users/${id}`, data);
    return res.data;
  } catch (err) {
    console.error(`Failed to update user ${id}:`, err);
    throw err;
  }
};

export const deleteUser = async (id: number) => {
  try {
    const res = await apiClient.delete(`/users/${id}`);
    return res.data;
  } catch (err) {
    console.error(`Failed to delete user ${id}:`, err);
    throw err;
  }
};

export const updateUserImage = async (userId: number, imageFile: File) => {
  const formData = new FormData();
  formData.append('image', imageFile);

  const response = await apiClient.patch(
    `/users/${userId}/image`,
    formData
  );
  return response.data;
};