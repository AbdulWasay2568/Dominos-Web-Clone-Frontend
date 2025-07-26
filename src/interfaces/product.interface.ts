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
