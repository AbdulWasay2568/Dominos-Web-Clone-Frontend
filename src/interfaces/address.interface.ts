export interface CreateAddressDto {
  userId: number;
  houseNo: string;
  street: string;
  society: string;
  city: string;
  zipCode: string;
}

export interface UpdateAddressDto {
  houseNo?: string;
  street?: string;
  society?: string;
  city?: string;
  zipCode?: string;
}
