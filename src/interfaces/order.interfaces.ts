import { OrderStatus } from './enums.interface';
import { OrderItem,CreateOrderItemDto } from './orderItem.interface';


export interface CreateOrderDto {
  userId: number;
  totalAmount: number;
  status?: OrderStatus;
  orderItems: CreateOrderItemDto[];
}

export interface UpdateOrderDto {
  totalAmount?: number;
  status?: OrderStatus;
  orderItems?: CreateOrderItemDto[];
}

export interface Order{
  id: number,
  userId: number,
  totalAmount: number,
  status: OrderStatus,
  createdAt: string;   
  updatedAt: string;
  orderItems: OrderItem[];
}