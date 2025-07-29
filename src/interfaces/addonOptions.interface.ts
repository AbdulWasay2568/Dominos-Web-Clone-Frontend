import { Addon } from "./addons.interface";

export interface CreateAddonOptionDto {
  addonId: number;
  optionName: string;
  additionalPrice?: number;
}

export interface UpdateAddonOptionDto {
  optionName?: string;
  additionalPrice?: number;
}

export interface AddonOption {
  id: number;
  addonId: number;
  optionName: string;
  additionalPrice: number;
  createdAt: string;
  updatedAt: string;
  addon: Addon;
}