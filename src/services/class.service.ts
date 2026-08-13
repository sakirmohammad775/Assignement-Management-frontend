import { api } from "@/lib/api";

export interface ClassGroup {
  id: number;
  name: string;
  code: string;
  student_count?: number;
}
export interface Class {
  id: number;
  name: string;
  code: string;
  student_count?: number;
}

export async function getClasses(): Promise<ClassGroup[]> {
  const response = await api.get("/academics/classes/");

  return Array.isArray(response.data)
    ? response.data
    : response.data.results ?? [];
}

export async function getClass(
  id: number,
): Promise<ClassGroup> {
  const response = await api.get(
    `/academics/classes/${id}/`,
  );

  return response.data;
}

export async function createClass(data: {
  name: string;
  code: string;
}) {
  const response = await api.post(
    "/academics/classes/",
    data,
  );

  return response.data;
}

export async function updateClass(
  id: number,
  data: Partial<{
    name: string;
    code: string;
  }>,
) {
  const response = await api.patch(
    `/academics/classes/${id}/`,
    data,
  );

  return response.data;
}

export async function deleteClass(id: number) {
  await api.delete(
    `/academics/classes/${id}/`,
  );
}