import { api } from "@/lib/api";

export interface Student {
  id: number;
  username: string;
  email?: string;
  first_name?: string;
  last_name?: string;

  class_id?: number | null;
  class_name?: string | null;
  class_code?: string | null;
}

export interface StudentClass {
  id: number;
  student: number;
  class_group: number;
  class_name?: string;
  class_code?: string;
}

export async function getStudents(): Promise<Student[]> {
  const response = await api.get(
    "/auth/admin/students/",
  );

  return Array.isArray(response.data)
    ? response.data
    : response.data.results ?? [];
}

export async function getStudent(
  id: number,
): Promise<Student> {
  const response = await api.get(
    `/auth/admin/students/${id}/`,
  );

  return response.data;
}

export async function deleteStudent(id: number) {
  await api.delete(
    `/auth/admin/students/${id}/`,
  );
}

export async function assignStudentClass(
  studentId: number,
  classId: number
) {
  const response = await api.patch(
    `/auth/admin/students/${studentId}/class/`,
    {
      class_id: classId,
    }
  );

  return response.data;
}

export async function getMyStudentClass(): Promise<StudentClass[]> {
  const response = await api.get(
    "/academics/student-classes/",
  );

  return Array.isArray(response.data)
    ? response.data
    : response.data.results ?? [];
}