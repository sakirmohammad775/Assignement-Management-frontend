"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

import {
  ArrowLeft,
  CalendarDays,
  ClipboardList,
  Edit,
  Loader2,
  Trash2,
} from "lucide-react";

import { api } from "@/lib/api";
import type { Assignment } from "@/services/assignment.service";

export default function AssignmentDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const id = Number(params.id);

  const [assignment, setAssignment] = useState<Assignment | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [changingStatus, setChangingStatus] = useState(false);

  useEffect(() => {
    async function loadAssignment() {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(`/assignments/${id}/`);

        setAssignment(response.data);
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

  async function handleStatusChange() {
    if (!assignment) return;

    try {
      setChangingStatus(true);
      setError("");

      const endpoint =
        assignment.status === "PUBLISHED"
          ? `/assignments/${assignment.id}/draft/`
          : `/assignments/${assignment.id}/publish/`;

      const response = await api.post(endpoint);

      setAssignment(response.data);
    } catch (error: any) {
      console.error("STATUS UPDATE ERROR:", error);

      setError(
        error?.response?.data?.detail || "Failed to update assignment status.",
      );
    } finally {
      setChangingStatus(false);
    }
  }

  async function handleDelete() {
    if (!assignment) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this assignment?",
    );

    if (!confirmed) return;

    try {
      setDeleting(true);
      setError("");

      await api.delete(`/assignments/${assignment.id}/`);

      router.push("/dashboard/assignments");
      router.refresh();
    } catch (error: any) {
      console.error("DELETE ASSIGNMENT ERROR:", error);

      setError(error?.response?.data?.detail || "Failed to delete assignment.");

      setDeleting(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 size={30} className="animate-spin text-indigo-600" />

          <p className="text-sm text-slate-500">Loading assignment...</p>
        </div>
      </div>
    );
  }

  if (!assignment) {
    return (
      <div className="p-6 lg:p-8">
        <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
          {error || "Assignment not found."}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl p-6 lg:p-8">
      {/* Back */}

      <Link
        href="/dashboard/assignments"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
      >
        <ArrowLeft size={17} />
        Back to assignments
      </Link>

      {/* Header */}

      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
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
                {assignment.max_marks} marks
              </span>
            </div>

            <h1 className="mt-4 text-2xl font-bold text-slate-900 sm:text-3xl">
              {assignment.title}
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Created by {assignment.teacher_name}
            </p>
          </div>

          {/* Actions */}

          <div className="flex flex-wrap gap-2">
            <Link
              href={`/dashboard/assignments/${assignment.id}/edit`}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              <Edit size={16} />
              Edit
            </Link>

            <button
              type="button"
              onClick={handleStatusChange}
              disabled={changingStatus}
              className={`inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60 ${
                assignment.status === "PUBLISHED"
                  ? "bg-yellow-600 hover:bg-yellow-700"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {changingStatus
                ? "Updating..."
                : assignment.status === "PUBLISHED"
                  ? "Move to Draft"
                  : "Publish"}
            </button>

            <button
              type="button"
              onClick={handleDelete}
              disabled={deleting}
              className="inline-flex items-center gap-2 rounded-lg border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Trash2 size={16} />
              {deleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </div>

      {/* Error */}

      {error && (
        <div className="mt-5 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Assignment Information */}

      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        {/* Description */}

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
          <div className="flex items-center gap-2">
            <ClipboardList size={18} className="text-indigo-600" />

            <h2 className="font-semibold text-slate-900">
              Assignment Description
            </h2>
          </div>

          <div className="mt-5 rounded-lg bg-slate-50 p-5">
            <p className="whitespace-pre-wrap text-sm leading-7 text-slate-700">
              {assignment.description}
            </p>
          </div>
        </div>

        {/* Details */}

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-semibold text-slate-900">Details</h2>

          <div className="mt-5 space-y-5">
            <div>
              <p className="text-xs font-medium text-slate-400">Class</p>

              <p className="mt-1 text-sm font-semibold text-slate-800">
                {assignment.class_name || `Class #${assignment.class_group}`}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium text-slate-400">Subject</p>

              <p className="mt-1 text-sm font-semibold text-slate-800">
                {assignment.subject_name || `Subject #${assignment.subject}`}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium text-slate-400">
                Maximum Marks
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-800">
                {assignment.max_marks}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium text-slate-400">Deadline</p>

              <div className="mt-1 flex items-center gap-2 text-sm font-semibold text-slate-800">
                <CalendarDays size={16} />

                {new Date(assignment.deadline).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Submission shortcut */}

      {assignment.status === "PUBLISHED" && (
        <div className="mt-5 rounded-xl border border-indigo-200 bg-indigo-50 p-6">
          <h2 className="font-semibold text-indigo-900">Student Submissions</h2>

          <p className="mt-1 text-sm text-indigo-700">
            View and grade submissions for this assignment.
          </p>

          <Link
            href={`/dashboard/submissions?assignment=${assignment.id}`}
            className="mt-4 inline-flex rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            View Submissions
          </Link>
        </div>
      )}
    </div>
  );
}
