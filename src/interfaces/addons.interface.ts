import { AddonOption } from "./addonOptions.interface";

export interface CreateAddonDto {
  productId: number;
  name: string;
}

export interface UpdateAddonDto {
  name?: string;
}

export interface Addon {
  id: number;
  productId: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  options: AddonOption[];
}
