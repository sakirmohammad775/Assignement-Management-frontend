"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  CalendarDays,
  Loader2,
  Pencil,
  Send,
} from "lucide-react";

import {
  getAssignment,
  type Assignment,
} from "@/services/assignment.service";

import { getUser } from "@/lib/auth";

export default function AssignmentDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const id = Number(params.id);
  const user = getUser();

  const isTeacher = user?.role === "TEACHER";
  const isStudent = user?.role === "STUDENT";

  const [assignment, setAssignment] =
    useState<Assignment | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadAssignment() {
      try {
        const data = await getAssignment(id);

        setAssignment(data);
      } catch (error) {
        console.error("ASSIGNMENT DETAILS ERROR:", error);
        setError("Failed to load assignment.");
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadAssignment();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex items-center gap-2 text-slate-500">
          <Loader2
            size={20}
            className="animate-spin"
          />
          Loading assignment...
        </div>
      </div>
    );
  }

  if (error || !assignment) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-600">
        {error || "Assignment not found."}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      {/* Back */}
      <Link
        href="/dashboard/assignments"
        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900"
      >
        <ArrowLeft size={16} />
        Back to assignments
      </Link>

      {/* Main Card */}
      <div className="mt-5 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        
        {/* Header */}
        <div className="border-b border-slate-100 p-5 sm:p-7">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                assignment.status === "PUBLISHED"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {assignment.status}
            </span>

            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
              {assignment.max_marks} Marks
            </span>
          </div>

          <h1 className="mt-4 text-2xl font-bold text-slate-900 sm:text-3xl">
            {assignment.title}
          </h1>

          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-500">
            <span className="flex items-center gap-1.5">
              <BookOpen size={17} />
              {assignment.subject_name}
            </span>

            <span>
              Class:{" "}
              <strong className="text-slate-700">
                {assignment.class_name}
              </strong>
            </span>

            <span className="flex items-center gap-1.5">
              <CalendarDays size={17} />
              Due{" "}
              {new Date(
                assignment.deadline
              ).toLocaleString()}
            </span>
          </div>
        </div>

        {/* Description */}
        <div className="p-5 sm:p-7">
          <h2 className="text-sm font-semibold text-slate-900">
            Assignment Description
          </h2>

          <div className="mt-3 rounded-lg bg-slate-50 p-4">
            <p className="whitespace-pre-wrap text-sm leading-7 text-slate-600">
              {assignment.description}
            </p>
          </div>
        </div>

        {/* Teacher Actions */}
        {isTeacher && (
          <div className="flex flex-col gap-3 border-t border-slate-100 p-5 sm:flex-row sm:justify-end sm:p-7">
            <Link
              href={`/dashboard/assignments/${assignment.id}/edit`}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              <Pencil size={17} />
              Edit Assignment
            </Link>
          </div>
        )}

        {/* Student Actions */}
        {isStudent &&
          assignment.status === "PUBLISHED" && (
            <div className="border-t border-slate-100 p-5 sm:p-7">
              <div className="rounded-xl bg-indigo-50 p-5">
                <h2 className="font-semibold text-indigo-900">
                  Ready to submit?
                </h2>

                <p className="mt-1 text-sm text-indigo-700">
                  Submit your work before the deadline.
                </p>

                <Link
                  href={`/dashboard/assignments/${assignment.id}/submit`}
                  className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
                >
                  <Send size={17} />
                  Submit Assignment
                </Link>
              </div>
            </div>
          )}
      </div>
    </div>
  );
}