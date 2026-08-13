"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  CalendarDays,
  Loader2,
} from "lucide-react";

import {
  getAssignment,
  type Assignment,
} from "@/services/assignment.service";

export default function StudentAssignmentDetailsPage() {
  const params = useParams();
  const id = Number(params.id);

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
        console.error(error);
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
        <Loader2
          size={24}
          className="animate-spin text-slate-500"
        />
      </div>
    );
  }

  if (error || !assignment) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
        {error || "Assignment not found."}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      <Link
        href="/student/assignments"
        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900"
      >
        <ArrowLeft size={16} />
        Back to assignments
      </Link>

      <div className="mt-5 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
        {/* Header */}
        <div className="border-b border-slate-100 pb-6">
          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
            PUBLISHED
          </span>

          <h1 className="mt-3 text-2xl font-bold text-slate-900 sm:text-3xl">
            {assignment.title}
          </h1>

          <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-500">
            <span className="flex items-center gap-1.5">
              <BookOpen size={17} />
              {assignment.subject_name}
            </span>

            <span className="flex items-center gap-1.5">
              <CalendarDays size={17} />
              Due{" "}
              {new Date(
                assignment.deadline
              ).toLocaleString()}
            </span>

            <span>
              Maximum marks:{" "}
              <strong className="text-slate-700">
                {assignment.max_marks}
              </strong>
            </span>
          </div>
        </div>

        {/* Description */}
        <div className="py-7">
          <h2 className="text-sm font-semibold text-slate-900">
            Assignment Instructions
          </h2>

          <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-slate-600">
            {assignment.description}
          </p>
        </div>

        {/* Submit */}
        <div className="border-t border-slate-100 pt-6">
          <Link
            href={`/student/assignments/${assignment.id}/submit`}
            className="inline-flex w-full items-center justify-center rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700 sm:w-auto"
          >
            Submit Assignment
          </Link>
        </div>
      </div>
    </div>
  );
}