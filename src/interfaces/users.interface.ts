import { Role } from './enums.interface';

export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  role?: Role;
}

export interface UpdateUserDto {
  name?: string;
  email?: string;
  password?: string;
  role?: Role;
}
