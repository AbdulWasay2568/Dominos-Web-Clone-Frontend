import { Addon } from "./addons.interface";

export interface CreateProductDto {
  name: string;
  description: string;
  price: number;
  categoryId: number;
}

export interface UpdateProductDto {
  name?: string;
  description?: string;
  price?: number;
  categoryId?: number;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  categoryId: number;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  addons: Addon[];
}

export interface CreateProductWithAddonsDto {
  name: string;
  description: string;
  price: number;
  categoryId: number;
  addons?: {
    name: string;
    options: {
      optionName: string;
      additionalPrice: number;
    }[];
  }[];
}

