import { api } from "@/lib/api";

export interface Teacher {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  role: "TEACHER";
}

export interface TeacherClass {
  id: number;
  teacher: number;
  teacher_name: string;
  class_group: number;
  class_name: string;
}

export interface TeacherSubject {
  id: number;
  teacher: number;
  teacher_name: string;
  subject: number;
  subject_name: string;
  class_group: number;
  class_name: string;
}

export interface AcademicClass {
  id: number;
  name: string;
  code: string;
}

export interface Subject {
  id: number;
  name: string;
  code: string;
}

function getData<T>(data: T[] | { results?: T[] }) {
  return Array.isArray(data)
    ? data
    : data.results ?? [];
}

/* -----------------------------
   Teacher Classes
----------------------------- */

export async function getTeacherClasses() {
  const response = await api.get(
    "/academics/teacher-classes/",
  );

  return getData<TeacherClass>(response.data);
}

export async function assignTeacherClass(
  teacher: number,
  class_group: number,
) {
  const response = await api.post(
    "/academics/teacher-classes/",
    {
      teacher,
      class_group,
    },
  );

  return response.data;
}

export async function updateTeacherClass(
  id: number,
  teacher: number,
  class_group: number,
) {
  const response = await api.patch(
    `/academics/teacher-classes/${id}/`,
    {
      teacher,
      class_group,
    },
  );

  return response.data;
}

export async function deleteTeacherClass(
  id: number,
) {
  await api.delete(
    `/academics/teacher-classes/${id}/`,
  );
}

/* -----------------------------
   Teacher Subjects
----------------------------- */

export async function getTeacherSubjects() {
  const response = await api.get(
    "/academics/teacher-subjects/",
  );

  return getData<TeacherSubject>(response.data);
}

export async function assignTeacherSubject(
  teacher: number,
  subject: number,
  class_group: number,
) {
  const response = await api.post(
    "/academics/teacher-subjects/",
    {
      teacher,
      subject,
      class_group,
    },
  );

  return response.data;
}

export async function updateTeacherSubject(
  id: number,
  teacher: number,
  subject: number,
  class_group: number,
) {
  const response = await api.patch(
    `/academics/teacher-subjects/${id}/`,
    {
      teacher,
      subject,
      class_group,
    },
  );

  return response.data;
}

export async function deleteTeacherSubject(
  id: number,
) {
  await api.delete(
    `/academics/teacher-subjects/${id}/`,
  );
}

/* -----------------------------
   Classes / Subjects
----------------------------- */

export async function getClasses() {
  const response = await api.get(
    "/academics/classes/",
  );

  return getData<AcademicClass>(response.data);
}

export async function getSubjects() {
  const response = await api.get(
    "/academics/subjects/",
  );

  return getData<Subject>(response.data);
}

export async function getTeachers(): Promise<Teacher[]> {
  const response = await api.get("/auth/admin/teachers/");

  return Array.isArray(response.data)
    ? response.data
    : response.data.results ?? [];
}