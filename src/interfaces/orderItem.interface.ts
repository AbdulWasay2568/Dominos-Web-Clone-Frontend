import { Product } from "./product.interface";

export interface CreateOrderItemDto {
  productId: number;
  quantity: number;
  addonOptions: number[];
}

export interface UpdateOrderItemDto {
  quantity?: number;
  addonOptions: number[];
}

export interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  product: Product
}