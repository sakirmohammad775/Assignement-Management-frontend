"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  CalendarDays,
  ClipboardList,
  Eye,
  Loader2,
  Plus,
} from "lucide-react";

import {
  getAssignments,
  type Assignment,
} from "@/services/assignment.service";

export default function AssignmentsPage() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadAssignments() {
      try {
        setLoading(true);
        setError("");

        const data = await getAssignments();

        setAssignments(data);
      } catch (error) {
        console.error("ASSIGNMENTS ERROR:", error);
        setError("Failed to load assignments.");
      } finally {
        setLoading(false);
      }
    }

    loadAssignments();
  }, []);

  return (
    <div className="space-y-6 p-6 lg:p-8">
      {/* Header */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-indigo-600">
            Teacher Portal
          </p>

          <h1 className="mt-1 text-2xl font-bold text-slate-900">
            Assignments
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Create and manage assignments for your students.
          </p>
        </div>

        <Link
          href="/dashboard/assignments/create"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
        >
          <Plus size={18} />
          Create Assignment
        </Link>
      </div>

      {/* Error */}

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Loading */}

      {loading ? (
        <div className="flex min-h-[300px] items-center justify-center rounded-xl border border-slate-200 bg-white">
          <div className="flex flex-col items-center gap-3">
            <Loader2
              size={30}
              className="animate-spin text-indigo-600"
            />

            <p className="text-sm text-slate-500">
              Loading assignments...
            </p>
          </div>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          {/* Desktop header */}

          <div className="hidden border-b border-slate-200 bg-slate-50 px-6 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 md:grid md:grid-cols-[2fr_1fr_1fr_1fr_auto] md:gap-4">
            <span>Assignment</span>
            <span>Class</span>
            <span>Subject</span>
            <span>Deadline</span>
            <span>Status</span>
          </div>

          {/* Rows */}

          <div className="divide-y divide-slate-100">
            {assignments.map((assignment) => (
              <Link
                key={assignment.id}
                href={`/dashboard/assignments/${assignment.id}`}
                className="block px-5 py-5 transition hover:bg-slate-50 md:px-6"
              >
                <div className="grid gap-4 md:grid-cols-[2fr_1fr_1fr_1fr_auto] md:items-center">
                  {/* Assignment */}

                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-indigo-50 p-2.5 text-indigo-600">
                      <ClipboardList size={18} />
                    </div>

                    <div className="min-w-0">
                      <h2 className="truncate text-sm font-semibold text-slate-900">
                        {assignment.title}
                      </h2>

                      <p className="mt-1 line-clamp-1 text-xs text-slate-500">
                        {assignment.description}
                      </p>
                    </div>
                  </div>

                  {/* Class */}

                  <div>
                    <p className="text-xs text-slate-400 md:hidden">
                      Class
                    </p>

                    <p className="text-sm text-slate-700">
                      {assignment.class_name ||
                        `Class #${assignment.class_group}`}
                    </p>
                  </div>

                  {/* Subject */}

                  <div>
                    <p className="text-xs text-slate-400 md:hidden">
                      Subject
                    </p>

                    <p className="text-sm text-slate-700">
                      {assignment.subject_name ||
                        `Subject #${assignment.subject}`}
                    </p>
                  </div>

                  {/* Deadline */}

                  <div>
                    <p className="text-xs text-slate-400 md:hidden">
                      Deadline
                    </p>

                    <div className="flex items-center gap-1.5 text-sm text-slate-600">
                      <CalendarDays size={15} />

                      {new Date(
                        assignment.deadline,
                      ).toLocaleDateString()}
                    </div>
                  </div>

                  {/* Status */}

                  <div>
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                        assignment.status === "PUBLISHED"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {assignment.status}
                    </span>
                  </div>
                </div>
              </Link>
            ))}

            {/* Empty */}

            {assignments.length === 0 && (
              <div className="p-12 text-center">
                <ClipboardList
                  size={40}
                  className="mx-auto text-slate-300"
                />

                <h3 className="mt-4 text-sm font-semibold text-slate-900">
                  No assignments yet
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Create your first assignment to get started.
                </p>

                <Link
                  href="/dashboard/assignments/create"
                  className="mt-5 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white"
                >
                  <Plus size={17} />
                  Create Assignment
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}