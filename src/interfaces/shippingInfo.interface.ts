export interface CreateShippingInfoDto {
  orderId: number;
  houseNo: string;
  street: string;
  society: string;
  city: string;
  zipCode: string;
}

export interface UpdateShippingInfoDto {
  houseNo?: string;
  street?: string;
  society?: string;
  city?: string;
  zipCode?: string;
}
