export interface CreateFavouriteDto {
  userId: number;
  productId: number;
}

export interface Favourite{
  id: number;
  userId: number;
  productId: number;
}