"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  Loader2,
  Save,
  Send,
} from "lucide-react";

import { api } from "@/lib/api";

interface ClassItem {
  id: number;
  name: string;
  code: string;
}

interface SubjectItem {
  id: number;
  name: string;
  code: string;
}

interface AssignmentForm {
  title: string;
  description: string;
  class_group: string;
  subject: string;
  deadline: string;
  max_marks: string;
}

export default function CreateAssignmentPage() {
  const router = useRouter();

  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [subjects, setSubjects] = useState<SubjectItem[]>([]);

  const [form, setForm] = useState<AssignmentForm>({
    title: "",
    description: "",
    class_group: "",
    subject: "",
    deadline: "",
    max_marks: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadOptions() {
      try {
        setLoading(true);

        const [classesResponse, subjectsResponse] =
          await Promise.all([
            api.get("/academics/classes/"),
            api.get("/academics/subjects/"),
          ]);

        const classData = classesResponse.data;
        const subjectData = subjectsResponse.data;

        setClasses(
          Array.isArray(classData)
            ? classData
            : classData.results ?? [],
        );

        setSubjects(
          Array.isArray(subjectData)
            ? subjectData
            : subjectData.results ?? [],
        );
      } catch (error) {
        console.error("CREATE ASSIGNMENT OPTIONS ERROR:", error);
        setError("Failed to load classes and subjects.");
      } finally {
        setLoading(false);
      }
    }

    loadOptions();
  }, []);

  function handleChange(
    field: keyof AssignmentForm,
    value: string,
  ) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  async function handleSubmit(
    event: FormEvent,
    status: "DRAFT" | "PUBLISHED",
  ) {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");

      if (
        !form.title ||
        !form.description ||
        !form.class_group ||
        !form.subject ||
        !form.deadline ||
        !form.max_marks
      ) {
        setError("Please fill in all fields.");
        return;
      }

      await api.post("/assignments/", {
        title: form.title,
        description: form.description,
        class_group: Number(form.class_group),
        subject: Number(form.subject),
        deadline: new Date(form.deadline).toISOString(),
        max_marks: Number(form.max_marks),
        status,
      });

      router.push("/dashboard/assignments");
      router.refresh();
    } catch (error: any) {
      console.error("CREATE ASSIGNMENT ERROR:", error);

      const data = error?.response?.data;

      if (typeof data === "string") {
        setError(data);
      } else if (data?.detail) {
        setError(data.detail);
      } else {
        setError(
          "Failed to create assignment. Please check your information.",
        );
      }
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2
            size={30}
            className="animate-spin text-indigo-600"
          />
          <p className="text-sm text-slate-500">
            Loading form...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl p-6 lg:p-8">
      {/* Back */}

      <Link
        href="/dashboard/assignments"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
      >
        <ArrowLeft size={17} />
        Back to assignments
      </Link>

      {/* Header */}

      <div className="mt-6">
        <p className="text-sm font-semibold text-indigo-600">
          Teacher Portal
        </p>

        <h1 className="mt-1 text-2xl font-bold text-slate-900">
          Create Assignment
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Create an assignment for one of your classes.
        </p>
      </div>

      {/* Form */}

      <form className="mt-6 space-y-6">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          {/* Title */}

          <div>
            <label
              htmlFor="title"
              className="text-sm font-semibold text-slate-900"
            >
              Assignment Title
            </label>

            <input
              id="title"
              type="text"
              value={form.title}
              onChange={(event) =>
                handleChange("title", event.target.value)
              }
              placeholder="e.g. React Components Assignment"
              className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          {/* Description */}

          <div className="mt-5">
            <label
              htmlFor="description"
              className="text-sm font-semibold text-slate-900"
            >
              Description
            </label>

            <textarea
              id="description"
              rows={6}
              value={form.description}
              onChange={(event) =>
                handleChange(
                  "description",
                  event.target.value,
                )
              }
              placeholder="Explain what students need to complete..."
              className="mt-2 w-full resize-y rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          {/* Class + Subject */}

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="class_group"
                className="text-sm font-semibold text-slate-900"
              >
                Class
              </label>

              <select
                id="class_group"
                value={form.class_group}
                onChange={(event) =>
                  handleChange(
                    "class_group",
                    event.target.value,
                  )
                }
                className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              >
                <option value="">Select class</option>

                {classes.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name} ({item.code})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="subject"
                className="text-sm font-semibold text-slate-900"
              >
                Subject
              </label>

              <select
                id="subject"
                value={form.subject}
                onChange={(event) =>
                  handleChange(
                    "subject",
                    event.target.value,
                  )
                }
                className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              >
                <option value="">Select subject</option>

                {subjects.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name} ({item.code})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Deadline + Marks */}

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="deadline"
                className="text-sm font-semibold text-slate-900"
              >
                Deadline
              </label>

              <div className="relative mt-2">
                <CalendarDays
                  size={17}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="deadline"
                  type="datetime-local"
                  value={form.deadline}
                  onChange={(event) =>
                    handleChange(
                      "deadline",
                      event.target.value,
                    )
                  }
                  className="w-full rounded-lg border border-slate-200 px-10 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="max_marks"
                className="text-sm font-semibold text-slate-900"
              >
                Maximum Marks
              </label>

              <input
                id="max_marks"
                type="number"
                min="1"
                value={form.max_marks}
                onChange={(event) =>
                  handleChange(
                    "max_marks",
                    event.target.value,
                  )
                }
                placeholder="e.g. 100"
                className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>
          </div>
        </div>

        {/* Error */}

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Actions */}

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            disabled={saving}
            onClick={(event) =>
              handleSubmit(event, "DRAFT")
            }
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Save size={17} />

            {saving ? "Saving..." : "Save Draft"}
          </button>

          <button
            type="button"
            disabled={saving}
            onClick={(event) =>
              handleSubmit(event, "PUBLISHED")
            }
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Send size={17} />

            {saving ? "Publishing..." : "Publish Assignment"}
          </button>
        </div>
      </form>
    </div>
  );
}