import {api} from "@/lib/api";

export interface AcademicClass {
  id: number;
  name: string;
  code: string;
  student_count?: number;
}

export interface Subject {
  id: number;
  name: string;
  code: string;
  teacher_count?: number;
}

export async function getClasses(): Promise<AcademicClass[]> {
  const response = await api.get(
    "/academics/classes/",
  );

  return Array.isArray(response.data)
    ? response.data
    : response.data.results ?? [];
}

export async function getSubjects(): Promise<Subject[]> {
  const response = await api.get(
    "/academics/subjects/",
  );

  return Array.isArray(response.data)
    ? response.data
    : response.data.results ?? [];
}