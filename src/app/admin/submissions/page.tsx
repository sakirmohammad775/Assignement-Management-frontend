"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import {
  Eye,
  FileCheck,
  User,
  BookOpen,
  GraduationCap,
  CalendarDays,
  Loader2,
} from "lucide-react";

import {
  getSubmissions,
  type Submission,
} from "@/services/submission.service";

type StatusFilter =
  | "ALL"
  | "SUBMITTED"
  | "GRADED"
  | "LATE";

export default function AdminSubmissionsPage() {
  const [submissions, setSubmissions] =
    useState<Submission[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [filter, setFilter] =
    useState<StatusFilter>("ALL");

  useEffect(() => {
    async function loadSubmissions() {
      try {
        setLoading(true);
        setError("");

        const data = await getSubmissions();

        setSubmissions(data);
      } catch (error) {
        console.error(
          "ADMIN SUBMISSIONS ERROR:",
          error,
        );

        setError(
          "Failed to load submissions.",
        );
      } finally {
        setLoading(false);
      }
    }

    loadSubmissions();
  }, []);

  const filteredSubmissions = useMemo(() => {
    if (filter === "ALL") {
      return submissions;
    }

    return submissions.filter(
      (submission) =>
        submission.status === filter,
    );
  }, [submissions, filter]);

  const submittedCount = submissions.filter(
    (submission) =>
      submission.status === "SUBMITTED",
  ).length;

  const gradedCount = submissions.filter(
    (submission) =>
      submission.status === "GRADED",
  ).length;

  const lateCount = submissions.filter(
    (submission) =>
      submission.status === "LATE",
  ).length;

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2
          size={28}
          className="animate-spin text-indigo-600"
        />
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          All Submissions
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Monitor student submissions across the system.
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Stats */}
      <div className="mt-6 grid gap-4 sm:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Total
          </p>

          <p className="mt-1 text-2xl font-bold text-slate-900">
            {submissions.length}
          </p>
        </div>

        <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-5">
          <p className="text-sm text-yellow-700">
            Submitted
          </p>

          <p className="mt-1 text-2xl font-bold text-yellow-800">
            {submittedCount}
          </p>
        </div>

        <div className="rounded-xl border border-green-200 bg-green-50 p-5">
          <p className="text-sm text-green-700">
            Graded
          </p>

          <p className="mt-1 text-2xl font-bold text-green-800">
            {gradedCount}
          </p>
        </div>

        <div className="rounded-xl border border-red-200 bg-red-50 p-5">
          <p className="text-sm text-red-700">
            Late
          </p>

          <p className="mt-1 text-2xl font-bold text-red-800">
            {lateCount}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="mt-6 flex flex-wrap gap-2">
        {(
          [
            "ALL",
            "SUBMITTED",
            "GRADED",
            "LATE",
          ] as StatusFilter[]
        ).map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
              filter === status
                ? "bg-indigo-600 text-white"
                : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
            }`}
          >
            {status === "ALL"
              ? "All"
              : status}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="mt-5 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead className="border-b border-slate-200 bg-slate-50">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Student
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Assignment
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Teacher
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Class
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Submitted
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Status
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Marks
                </th>

                <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredSubmissions.map(
                (submission) => (
                  <tr
                    key={submission.id}
                    className="hover:bg-slate-50"
                  >
                    {/* Student */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <User
                          size={16}
                          className="text-slate-400"
                        />

                        <span className="text-sm font-medium text-slate-900">
                          {
                            submission.student_name
                          }
                        </span>
                      </div>
                    </td>

                    {/* Assignment */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <BookOpen
                          size={16}
                          className="text-slate-400"
                        />

                        <div>
                          <p className="text-sm font-medium text-slate-900">
                            {
                              submission.assignment_title
                            }
                          </p>

                          {submission.subject_name && (
                            <p className="text-xs text-slate-500">
                              {
                                submission.subject_name
                              }
                            </p>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Teacher */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <GraduationCap
                          size={16}
                          className="text-slate-400"
                        />

                        {submission.teacher_name ||
                          "—"}
                      </div>
                    </td>

                    {/* Class */}
                    <td className="px-5 py-4">
                      <span className="text-sm text-slate-600">
                        {submission.class_name ||
                          "—"}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <CalendarDays
                          size={15}
                        />

                        {new Date(
                          submission.submitted_at,
                        ).toLocaleDateString()}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                          submission.status ===
                          "GRADED"
                            ? "bg-green-100 text-green-700"
                            : submission.status ===
                                "LATE"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {submission.status ||
                          "SUBMITTED"}
                      </span>
                    </td>

                    {/* Marks */}
                    <td className="px-5 py-4">
                      <span className="text-sm font-semibold text-slate-700">
                        {submission.marks ??
                          "—"}

                        {submission.marks !==
                          null &&
                          submission.marks !==
                            undefined &&
                          submission.max_marks !==
                            undefined && (
                            <>
                              {" "}
                              /{" "}
                              {
                                submission.max_marks
                              }
                            </>
                          )}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="px-5 py-4 text-right">
                      <Link
                        href={`/admin/submissions/${submission.id}`}
                        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                      >
                        <Eye size={16} />
                        View
                      </Link>
                    </td>
                  </tr>
                ),
              )}

              {filteredSubmissions.length ===
                0 && (
                <tr>
                  <td
                    colSpan={8}
                    className="px-5 py-12 text-center"
                  >
                    <FileCheck
                      size={40}
                      className="mx-auto text-slate-400"
                    />

                    <p className="mt-4 text-sm font-medium text-slate-700">
                      No submissions found.
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      Try changing the status
                      filter.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}