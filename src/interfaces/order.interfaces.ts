import { OrderStatus } from './enums.interface';

export interface CreateOrderDto {
  userId: number;
  totalAmount: number;
  status?: OrderStatus;
}

export interface UpdateOrderDto {
  totalAmount?: number;
  status?: OrderStatus;
}
