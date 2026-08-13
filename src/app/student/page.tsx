"use client";

import { useEffect, useMemo, useState } from "react";
import {
  GraduationCap,
  Loader2,
  Search,
  Users,
  X,
  Trash2,
  Pencil,
} from "lucide-react";

import {
  getStudents,
  deleteStudent,
  assignStudentClass,
  type Student,
} from "@/services/student.service";

import {
  getClasses,
  type Class,
} from "@/services/class.service";

export default function AdminStudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);

  const [loading, setLoading] = useState(true);
  const [classesLoading, setClassesLoading] = useState(true);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [search, setSearch] = useState("");

  const [selectedStudent, setSelectedStudent] =
    useState<Student | null>(null);

  const [selectedClassId, setSelectedClassId] =
    useState("");

  const [assigning, setAssigning] = useState(false);

  const [deletingId, setDeletingId] =
    useState<number | null>(null);

  /*
   * =========================================================
   * LOAD STUDENTS
   * =========================================================
   */

  async function loadStudents() {
    try {
      setLoading(true);
      setError("");

      const data = await getStudents();

      setStudents(data);
    } catch (error) {
      console.error("STUDENTS ERROR:", error);
      setError("Failed to load students.");
    } finally {
      setLoading(false);
    }
  }

  /*
   * =========================================================
   * LOAD CLASSES
   * =========================================================
   */

  async function loadClasses() {
    try {
      setClassesLoading(true);

      const data = await getClasses();

      setClasses(data);
    } catch (error) {
      console.error("CLASSES ERROR:", error);
      setError("Failed to load classes.");
    } finally {
      setClassesLoading(false);
    }
  }

  /*
   * =========================================================
   * INITIAL LOAD
   * =========================================================
   */

  useEffect(() => {
    loadStudents();
    loadClasses();
  }, []);

  /*
   * =========================================================
   * SEARCH
   * =========================================================
   */

  const filteredStudents = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return students;
    }

    return students.filter((student) => {
      return (
        student.username?.toLowerCase().includes(query) ||
        student.email?.toLowerCase().includes(query) ||
        student.first_name?.toLowerCase().includes(query) ||
        student.last_name?.toLowerCase().includes(query)
      );
    });
  }, [students, search]);

  /*
   * =========================================================
   * OPEN ASSIGN CLASS MODAL
   * =========================================================
   */

  function openAssignModal(student: Student) {
    setSelectedStudent(student);

    /*
     * If student already has a class,
     * show that class as selected.
     */
    if (student.class_id) {
      setSelectedClassId(String(student.class_id));
    } else {
      setSelectedClassId("");
    }

    setError("");
    setSuccess("");
  }

  /*
   * =========================================================
   * CLOSE MODAL
   * =========================================================
   */

  function closeAssignModal() {
    if (assigning) return;

    setSelectedStudent(null);
    setSelectedClassId("");
  }

  /*
   * =========================================================
   * ASSIGN / REASSIGN CLASS
   * =========================================================
   */

  async function handleAssignClass() {
    if (!selectedStudent) {
      return;
    }

    if (!selectedClassId) {
      setError("Please select a class.");
      return;
    }

    try {
      setAssigning(true);
      setError("");
      setSuccess("");

      await assignStudentClass(
        selectedStudent.id,
        Number(selectedClassId)
      );

      setSuccess("Class assigned successfully.");

      /*
       * Refresh students so the UI immediately
       * displays the new class.
       */
      await loadStudents();

      /*
       * Close modal after successful assignment.
       */
      setTimeout(() => {
        setSelectedStudent(null);
        setSelectedClassId("");
        setSuccess("");
      }, 700);
    } catch (error) {
      console.error("ASSIGN CLASS ERROR:", error);

      setError("Failed to assign class.");
    } finally {
      setAssigning(false);
    }
  }

  /*
   * =========================================================
   * DELETE STUDENT
   * =========================================================
   */

  async function handleDeleteStudent(student: Student) {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${student.username}?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(student.id);
      setError("");

      await deleteStudent(student.id);

      setStudents((current) =>
        current.filter(
          (item) => item.id !== student.id
        )
      );

      setSuccess("Student deleted successfully.");

      setTimeout(() => {
        setSuccess("");
      }, 2000);
    } catch (error) {
      console.error("DELETE STUDENT ERROR:", error);

      setError("Failed to delete student.");
    } finally {
      setDeletingId(null);
    }
  }

  /*
   * =========================================================
   * LOADING
   * =========================================================
   */

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Loader2
            size={20}
            className="animate-spin"
          />
          Loading students...
        </div>
      </div>
    );
  }

  /*
   * =========================================================
   * PAGE
   * =========================================================
   */

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <GraduationCap size={22} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Students
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Manage students and assign them to classes.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 shadow-sm">
          <Users
            size={18}
            className="text-slate-400"
          />

          <span className="text-sm font-medium text-slate-700">
            {students.length} Students
          </span>
        </div>
      </div>

      {/* =====================================================
          ERROR
      ====================================================== */}

      {error && (
        <div className="mt-6 flex items-center justify-between rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <span>{error}</span>

          <button
            onClick={() => setError("")}
            className="rounded-md p-1 hover:bg-red-100"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* =====================================================
          SUCCESS
      ====================================================== */}

      {success && (
        <div className="mt-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
          {success}
        </div>
      )}

      {/* =====================================================
          SEARCH
      ====================================================== */}

      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="relative max-w-md">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search students..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
          />
        </div>
      </div>

      {/* =====================================================
          STUDENTS TABLE
      ====================================================== */}

      <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        {filteredStudents.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <Users
              size={40}
              className="mx-auto text-slate-300"
            />

            <h2 className="mt-4 font-semibold text-slate-900">
              No students found
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Try changing your search.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead className="border-b border-slate-200 bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Student
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Email
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Class
                  </th>

                  <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredStudents.map((student) => (
                  <tr
                    key={student.id}
                    className="transition hover:bg-slate-50"
                  >
                    {/* Student */}

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-50 font-semibold text-indigo-600">
                          {(
                            student.first_name?.[0] ||
                            student.username?.[0] ||
                            "S"
                          ).toUpperCase()}
                        </div>

                        <div>
                          <p className="font-medium text-slate-900">
                            {student.first_name ||
                            student.last_name
                              ? `${student.first_name ?? ""} ${
                                  student.last_name ?? ""
                                }`.trim()
                              : student.username}
                          </p>

                          <p className="text-xs text-slate-500">
                            @{student.username}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Email */}

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {student.email || "—"}
                    </td>

                    {/* Class */}

                    <td className="px-6 py-4">
                      {student.class_name ? (
                        <div>
                          <p className="font-medium text-slate-800">
                            {student.class_name}
                          </p>

                          {student.class_code && (
                            <p className="text-xs text-slate-500">
                              {student.class_code}
                            </p>
                          )}
                        </div>
                      ) : (
                        <span className="inline-flex rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700">
                          Not Assigned
                        </span>
                      )}
                    </td>

                    {/* Actions */}

                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        {/* Assign / Reassign */}

                        <button
                          onClick={() =>
                            openAssignModal(student)
                          }
                          className="inline-flex items-center gap-2 rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-2 text-sm font-medium text-indigo-700 transition hover:bg-indigo-100"
                        >
                          <Pencil size={15} />

                          {student.class_name
                            ? "Change Class"
                            : "Assign Class"}
                        </button>

                        {/* Delete */}

                        <button
                          onClick={() =>
                            handleDeleteStudent(student)
                          }
                          disabled={
                            deletingId === student.id
                          }
                          className="inline-flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {deletingId === student.id ? (
                            <Loader2
                              size={15}
                              className="animate-spin"
                            />
                          ) : (
                            <Trash2 size={15} />
                          )}

                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* =====================================================
          ASSIGN CLASS MODAL
      ====================================================== */}

      {selectedStudent && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">
            {/* Modal Header */}

            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  {selectedStudent.class_name
                    ? "Change Student Class"
                    : "Assign Student Class"}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {selectedStudent.username}
                </p>
              </div>

              <button
                onClick={closeAssignModal}
                disabled={assigning}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:opacity-50"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}

            <div className="px-6 py-6">
              <label className="text-sm font-medium text-slate-700">
                Select Class
              </label>

              <div className="mt-2">
                <select
                  value={selectedClassId}
                  onChange={(event) =>
                    setSelectedClassId(
                      event.target.value
                    )
                  }
                  disabled={classesLoading || assigning}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 disabled:bg-slate-100"
                >
                  <option value="">
                    {classesLoading
                      ? "Loading classes..."
                      : "Select a class"}
                  </option>

                  {classes.map((classItem) => (
                    <option
                      key={classItem.id}
                      value={classItem.id}
                    >
                      {classItem.name}{" "}
                      {classItem.code
                        ? `(${classItem.code})`
                        : ""}
                    </option>
                  ))}
                </select>
              </div>

              {classes.length === 0 &&
                !classesLoading && (
                  <p className="mt-3 text-sm text-amber-600">
                    No classes are available. Create a
                    class first.
                  </p>
                )}
            </div>

            {/* Modal Footer */}

            <div className="flex items-center justify-end gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4">
              <button
                onClick={closeAssignModal}
                disabled={assigning}
                className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                onClick={handleAssignClass}
                disabled={
                  assigning ||
                  classesLoading ||
                  !selectedClassId
                }
                className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {assigning && (
                  <Loader2
                    size={16}
                    className="animate-spin"
                  />
                )}

                {assigning
                  ? "Assigning..."
                  : selectedStudent.class_name
                  ? "Change Class"
                  : "Assign Class"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}