export interface CreateOrderItemDto {
  orderId: number;
  productId: number;
  quantity: number;
}

export interface UpdateOrderItemDto {
  quantity?: number;
}
