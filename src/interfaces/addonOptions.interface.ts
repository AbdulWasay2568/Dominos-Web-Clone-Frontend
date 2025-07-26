export interface CreateAddonOptionDto {
  addonId: number;
  optionName: string;
  additionalPrice?: number;
}

export interface UpdateAddonOptionDto {
  optionName?: string;
  additionalPrice?: number;
}
