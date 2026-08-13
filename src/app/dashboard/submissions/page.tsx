"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Eye,
  Loader2,
  User,
} from "lucide-react";

import {
  getMySubmissions,
  getSubmissions,
  type Submission,
} from "@/services/submission.service";

import { getUser } from "@/lib/auth";

export default function SubmissionsPage() {
  const user = getUser();

  const isTeacher = user?.role === "TEACHER";
  const isStudent = user?.role === "STUDENT";

  const [submissions, setSubmissions] =
    useState<Submission[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadSubmissions() {
      try {
        setLoading(true);

        const data = isTeacher
          ? await getSubmissions()
          : await getMySubmissions();

        setSubmissions(data);
      } catch (error: any) {
        console.error(
          "SUBMISSIONS ERROR:",
          error,
        );

        setError(
          error?.response?.data?.detail ||
            "Failed to load submissions.",
        );
      } finally {
        setLoading(false);
      }
    }

    loadSubmissions();
  }, [isTeacher]);

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex items-center gap-2 text-slate-500">
          <Loader2
            size={20}
            className="animate-spin"
          />
          Loading submissions...
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          {isTeacher
            ? "Student Submissions"
            : "My Submissions"}
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          {isTeacher
            ? "Review submissions from your students."
            : "View your submitted assignments and results."}
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Empty */}
      {!error && submissions.length === 0 && (
        <div className="mt-8 rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <BookOpen
            className="mx-auto text-slate-400"
            size={40}
          />

          <h2 className="mt-4 font-semibold text-slate-900">
            {isTeacher
              ? "No student submissions yet"
              : "No submissions yet"}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {isTeacher
              ? "Student submissions will appear here."
              : "You have not submitted any assignments yet."}
          </p>
        </div>
      )}

      {/* Submission list */}
      <div className="mt-6 grid gap-4">
        {submissions.map((submission) => (
          <div
            key={submission.id}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              
              <div className="min-w-0">
                {/* Title */}
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-lg font-semibold text-slate-900">
                    {submission.assignment_title}
                  </h2>

                  <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700">
                    <CheckCircle2 size={14} />
                    {submission.status || "SUBMITTED"}
                  </span>
                </div>

                {/* Teacher sees student */}
                {isTeacher && (
                  <div className="mt-2 flex items-center gap-1.5 text-sm text-slate-500">
                    <User size={16} />
                    {submission.student_name}
                  </div>
                )}

                {/* Metadata */}
                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <CalendarDays size={16} />

                    {new Date(
                      submission.submitted_at,
                    ).toLocaleString()}
                  </span>

                  {submission.marks !== null &&
                    submission.marks !== undefined && (
                      <span>
                        Marks:{" "}
                        <strong className="text-slate-700">
                          {submission.marks}
                        </strong>

                        {submission.max_marks && (
                          <> / {submission.max_marks}</>
                        )}
                      </span>
                    )}
                </div>

                {/* Answer preview */}
                <div className="mt-4 rounded-lg bg-slate-50 p-4">
                  <p className="line-clamp-3 whitespace-pre-wrap text-sm text-slate-600">
                    {submission.answer}
                  </p>
                </div>
              </div>

              {/* View */}
              <div className="shrink-0">
                <Link
                  href={`/dashboard/submissions/${submission.id}`}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
                >
                  <Eye size={17} />

                  {isTeacher
                    ? "Review"
                    : "View"}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}