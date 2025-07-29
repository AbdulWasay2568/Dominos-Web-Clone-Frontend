import { apiClient } from './axios';
import { CreatePaymentDto, UpdatePaymentDto } from '../interfaces/payment.interface';

export const fetchPayments = async () => {
  try {
    const res = await apiClient.get('/payments');
    return res.data;
  } catch (err) {
    console.error('Failed to fetch payments:', err);
    throw err;
  }
};

export const fetchPaymentById = async (id: number) => {
  try {
    const res = await apiClient.get(`/payments/${id}`);
    return res.data;
  } catch (err) {
    console.error(`Failed to fetch payment ${id}:`, err);
    throw err;
  }
};

export const createPayment = async (data: CreatePaymentDto) => {
  try {
    const res = await apiClient.post('/payments', data);
    return res.data;
  } catch (err) {
    console.error('Failed to create payment:', err);
    throw err;
  }
};

export const updatePayment = async (id: number, data: UpdatePaymentDto) => {
  try {
    const res = await apiClient.put(`/payments/${id}`, data);
    return res.data;
  } catch (err) {
    console.error(`Failed to update payment ${id}:`, err);
    throw err;
  }
};

export const deletePayment = async (id: number) => {
  try {
    const res = await apiClient.delete(`/payments/${id}`);
    return res.data;
  } catch (err) {
    console.error(`Failed to delete payment ${id}:`, err);
    throw err;
  }
};
