import { CartItem } from './cartItem.interface';

export interface CreateCartDto {
  userId: number;
}

export interface UpdateCartDto {
  userId?: number;
  productId?: number;
  quantity?: number;
}

export interface AddItemToCartDto {
  userId: number;
  productId: number;
  quantity: number;
  addonOptionIds?: number[];
}

export interface Cart {
  id: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
  cartItems: CartItem[];
}
