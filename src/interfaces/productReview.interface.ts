export interface CreateProductReviewDto {
  productId: number;
  userId: number;
  rating: number;
  comment: string;
}

export interface UpdateProductReviewDto {
  rating?: number;
  comment?: string;
}