"use client";

import { useEffect, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Users,
  Loader2,
} from "lucide-react";

import {
  getClasses,
  createClass,
  updateClass,
  deleteClass,
  type ClassGroup,
} from "@/services/class.service";

export default function AdminClassesPage() {
  const [classes, setClasses] = useState<ClassGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingClass, setEditingClass] =
    useState<ClassGroup | null>(null);

  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [saving, setSaving] = useState(false);

  async function loadClasses() {
    try {
      setLoading(true);
      setError("");

      const data = await getClasses();

      setClasses(data);
    } catch (error) {
      console.error("CLASSES ERROR:", error);
      setError("Failed to load classes.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadClasses();
  }, []);

  function openCreateModal() {
    setEditingClass(null);
    setName("");
    setCode("");
    setShowModal(true);
  }

  function openEditModal(item: ClassGroup) {
    setEditingClass(item);
    setName(item.name);
    setCode(item.code);
    setShowModal(true);
  }

  async function handleSubmit(
    event: React.FormEvent,
  ) {
    event.preventDefault();

    if (!name.trim() || !code.trim()) {
      return;
    }

    try {
      setSaving(true);

      if (editingClass) {
        const updated = await updateClass(
          editingClass.id,
          {
            name: name.trim(),
            code: code.trim(),
          },
        );

        setClasses((current) =>
          current.map((item) =>
            item.id === editingClass.id
              ? updated
              : item,
          ),
        );
      } else {
        const created = await createClass({
          name: name.trim(),
          code: code.trim(),
        });

        setClasses((current) => [
          ...current,
          created,
        ]);
      }

      setShowModal(false);
      setEditingClass(null);
      setName("");
      setCode("");
    } catch (error) {
      console.error("SAVE CLASS ERROR:", error);
      alert("Failed to save class.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this class?",
    );

    if (!confirmed) return;

    try {
      await deleteClass(id);

      setClasses((current) =>
        current.filter((item) => item.id !== id),
      );
    } catch (error) {
      console.error("DELETE CLASS ERROR:", error);
      alert(
        "Failed to delete class. It may have students or teachers assigned.",
      );
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2
          className="animate-spin text-indigo-600"
          size={28}
        />
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Classes
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage classes and student assignments.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          <Plus size={18} />
          Add Class
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Classes */}
      <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead className="border-b border-slate-200 bg-slate-50">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Class
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Code
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Students
                </th>

                <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {classes.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-50"
                >
                  <td className="px-5 py-4">
                    <p className="font-medium text-slate-900">
                      {item.name}
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                      {item.code}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Users size={16} />

                      {item.student_count ?? 0}
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() =>
                          openEditModal(item)
                        }
                        className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50"
                        title="Edit"
                      >
                        <Pencil size={17} />
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(item.id)
                        }
                        className="rounded-lg border border-red-200 p-2 text-red-500 hover:bg-red-50"
                        title="Delete"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {classes.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-5 py-12 text-center text-sm text-slate-500"
                  >
                    No classes found.
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
                {editingClass
                  ? "Edit Class"
                  : "Create Class"}
              </h2>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-5 p-5">
                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Class Name
                  </label>

                  <input
                    value={name}
                    onChange={(event) =>
                      setName(event.target.value)
                    }
                    placeholder="Class 10"
                    className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Class Code
                  </label>

                  <input
                    value={code}
                    onChange={(event) =>
                      setCode(event.target.value)
                    }
                    placeholder="C10"
                    className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm uppercase outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 border-t border-slate-200 px-5 py-4">
                <button
                  type="button"
                  onClick={() =>
                    setShowModal(false)
                  }
                  className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={
                    saving ||
                    !name.trim() ||
                    !code.trim()
                  }
                  className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {saving
                    ? "Saving..."
                    : editingClass
                      ? "Update Class"
                      : "Create Class"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}