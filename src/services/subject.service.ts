import { api } from "@/lib/api";

export interface Subject {
  id: number;
  name: string;
  code: string;
  teacher_count?: number;
}

export async function getSubjects(): Promise<Subject[]> {
  const response = await api.get("/academics/subjects/");

  return Array.isArray(response.data)
    ? response.data
    : response.data.results ?? [];
}

export async function createSubject(data: {
  name: string;
  code: string;
}) {
  const response = await api.post(
    "/academics/subjects/",
    data,
  );

  return response.data;
}

export async function updateSubject(
  id: number,
  data: Partial<{
    name: string;
    code: string;
  }>,
) {
  const response = await api.patch(
    `/academics/subjects/${id}/`,
    data,
  );

  return response.data;
}

export async function deleteSubject(id: number) {
  await api.delete(
    `/academics/subjects/${id}/`,
  );
}