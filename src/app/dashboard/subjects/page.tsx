"use client";

import { useEffect, useState } from "react";
import {
  BookOpen,
  Loader2,
  AlertCircle,
} from "lucide-react";

import { api } from "@/lib/api";

interface TeacherSubject {
  id: number;
  teacher: number;
  subject: number;
  class_group: number;
  subject_name?: string;
  class_name?: string;
}

export default function TeacherSubjectsPage() {
  const [subjects, setSubjects] = useState<
    TeacherSubject[]
  >([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadSubjects() {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(
          "/academics/teacher-subjects/",
        );

        const data = Array.isArray(response.data)
          ? response.data
          : response.data.results ?? [];

        setSubjects(data);
      } catch (error) {
        console.error(
          "TEACHER SUBJECTS ERROR:",
          error,
        );

        setError("Failed to load your subjects.");
      } finally {
        setLoading(false);
      }
    }

    loadSubjects();
  }, []);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div>
        <p className="text-sm font-medium text-indigo-600">
          Teacher Portal
        </p>

        <h1 className="mt-1 text-2xl font-bold text-slate-900">
          My Subjects
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          View the subjects you teach and their assigned
          classes.
        </p>
      </div>

      {/* Loading */}
      {loading && (
        <div className="mt-6 flex items-center justify-center rounded-xl border border-slate-200 bg-white py-16">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Loader2
              size={18}
              className="animate-spin"
            />
            Loading subjects...
          </div>
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-5">
          <div className="flex items-start gap-3">
            <AlertCircle
              size={20}
              className="mt-0.5 text-red-600"
            />

            <div>
              <h2 className="font-semibold text-red-900">
                Unable to load subjects
              </h2>

              <p className="mt-1 text-sm text-red-700">
                {error}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Empty */}
      {!loading &&
        !error &&
        subjects.length === 0 && (
          <div className="mt-6 rounded-xl border border-slate-200 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
              <BookOpen size={22} />
            </div>

            <h2 className="mt-4 font-semibold text-slate-900">
              No subjects assigned
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              You have not been assigned to any subjects
              yet.
            </p>
          </div>
        )}

      {/* Subjects */}
      {!loading &&
        !error &&
        subjects.length > 0 && (
          <>
            <div className="mt-6">
              <p className="text-sm text-slate-500">
                {subjects.length}{" "}
                {subjects.length === 1
                  ? "subject"
                  : "subjects"}{" "}
                assigned
              </p>
            </div>

            <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {subjects.map((item) => (
                <div
                  key={item.id}
                  className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                      <BookOpen size={21} />
                    </div>

                    <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700">
                      Assigned
                    </span>
                  </div>

                  <h2 className="mt-5 text-lg font-semibold text-slate-900">
                    {item.subject_name ||
                      `Subject #${item.subject}`}
                  </h2>

                  <div className="mt-3 space-y-1">
                    <p className="text-sm text-slate-500">
                      Subject ID: {item.subject}
                    </p>

                    <p className="text-sm text-slate-500">
                      Class:{" "}
                      <span className="font-medium text-slate-700">
                        {item.class_name ||
                          `Class #${item.class_group}`}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
    </div>
  );
}