import { api } from "@/lib/api";

export interface Assignment {
  id: number;
  teacher: number;
  teacher_name: string;
  class_group: number;
  class_name: string;
  subject: number;
  subject_name: string;
  title: string;
  description: string;
  deadline: string;
  max_marks: number;
  status: "DRAFT" | "PUBLISHED";
  created_at: string;
  updated_at: string;
}

export interface CreateAssignmentPayload {
  title: string;
  description: string;
  deadline: string;
  max_marks: number;
  subject: number;
  class_group: number;
  status?: "DRAFT" | "PUBLISHED";
}

/**
 * Get assignments for the current authenticated user.
 *
 * Backend decides what the user can see:
 * - TEACHER → own assignments
 * - STUDENT → assignments for student's class
 * - ADMIN → all assignments
 */
export async function getAssignments() {
  const response = await api.get("/assignments/");

  return Array.isArray(response.data)
    ? response.data
    : response.data.results ?? [];
}

/**
 * Student assignments.
 */
export async function getStudentAssignments(): Promise<Assignment[]> {
  const response = await api.get("/assignments/");

  if (Array.isArray(response.data)) {
    return response.data;
  }

  return response.data.results ?? [];
}

export async function getAssignment(
  id: number,
): Promise<Assignment> {
  const response = await api.get<Assignment>(
    `/assignments/${id}/`,
  );

  return response.data;
}

export async function createAssignment(
  data: CreateAssignmentPayload,
): Promise<Assignment> {
  const response = await api.post<Assignment>(
    "/assignments/",
    data,
  );

  return response.data;
}

export async function updateAssignment(
  id: number,
  data: Partial<CreateAssignmentPayload>,
): Promise<Assignment> {
  const response = await api.patch<Assignment>(
    `/assignments/${id}/`,
    data,
  );

  return response.data;
}

export async function deleteAssignment(
  id: number,
): Promise<void> {
  await api.delete(`/assignments/${id}/`);
}

export async function publishAssignment(
  id: number,
): Promise<Assignment> {
  const response = await api.patch<Assignment>(
    `/assignments/${id}/`,
    {
      status: "PUBLISHED",
    },
  );

  return response.data;
}