"use client";

import { useEffect, useMemo, useState } from "react";
import {
  BookOpen,
  GraduationCap,
  Pencil,
  Plus,
  Trash2,
  Users,
  X,
} from "lucide-react";

import {
  getTeachers,
  getTeacherClasses,
  getTeacherSubjects,
  assignTeacherClass,
  updateTeacherClass,
  deleteTeacherClass,
  assignTeacherSubject,
  updateTeacherSubject,
  deleteTeacherSubject,
  type Teacher,
  type TeacherClass,
  type TeacherSubject,
} from "@/services/teacher.service";

import {
  getClasses,
  getSubjects,
  type AcademicClass,
  type Subject,
} from "@/services/academics.service";

type ModalType =
  | "class"
  | "subject"
  | null;

export default function AdminTeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [teacherClasses, setTeacherClasses] =
    useState<TeacherClass[]>([]);
  const [teacherSubjects, setTeacherSubjects] =
    useState<TeacherSubject[]>([]);

  const [classes, setClasses] =
    useState<AcademicClass[]>([]);
  const [subjects, setSubjects] =
    useState<Subject[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [modal, setModal] =
    useState<ModalType>(null);

  const [selectedTeacher, setSelectedTeacher] =
    useState<Teacher | null>(null);

  const [editingClass, setEditingClass] =
    useState<TeacherClass | null>(null);

  const [editingSubject, setEditingSubject] =
    useState<TeacherSubject | null>(null);

  async function loadData() {
    try {
      setLoading(true);
      setError("");

      const [
        teacherData,
        teacherClassData,
        teacherSubjectData,
        classData,
        subjectData,
      ] = await Promise.all([
        getTeachers(),
        getTeacherClasses(),
        getTeacherSubjects(),
        getClasses(),
        getSubjects(),
      ]);

      setTeachers(teacherData);
      setTeacherClasses(teacherClassData);
      setTeacherSubjects(teacherSubjectData);
      setClasses(classData);
      setSubjects(subjectData);
    } catch (err) {
      console.error(err);
      setError(
        "Failed to load teacher management data.",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  const teacherStats = useMemo(() => {
    return teachers.map((teacher) => {
      const classCount =
        teacherClasses.filter(
          (item) =>
            item.teacher === teacher.id,
        ).length;

      const subjectCount =
        teacherSubjects.filter(
          (item) =>
            item.teacher === teacher.id,
        ).length;

      return {
        ...teacher,
        classCount,
        subjectCount,
      };
    });
  }, [
    teachers,
    teacherClasses,
    teacherSubjects,
  ]);

  function openClassModal(
    teacher: Teacher,
    assignment?: TeacherClass,
  ) {
    setSelectedTeacher(teacher);
    setEditingClass(assignment ?? null);
    setModal("class");
  }

  function openSubjectModal(
    teacher: Teacher,
    assignment?: TeacherSubject,
  ) {
    setSelectedTeacher(teacher);
    setEditingSubject(
      assignment ?? null,
    );
    setModal("subject");
  }

  function closeModal() {
    setModal(null);
    setSelectedTeacher(null);
    setEditingClass(null);
    setEditingSubject(null);
  }

  async function handleDeleteClass(
    id: number,
  ) {
    const confirmed = window.confirm(
      "Remove this class assignment?",
    );

    if (!confirmed) return;

    try {
      await deleteTeacherClass(id);
      await loadData();
    } catch (err) {
      console.error(err);
      alert(
        "Failed to remove class assignment.",
      );
    }
  }

  async function handleDeleteSubject(
    id: number,
  ) {
    const confirmed = window.confirm(
      "Remove this subject assignment?",
    );

    if (!confirmed) return;

    try {
      await deleteTeacherSubject(id);
      await loadData();
    } catch (err) {
      console.error(err);
      alert(
        "Failed to remove subject assignment.",
      );
    }
  }

  if (loading) {
    return (
      <div className="p-6 lg:p-8">
        <div className="rounded-xl border border-slate-200 bg-white p-10 text-center">
          <p className="text-sm text-slate-500">
            Loading teachers...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-rose-50 p-3 text-[#6b1d2f]">
              <GraduationCap
                size={24}
              />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Teacher Management
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Manage teachers and their
                class and subject assignments.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Stats */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          label="Total Teachers"
          value={teachers.length}
          icon={GraduationCap}
        />

        <StatCard
          label="Class Assignments"
          value={teacherClasses.length}
          icon={Users}
        />

        <StatCard
          label="Subject Assignments"
          value={teacherSubjects.length}
          icon={BookOpen}
        />
      </div>

      {/* Teacher list */}
      <div className="mt-6 space-y-5">
        {teacherStats.map((teacher) => {
          const classesForTeacher =
            teacherClasses.filter(
              (item) =>
                item.teacher ===
                teacher.id,
            );

          const subjectsForTeacher =
            teacherSubjects.filter(
              (item) =>
                item.teacher ===
                teacher.id,
            );

          return (
            <div
              key={teacher.id}
              className="rounded-xl border border-slate-200 bg-white shadow-sm"
            >
              {/* Teacher header */}
              <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#6b1d2f] to-rose-950 font-semibold text-[#6b1d2f]">
                    {teacher.username
                      .slice(0, 1)
                      .toUpperCase()}
                  </div>

                  <div>
                    <h2 className="font-semibold text-slate-900">
                      {teacher.first_name ||
                      teacher.last_name
                        ? `${teacher.first_name} ${teacher.last_name}`
                        : teacher.username}
                    </h2>

                    <p className="text-sm text-slate-500">
                      @{teacher.username} ·{" "}
                      {teacher.email}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <span className="rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-[#6b1d2f]">
                    {teacher.classCount}{" "}
                    Classes
                  </span>

                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                    {teacher.subjectCount}{" "}
                    Subjects
                  </span>
                </div>
              </div>

              <div className="grid gap-6 p-5 lg:grid-cols-2">
                {/* Classes */}
                <AssignmentSection
                  title="Assigned Classes"
                  icon={Users}
                  emptyText="No classes assigned."
                  onAdd={() =>
                    openClassModal(
                      teacher,
                    )
                  }
                >
                  {classesForTeacher.map(
                    (assignment) => (
                      <AssignmentRow
                        key={
                          assignment.id
                        }
                        title={
                          assignment.class_name
                        }
                        subtitle="Class assignment"
                        onEdit={() =>
                          openClassModal(
                            teacher,
                            assignment,
                          )
                        }
                        onDelete={() =>
                          handleDeleteClass(
                            assignment.id,
                          )
                        }
                      />
                    ),
                  )}
                </AssignmentSection>

                {/* Subjects */}
                <AssignmentSection
                  title="Assigned Subjects"
                  icon={BookOpen}
                  emptyText="No subjects assigned."
                  onAdd={() =>
                    openSubjectModal(
                      teacher,
                    )
                  }
                >
                  {subjectsForTeacher.map(
                    (assignment) => (
                      <AssignmentRow
                        key={
                          assignment.id
                        }
                        title={
                          assignment.subject_name
                        }
                        subtitle={
                          assignment.class_name
                        }
                        onEdit={() =>
                          openSubjectModal(
                            teacher,
                            assignment,
                          )
                        }
                        onDelete={() =>
                          handleDeleteSubject(
                            assignment.id,
                          )
                        }
                      />
                    ),
                  )}
                </AssignmentSection>
              </div>
            </div>
          );
        })}

        {teachers.length === 0 && (
          <div className="rounded-xl border border-slate-200 bg-white p-10 text-center">
            <p className="text-sm text-slate-500">
              No teachers found.
            </p>
          </div>
        )}
      </div>

      {/* Modal */}
      {modal === "class" &&
        selectedTeacher && (
          <ClassAssignmentModal
            teacher={selectedTeacher}
            classes={classes}
            editing={editingClass}
            onClose={closeModal}
            onSaved={async () => {
              closeModal();
              await loadData();
            }}
          />
        )}

      {modal === "subject" &&
        selectedTeacher && (
          <SubjectAssignmentModal
            teacher={selectedTeacher}
            classes={classes}
            subjects={subjects}
            editing={editingSubject}
            onClose={closeModal}
            onSaved={async () => {
              closeModal();
              await loadData();
            }}
          />
        )}
    </div>
  );
}

/* =====================================================
   STAT CARD
===================================================== */

function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: number;
  icon: React.ElementType;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">
            {label}
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-900">
            {value}
          </p>
        </div>

        <div className="rounded-lg bg-rose-50 p-3 text-[#6b1d2f]">
          <Icon size={21} />
        </div>
      </div>
    </div>
  );
}

/* =====================================================
   ASSIGNMENT SECTION
===================================================== */

function AssignmentSection({
  title,
  icon: Icon,
  emptyText,
  onAdd,
  children,
}: {
  title: string;
  icon: React.ElementType;
  emptyText: string;
  onAdd: () => void;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon
            size={18}
            className="text-slate-500"
          />

          <h3 className="text-sm font-semibold text-slate-900">
            {title}
          </h3>
        </div>

        <button
          onClick={onAdd}
          className="flex items-center gap-1.5 rounded-lg bg-[#6b1d2f] px-3 py-2 text-xs font-semibold text-white hover:bg-indigo-700"
        >
          <Plus size={15} />
          Add
        </button>
      </div>

      <div className="mt-3 space-y-2">
        {children}

        {!children ||
          null}
      </div>
    </div>
  );
}

/* =====================================================
   ASSIGNMENT ROW
===================================================== */

function AssignmentRow({
  title,
  subtitle,
  onEdit,
  onDelete,
}: {
  title: string;
  subtitle: string;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-3">
      <div>
        <p className="text-sm font-medium text-slate-800">
          {title}
        </p>

        <p className="mt-0.5 text-xs text-slate-500">
          {subtitle}
        </p>
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={onEdit}
          className="rounded-lg p-2 text-slate-500 hover:bg-white hover:text-[#6b1d2f]"
          title="Edit"
        >
          <Pencil size={16} />
        </button>

        <button
          onClick={onDelete}
          className="rounded-lg p-2 text-slate-500 hover:bg-white hover:text-red-600"
          title="Delete"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}

/* =====================================================
   CLASS MODAL
===================================================== */

function ClassAssignmentModal({
  teacher,
  classes,
  editing,
  onClose,
  onSaved,
}: {
  teacher: Teacher;
  classes: AcademicClass[];
  editing: TeacherClass | null;
  onClose: () => void;
  onSaved: () => Promise<void>;
}) {
  const [classId, setClassId] =
    useState(
      editing
        ? String(editing.class_group)
        : "",
    );

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleSubmit(
    event: React.FormEvent,
  ) {
    event.preventDefault();

    if (!classId) {
      setError(
        "Please select a class.",
      );
      return;
    }

    try {
      setSaving(true);
      setError("");

      if (editing) {
        await updateTeacherClass(
          editing.id,
          teacher.id,
          Number(classId),
        );
      } else {
        await assignTeacherClass(
          teacher.id,
          Number(classId),
        );
      }

      await onSaved();
    } catch (err: any) {
      console.error(err);

      setError(
        err?.response?.data?.detail ||
          "Failed to save class assignment.",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <Modal
      title={
        editing
          ? "Edit Class Assignment"
          : "Assign Class"
      }
      onClose={onClose}
    >
      <form onSubmit={handleSubmit}>
        <p className="text-sm text-slate-500">
          Teacher:{" "}
          <span className="font-semibold text-slate-800">
            {teacher.username}
          </span>
        </p>

        <div className="mt-5">
          <label className="text-sm font-medium text-slate-700">
            Class
          </label>

          <select
            value={classId}
            onChange={(e) =>
              setClassId(e.target.value)
            }
            className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-indigo-500"
          >
            <option value="">
              Select class
            </option>

            {classes.map((item) => (
              <option
                key={item.id}
                value={item.id}
              >
                {item.name} ({item.code})
              </option>
            ))}
          </select>
        </div>

        {error && (
          <ErrorMessage message={error} />
        )}

        <ModalActions
          saving={saving}
          onClose={onClose}
          submitText={
            editing
              ? "Update Assignment"
              : "Assign Class"
          }
        />
      </form>
    </Modal>
  );
}

/* =====================================================
   SUBJECT MODAL
===================================================== */

function SubjectAssignmentModal({
  teacher,
  classes,
  subjects,
  editing,
  onClose,
  onSaved,
}: {
  teacher: Teacher;
  classes: AcademicClass[];
  subjects: Subject[];
  editing: TeacherSubject | null;
  onClose: () => void;
  onSaved: () => Promise<void>;
}) {
  const [subjectId, setSubjectId] =
    useState(
      editing
        ? String(editing.subject)
        : "",
    );

  const [classId, setClassId] =
    useState(
      editing
        ? String(editing.class_group)
        : "",
    );

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleSubmit(
    event: React.FormEvent,
  ) {
    event.preventDefault();

    if (!subjectId || !classId) {
      setError(
        "Please select both subject and class.",
      );
      return;
    }

    try {
      setSaving(true);
      setError("");

      if (editing) {
        await updateTeacherSubject(
          editing.id,
          teacher.id,
          Number(subjectId),
          Number(classId),
        );
      } else {
        await assignTeacherSubject(
          teacher.id,
          Number(subjectId),
          Number(classId),
        );
      }

      await onSaved();
    } catch (err: any) {
      console.error(err);

      setError(
        err?.response?.data?.detail ||
          "Failed to save subject assignment.",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <Modal
      title={
        editing
          ? "Edit Subject Assignment"
          : "Assign Subject"
      }
      onClose={onClose}
    >
      <form onSubmit={handleSubmit}>
        <p className="text-sm text-slate-500">
          Teacher:{" "}
          <span className="font-semibold text-slate-800">
            {teacher.username}
          </span>
        </p>

        {/* Subject */}
        <div className="mt-5">
          <label className="text-sm font-medium text-slate-700">
            Subject
          </label>

          <select
            value={subjectId}
            onChange={(e) =>
              setSubjectId(e.target.value)
            }
            className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-indigo-500"
          >
            <option value="">
              Select subject
            </option>

            {subjects.map((item) => (
              <option
                key={item.id}
                value={item.id}
              >
                {item.name} ({item.code})
              </option>
            ))}
          </select>
        </div>

        {/* Class */}
        <div className="mt-4">
          <label className="text-sm font-medium text-slate-700">
            Class
          </label>

          <select
            value={classId}
            onChange={(e) =>
              setClassId(e.target.value)
            }
            className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-indigo-500"
          >
            <option value="">
              Select class
            </option>

            {classes.map((item) => (
              <option
                key={item.id}
                value={item.id}
              >
                {item.name} ({item.code})
              </option>
            ))}
          </select>
        </div>

        {error && (
          <ErrorMessage message={error} />
        )}

        <ModalActions
          saving={saving}
          onClose={onClose}
          submitText={
            editing
              ? "Update Assignment"
              : "Assign Subject"
          }
        />
      </form>
    </Modal>
  );
}

/* =====================================================
   MODAL
===================================================== */

function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-100 p-5">
          <h2 className="text-lg font-semibold text-slate-900">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={19} />
          </button>
        </div>

        <div className="p-5">
          {children}
        </div>
      </div>
    </div>
  );
}

/* =====================================================
   MODAL ACTIONS
===================================================== */

function ModalActions({
  saving,
  onClose,
  submitText,
}: {
  saving: boolean;
  onClose: () => void;
  submitText: string;
}) {
  return (
    <div className="mt-6 flex justify-end gap-2">
      <button
        type="button"
        onClick={onClose}
        disabled={saving}
        className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
      >
        Cancel
      </button>

      <button
        type="submit"
        disabled={saving}
        className="rounded-lg bg-[#6b1d2f] px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {saving
          ? "Saving..."
          : submitText}
      </button>
    </div>
  );
}

/* =====================================================
   ERROR
===================================================== */

function ErrorMessage({
  message,
}: {
  message: string;
}) {
  return (
    <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
      {message}
    </div>
  );
}