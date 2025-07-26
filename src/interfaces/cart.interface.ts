export interface CreateCartDto {
  userId: number;
}

export interface UpdateCartDto {
  userId?: number;
  productId?: number;
  quantity?: number;
}