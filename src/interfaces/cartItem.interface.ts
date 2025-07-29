import { AddonOption } from "./addonOptions.interface";
import { Product } from "./product.interface";

export interface CreateCartItemDto {
  cartId: number;
  productId: number;
  quantity: number;
}

export interface UpdateCartItemDto {
  quantity?: number;
}

export interface CartItem {
  id: number;
  cartId: number;
  productId: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  product: Product;
  addonOptions: AddonOption[];
}
