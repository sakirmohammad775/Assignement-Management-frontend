"use client";

import { useEffect, useState } from "react";
import {
  GraduationCap,
  Loader2,
  Pencil,
  Plus,
  Trash2,
  X,
  Users,
} from "lucide-react";

import {
  getAdminStudents,
  createStudent,
  updateStudent,
  deleteStudent,
  assignStudentClass,
  type AdminStudent,
} from "@/services/user.service";

import {
  getClasses,
  type ClassGroup,
} from "@/services/class.service";

interface StudentForm {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  class_group: string;
}

const emptyForm: StudentForm = {
  first_name: "",
  last_name: "",
  username: "",
  email: "",
  password: "",
  class_group: "",
};

export default function AdminStudentsPage() {
  const [students, setStudents] = useState<AdminStudent[]>([]);
  const [classes, setClasses] = useState<ClassGroup[]>([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] =
    useState<AdminStudent | null>(null);

  const [form, setForm] = useState<StudentForm>(
    emptyForm,
  );

  // ----------------------------------
  // Load students + classes
  // ----------------------------------

  async function loadData() {
    try {
      setLoading(true);
      setError("");

      const [studentsData, classesData] =
        await Promise.all([
          getAdminStudents(),
          getClasses(),
        ]);

      setStudents(studentsData);
      setClasses(classesData);
    } catch (err) {
      console.error("STUDENTS PAGE ERROR:", err);
      setError("Failed to load students.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  // ----------------------------------
  // Open Add Modal
  // ----------------------------------

  function openAddModal() {
    setEditingStudent(null);
    setForm(emptyForm);
    setError("");
    setSuccess("");
    setModalOpen(true);
  }

  // ----------------------------------
  // Open Edit Modal
  // ----------------------------------

  function openEditModal(student: AdminStudent) {
    setEditingStudent(student);

    setForm({
      first_name: student.first_name ?? "",
      last_name: student.last_name ?? "",
      username: student.username ?? "",
      email: student.email ?? "",
      password: "",
      class_group:
        student.class_group?.toString() ?? "",
    });

    setError("");
    setSuccess("");
    setModalOpen(true);
  }

  // ----------------------------------
  // Close Modal
  // ----------------------------------

  function closeModal() {
    if (saving) return;

    setModalOpen(false);
    setEditingStudent(null);
    setForm(emptyForm);
  }

  // ----------------------------------
  // Form change
  // ----------------------------------

  function handleChange(
    field: keyof StudentForm,
    value: string,
  ) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  // ----------------------------------
  // Create / Update
  // ----------------------------------

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      if (!form.first_name.trim()) {
        setError("First name is required.");
        return;
      }

      if (!form.username.trim()) {
        setError("Username is required.");
        return;
      }

      if (!form.email.trim()) {
        setError("Email is required.");
        return;
      }

      // -------------------------------
      // CREATE
      // -------------------------------

      if (!editingStudent) {
        if (!form.password.trim()) {
          setError("Password is required.");
          return;
        }

        const student = await createStudent({
          first_name: form.first_name.trim(),
          last_name: form.last_name.trim(),
          username: form.username.trim(),
          email: form.email.trim(),
          password: form.password,
        });

        // Assign class after creating student
        if (form.class_group) {
          await assignStudentClass(
            student.id,
            Number(form.class_group),
          );
        }
      }

      // -------------------------------
      // UPDATE
      // -------------------------------

      else {
        const payload: {
          first_name: string;
          last_name: string;
          username: string;
          email: string;
          password?: string;
        } = {
          first_name: form.first_name.trim(),
          last_name: form.last_name.trim(),
          username: form.username.trim(),
          email: form.email.trim(),
        };

        // Only send password if admin entered one
        if (form.password.trim()) {
          payload.password = form.password;
        }

        await updateStudent(
          editingStudent.id,
          payload,
        );

        // Update class separately
        if (form.class_group) {
          await assignStudentClass(
            editingStudent.id,
            Number(form.class_group),
          );
        }
      }

      setSuccess(
        editingStudent
          ? "Student updated successfully."
          : "Student created successfully.",
      );

      await loadData();

      setTimeout(() => {
        setModalOpen(false);
        setEditingStudent(null);
        setForm(emptyForm);
        setSuccess("");
      }, 700);
    } catch (err: any) {
      console.error("SAVE STUDENT ERROR:", err);

      const data = err?.response?.data;

      if (typeof data === "object") {
        const firstError = Object.values(data)
          .flat()
          .find(
            (value) => typeof value === "string",
          );

        setError(
          firstError?.toString() ||
            "Failed to save student.",
        );
      } else {
        setError("Failed to save student.");
      }
    } finally {
      setSaving(false);
    }
  }

  // ----------------------------------
  // Delete
  // ----------------------------------

  async function handleDelete(id: number) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this student?",
    );

    if (!confirmed) return;

    try {
      setError("");
      setSuccess("");

      await deleteStudent(id);

      setStudents((previous) =>
        previous.filter(
          (student) => student.id !== id,
        ),
      );

      setSuccess("Student deleted successfully.");

      setTimeout(() => {
        setSuccess("");
      }, 2000);
    } catch (err) {
      console.error("DELETE STUDENT ERROR:", err);
      setError("Failed to delete student.");
    }
  }

  // ----------------------------------
  // Loading
  // ----------------------------------

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex items-center gap-2 text-slate-500">
          <Loader2
            size={20}
            className="animate-spin"
          />
          Loading students...
        </div>
      </div>
    );
  }

  // ----------------------------------
  // UI
  // ----------------------------------

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-50 text-[#6b1d2f]">
              <GraduationCap size={23} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Students
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Manage students and their class assignments.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#6b1d2f] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
        >
          <Plus size={18} />
          Add Student
        </button>
      </div>

      {/* Alerts */}
      {error && (
        <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {success && (
        <div className="mt-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          {success}
        </div>
      )}

      {/* Summary */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Total Students
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {students.length}
              </p>
            </div>

            <div className="rounded-lg bg-rose-50 p-3 text-[#6b1d2f]">
              <Users size={21} />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Assigned to Class
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {
                  students.filter(
                    (student) =>
                      student.class_group,
                  ).length
                }
              </p>
            </div>

            <div className="rounded-lg bg-green-50 p-3 text-green-600">
              <GraduationCap size={21} />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Available Classes
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {classes.length}
              </p>
            </div>

            <div className="rounded-lg bg-amber-50 p-3 text-amber-600">
              <Users size={21} />
            </div>
          </div>
        </div>
      </div>

      {/* Student Table */}
      <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px]">
            <thead className="border-b border-slate-200 bg-slate-50">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Student
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Username
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Email
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Class
                </th>

                <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {students.map((student) => (
                <tr
                  key={student.id}
                  className="transition hover:bg-slate-50"
                >
                  {/* Student */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-50 font-semibold text-[#6b1d2f]">
                        {(
                          student.first_name?.[0] ||
                          student.username?.[0] ||
                          "S"
                        ).toUpperCase()}
                      </div>

                      <div>
                        <p className="font-medium text-slate-900">
                          {student.first_name}{" "}
                          {student.last_name}
                        </p>

                        <p className="text-xs text-slate-400">
                          Student #{student.id}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Username */}
                  <td className="px-5 py-4 text-sm text-slate-600">
                    @{student.username}
                  </td>

                  {/* Email */}
                  <td className="px-5 py-4 text-sm text-slate-600">
                    {student.email}
                  </td>

                  {/* Class */}
                  <td className="px-5 py-4">
                    {student.class_name ? (
                      <span className="rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-[#6b1d2f]">
                        {student.class_name}
                      </span>
                    ) : (
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
                        Not assigned
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() =>
                          openEditModal(student)
                        }
                        className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-50 hover:text-[#6b1d2f]"
                        title="Edit student"
                      >
                        <Pencil size={17} />
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(student.id)
                        }
                        className="rounded-lg border border-red-200 p-2 text-red-500 transition hover:bg-red-50"
                        title="Delete student"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {students.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-5 py-14 text-center"
                  >
                    <Users
                      size={40}
                      className="mx-auto text-slate-300"
                    />

                    <p className="mt-3 font-medium text-slate-700">
                      No students found
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      Add your first student to get started.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  {editingStudent
                    ? "Edit Student"
                    : "Add Student"}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {editingStudent
                    ? "Update student information and class."
                    : "Create a new student account."}
                </p>
              </div>

              <button
                onClick={closeModal}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={20} />
              </button>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="max-h-[75vh] overflow-y-auto p-6"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                {/* First Name */}
                <div>
                  <label className="text-sm font-medium text-slate-700">
                    First Name
                  </label>

                  <input
                    value={form.first_name}
                    onChange={(event) =>
                      handleChange(
                        "first_name",
                        event.target.value,
                      )
                    }
                    className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    placeholder="John"
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Last Name
                  </label>

                  <input
                    value={form.last_name}
                    onChange={(event) =>
                      handleChange(
                        "last_name",
                        event.target.value,
                      )
                    }
                    className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    placeholder="Doe"
                  />
                </div>

                {/* Username */}
                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Username
                  </label>

                  <input
                    value={form.username}
                    onChange={(event) =>
                      handleChange(
                        "username",
                        event.target.value,
                      )
                    }
                    className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    placeholder="john.doe"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Email
                  </label>

                  <input
                    type="email"
                    value={form.email}
                    onChange={(event) =>
                      handleChange(
                        "email",
                        event.target.value,
                      )
                    }
                    className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    placeholder="john@example.com"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Password
                  </label>

                  <input
                    type="password"
                    value={form.password}
                    onChange={(event) =>
                      handleChange(
                        "password",
                        event.target.value,
                      )
                    }
                    className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    placeholder={
                      editingStudent
                        ? "Leave blank to keep current"
                        : "••••••••"
                    }
                  />

                  {editingStudent && (
                    <p className="mt-1 text-xs text-slate-400">
                      Leave blank if you do not want to
                      change the password.
                    </p>
                  )}
                </div>

                {/* Class */}
                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Class
                  </label>

                  <select
                    value={form.class_group}
                    onChange={(event) =>
                      handleChange(
                        "class_group",
                        event.target.value,
                      )
                    }
                    className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  >
                    <option value="">
                      Select class
                    </option>

                    {classes.map((classGroup) => (
                      <option
                        key={classGroup.id}
                        value={classGroup.id}
                      >
                        {classGroup.name} (
                        {classGroup.code})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Form Error */}
              {error && (
                <div className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              {/* Actions */}
              <div className="mt-6 flex justify-end gap-3 border-t border-slate-100 pt-5">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#6b1d2f] px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving && (
                    <Loader2
                      size={17}
                      className="animate-spin"
                    />
                  )}

                  {editingStudent
                    ? "Save Changes"
                    : "Create Student"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}