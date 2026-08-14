"use client";

import { useEffect, useState } from "react";
import {
  Users,
  Loader2,
  AlertCircle,
  School,
} from "lucide-react";

import { api } from "@/lib/api";

interface TeacherClass {
  id: number;
  teacher: number;
  class_group: number;
  class_name?: string;
}

export default function TeacherClassesPage() {
  const [classes, setClasses] = useState<TeacherClass[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadClasses() {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(
          "/academics/teacher-classes/",
        );

        const data = Array.isArray(response.data)
          ? response.data
          : response.data.results ?? [];

        setClasses(data);
      } catch (error) {
        console.error("TEACHER CLASSES ERROR:", error);
        setError("Failed to load your classes.");
      } finally {
        setLoading(false);
      }
    }

    loadClasses();
  }, []);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div>
        <p className="text-sm font-medium text-[#6b1d2f]">
          Teacher Portal
        </p>

        <h1 className="mt-1 text-2xl font-bold text-slate-900">
          My Classes
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          View the classes assigned to you.
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
            Loading classes...
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
                Unable to load classes
              </h2>

              <p className="mt-1 text-sm text-red-700">
                {error}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Empty */}
      {!loading && !error && classes.length === 0 && (
        <div className="mt-6 rounded-xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-rose-50 text-[#6b1d2f]">
            <School size={22} />
          </div>

          <h2 className="mt-4 font-semibold text-slate-900">
            No classes assigned
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            You have not been assigned to any classes yet.
          </p>
        </div>
      )}

      {/* Classes */}
      {!loading && !error && classes.length > 0 && (
        <>
          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm text-slate-500">
              {classes.length}{" "}
              {classes.length === 1
                ? "class"
                : "classes"}{" "}
              assigned
            </p>
          </div>

          <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {classes.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-50 text-[#6b1d2f]">
                    <Users size={21} />
                  </div>

                  <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700">
                    Assigned
                  </span>
                </div>

                <h2 className="mt-5 text-lg font-semibold text-slate-900">
                  {item.class_name ||
                    `Class #${item.class_group}`}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Class ID: {item.class_group}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}