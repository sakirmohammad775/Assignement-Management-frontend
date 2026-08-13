import { api } from "@/lib/api";

export type UserRole = "ADMIN" | "TEACHER" | "STUDENT";

export interface AdminUser {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  role: UserRole;
}

export interface CreateUserPayload {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  role: UserRole;
  password: string;
}

export interface UpdateUserPayload {
  username?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  role?: UserRole;
  password?: string;
}

export interface AdminStudent {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  role: "STUDENT";
  class_group?: number | null;
  class_name?: string | null;
}


export async function getUsers(): Promise<AdminUser[]> {
  const response = await api.get("/auth/admin/users/");

  return Array.isArray(response.data)
    ? response.data
    : response.data.results ?? [];
}

export async function getUser(id: number): Promise<AdminUser> {
  const response = await api.get(`/auth/admin/users/${id}/`);

  return response.data;
}

export async function createUser(
  data: CreateUserPayload,
): Promise<AdminUser> {
  const response = await api.post(
    "/auth/admin/users/",
    data,
  );

  return response.data;
}

export async function updateUser(
  id: number,
  data: UpdateUserPayload,
): Promise<AdminUser> {
  const response = await api.patch(
    `/auth/admin/users/${id}/`,
    data,
  );

  return response.data;
}

export async function deleteUser(id: number) {
  await api.delete(`/auth/admin/users/${id}/`);
}


export async function getAdminStudents(): Promise<AdminStudent[]> {
  const response = await api.get("/auth/admin/students/");

  return Array.isArray(response.data)
    ? response.data
    : response.data?.results ?? [];
}

export async function createStudent(data: {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
}) {
  const response = await api.post(
    "/auth/admin/students/",
    data,
  );

  return response.data as AdminStudent;
}

export async function updateStudent(
  id: number,
  data: {
    username?: string;
    email?: string;
    first_name?: string;
    last_name?: string;
    password?: string;
  },
) {
  const response = await api.patch(
    `/auth/admin/students/${id}/`,
    data,
  );

  return response.data as AdminStudent;
}

export async function deleteStudent(
  id: number,
): Promise<void> {
  await api.delete(
    `/auth/admin/students/${id}/`,
  );
}

export async function assignStudentClass(
  studentId: number,
  classId: number,
) {
  const response = await api.patch(
    `/auth/admin/students/${studentId}/class/`,
    {
      class_id: classId,
    },
  );

  return response.data;
}