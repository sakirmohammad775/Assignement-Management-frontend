"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Users, Loader2 } from "lucide-react";

import {
  getSubjects,
  createSubject,
  updateSubject,
  deleteSubject,
  type Subject,
} from "@/services/subject.service";

export default function AdminSubjectsPage() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);

  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [saving, setSaving] = useState(false);

  async function loadSubjects() {
    try {
      setLoading(true);
      setError("");

      const data = await getSubjects();

      setSubjects(data);
    } catch (error) {
      console.error("SUBJECTS ERROR:", error);
      setError("Failed to load subjects.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSubjects();
  }, []);

  function openCreateModal() {
    setEditingSubject(null);
    setName("");
    setCode("");
    setShowModal(true);
  }

  function openEditModal(subject: Subject) {
    setEditingSubject(subject);
    setName(subject.name);
    setCode(subject.code);
    setShowModal(true);
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!name.trim() || !code.trim()) {
      return;
    }

    try {
      setSaving(true);

      if (editingSubject) {
        const updated = await updateSubject(editingSubject.id, {
          name: name.trim(),
          code: code.trim(),
        });

        setSubjects((current) =>
          current.map((subject) =>
            subject.id === editingSubject.id ? updated : subject,
          ),
        );
      } else {
        const created = await createSubject({
          name: name.trim(),
          code: code.trim(),
        });

        setSubjects((current) => [...current, created]);
      }

      setShowModal(false);
      setEditingSubject(null);
      setName("");
      setCode("");
    } catch (error) {
      console.error("SAVE SUBJECT ERROR:", error);
      alert("Failed to save subject.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this subject?",
    );

    if (!confirmed) return;

    try {
      await deleteSubject(id);

      setSubjects((current) => current.filter((subject) => subject.id !== id));
    } catch (error) {
      console.error("DELETE SUBJECT ERROR:", error);

      alert("Failed to delete subject. It may be assigned to teachers.");
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="animate-spin text-indigo-600" size={28} />
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Subjects</h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage subjects available in the system.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          <Plus size={18} />
          Add Subject
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Table */}
      <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead className="border-b border-slate-200 bg-slate-50">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Subject
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Code
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Teachers
                </th>

                <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {subjects.map((subject) => (
                <tr key={subject.id} className="hover:bg-slate-50">
                  <td className="px-5 py-4">
                    <p className="font-medium text-slate-900">{subject.name}</p>
                  </td>

                  <td className="px-5 py-4">
                    <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                      {subject.code}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Users size={16} />
                      {subject.teacher_count ?? 0}
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => openEditModal(subject)}
                        className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50"
                        title="Edit"
                      >
                        <Pencil size={17} />
                      </button>

                      <button
                        onClick={() => handleDelete(subject.id)}
                        className="rounded-lg border border-red-200 p-2 text-red-500 hover:bg-red-50"
                        title="Delete"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {subjects.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-5 py-12 text-center text-sm text-slate-500"
                  >
                    No subjects found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="w-full max-w-md rounded-xl bg-white shadow-xl">
            <div className="border-b border-slate-200 px-5 py-4">
              <h2 className="text-lg font-semibold text-slate-900">
                {editingSubject ? "Edit Subject" : "Create Subject"}
              </h2>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-5 p-5">
                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Subject Name
                  </label>

                  <input
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Mathematics"
                    className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Subject Code
                  </label>

                  <input
                    value={code}
                    onChange={(event) => setCode(event.target.value)}
                    placeholder="MATH101"
                    className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm uppercase outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 border-t border-slate-200 px-5 py-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving || !name.trim() || !code.trim()}
                  className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {saving
                    ? "Saving..."
                    : editingSubject
                      ? "Update Subject"
                      : "Create Subject"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
