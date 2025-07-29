import { apiClient } from './axios';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export const registerUser = async (userData: {
  name: string;
  email: string;
  password: string;
  role: string;
}) => {
  try {
    const response = await apiClient.post('/auth/register', userData);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Registration failed:', error.response?.data);
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
    throw new Error('An unknown error occurred during registration');
  }
};

export const loginUser = async (credentials: {
  email: string;
  password: string;
}) => {
  try {
    const response = await apiClient.post('/auth/login', credentials);
    const token = response.data.token;

    const decodedToken = jwtDecode<{ id: string; role: string }>(token);
    return {id: decodedToken.id, role: decodedToken.role};

  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Login failed:', error.response?.data);
      throw new Error(error.response?.data?.message || 'Login failed');
    }
    throw new Error('An unknown error occurred during login');
  }
};
