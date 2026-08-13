import { api } from "@/lib/api";

export interface Submission {
  id: number;

  assignment: number;
  assignment_title: string;

  teacher_name?: string;
  class_name?: string;
  subject_name?: string;

  student: number;
  student_name: string;

  answer: string;

  submitted_at: string;
  updated_at?: string;

  status?: "SUBMITTED" | "LATE" | "GRADED";

  marks?: number | null;
  feedback?: string | null;

  max_marks?: number;
}

export interface CreateSubmissionPayload {
  assignment: number;
  answer: string;
}

export async function createSubmission(data: CreateSubmissionPayload) {
  const response = await api.post<Submission>("/submissions/", data);

  return response.data;
}

export async function getMySubmissions() {
  const response = await api.get("/submissions/");

  return Array.isArray(response.data)
    ? response.data
    : (response.data.results ?? []);
}

export async function getSubmissions() {
  const response = await api.get("/submissions/");

  return Array.isArray(response.data)
    ? response.data
    : (response.data.results ?? []);
}

export async function getSubmission(id: number) {
  const response = await api.get<Submission>(`/submissions/${id}/`);

  return response.data;
}

export interface GradeSubmissionPayload {
  marks: number;
  feedback: string;
}

export async function gradeSubmission(
  id: number,
  data: GradeSubmissionPayload,
) {
  const response = await api.post<Submission>(
    `/submissions/${id}/grade/`,
    data,
  );

  return response.data;
}
