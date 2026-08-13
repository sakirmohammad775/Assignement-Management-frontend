"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  CalendarDays,
  Eye,
  Loader2,
} from "lucide-react";

import {
  getStudentAssignments,
  type Assignment,
} from "@/services/assignment.service";

export default function StudentAssignmentsPage() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadAssignments() {
      try {
        const data = await getStudentAssignments();

        setAssignments(data);
      } catch (error) {
        console.error(error);
        setError("Failed to load assignments.");
      } finally {
        setLoading(false);
      }
    }

    loadAssignments();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex items-center gap-2 text-slate-500">
          <Loader2
            size={20}
            className="animate-spin"
          />
          Loading assignments...
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          My Assignments
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          View assignments assigned to your class.
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Empty */}
      {!error && assignments.length === 0 && (
        <div className="mt-8 rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <BookOpen
            className="mx-auto text-slate-400"
            size={40}
          />

          <h2 className="mt-4 font-semibold text-slate-900">
            No assignments available
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Your teacher has not published any assignments yet.
          </p>
        </div>
      )}

      {/* Assignment Cards */}
      <div className="mt-6 grid gap-4">
        {assignments.map((assignment) => (
          <div
            key={assignment.id}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-lg font-semibold text-slate-900">
                    {assignment.title}
                  </h2>

                  <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700">
                    PUBLISHED
                  </span>
                </div>

                <p className="mt-2 line-clamp-2 text-sm text-slate-500">
                  {assignment.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <BookOpen size={16} />
                    {assignment.subject_name}
                  </span>

                  <span className="flex items-center gap-1.5">
                    <CalendarDays size={16} />
                    Due{" "}
                    {new Date(
                      assignment.deadline
                    ).toLocaleDateString()}
                  </span>

                  <span>
                    Marks:{" "}
                    <strong className="text-slate-700">
                      {assignment.max_marks}
                    </strong>
                  </span>
                </div>
              </div>

              <Link
                href={`/student/assignments/${assignment.id}`}
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
              >
                <Eye size={17} />
                View
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}