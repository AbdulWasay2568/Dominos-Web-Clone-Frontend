export interface CreateCartItemDto {
  cartId: number;
  productId: number;
  quantity: number;
}

export interface UpdateCartItemDto {
  quantity?: number;
}
