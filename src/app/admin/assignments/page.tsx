"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Eye,
  CalendarDays,
  BookOpen,
  User,
  ClipboardList,
  Loader2,
} from "lucide-react";

import {
  getAssignments,
  type Assignment,
} from "@/services/assignment.service";

export default function AdminAssignmentsPage() {
  const [assignments, setAssignments] =
    useState<Assignment[]>([]);

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
        console.error(
          "ADMIN ASSIGNMENTS ERROR:",
          error,
        );

        setError(
          "Failed to load assignments.",
        );
      } finally {
        setLoading(false);
      }
    }

    loadAssignments();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2
          size={28}
          className="animate-spin text-[#6b1d2f]"
        />
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          All Assignments
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          View and monitor assignments created by teachers.
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Stats */}
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-rose-50 p-2">
              <ClipboardList
                size={20}
                className="text-[#6b1d2f]"
              />
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Total Assignments
              </p>

              <p className="text-2xl font-bold text-slate-900">
                {assignments.length}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Published
          </p>

          <p className="mt-1 text-2xl font-bold text-green-600">
            {
              assignments.filter(
                (item) =>
                  item.status === "PUBLISHED",
              ).length
            }
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Drafts
          </p>

          <p className="mt-1 text-2xl font-bold text-yellow-600">
            {
              assignments.filter(
                (item) =>
                  item.status === "DRAFT",
              ).length
            }
          </p>
        </div>
      </div>

      {/* Assignment List */}
      <div className="mt-6 grid gap-4">
        {assignments.map((assignment) => (
          <div
            key={assignment.id}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              {/* Information */}
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-lg font-semibold text-slate-900">
                    {assignment.title}
                  </h2>

                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                      assignment.status ===
                      "PUBLISHED"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {assignment.status}
                  </span>
                </div>

                <p className="mt-2 line-clamp-2 text-sm text-slate-500">
                  {assignment.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <User size={16} />

                    {assignment.teacher_name}
                  </span>

                  <span className="flex items-center gap-1.5">
                    <BookOpen size={16} />

                    {assignment.subject_name}
                  </span>

                  <span>
                    Class:{" "}
                    <strong className="text-slate-700">
                      {assignment.class_name}
                    </strong>
                  </span>

                  <span className="flex items-center gap-1.5">
                    <CalendarDays size={16} />

                    {new Date(
                      assignment.deadline,
                    ).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Action */}
              <div className="shrink-0">
                <Link
                  href={`/admin/assignments/${assignment.id}`}
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  <Eye size={17} />
                  View
                </Link>
              </div>
            </div>
          </div>
        ))}

        {assignments.length === 0 && (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <ClipboardList
              size={40}
              className="mx-auto text-slate-400"
            />

            <h2 className="mt-4 font-semibold text-slate-900">
              No assignments
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              No assignments have been created yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}