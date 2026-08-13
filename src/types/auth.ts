export type UserRole = "ADMIN" | "TEACHER" | "STUDENT";

export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  role: UserRole;
}

export interface LoginResponse {
  access: string;
  refresh: string;
  user: User;
}