"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import {
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Clock3,
  FileCheck,
  Plus,
  Users,
  ArrowUpRight,
  Loader2,
} from "lucide-react";

import { getAssignments } from "@/services/assignment.service";
import { getSubmissions } from "@/services/submission.service";
import { getClasses } from "@/services/class.service";
import { getSubjects } from "@/services/subject.service";

export default function TeacherDashboardPage() {
  const [assignments, setAssignments] = useState<any[]>([]);
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [classes, setClasses] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDashboard() {
      try {
        setLoading(true);
        setError("");

        const [assignmentsData, submissionsData, classesData, subjectsData] =
          await Promise.all([
            getAssignments(),
            getSubmissions(),
            getClasses(),
            getSubjects(),
          ]);

        setAssignments(assignmentsData);
        setSubmissions(submissionsData);
        setClasses(classesData);
        setSubjects(subjectsData);
      } catch (error) {
        console.error("TEACHER DASHBOARD ERROR:", error);
        setError("Failed to load dashboard.");
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  const publishedAssignments = useMemo(
    () => assignments.filter((item) => item.status === "PUBLISHED"),
    [assignments],
  );

  const pendingGrading = useMemo(
    () => submissions.filter((item) => item.status === "SUBMITTED"),
    [submissions],
  );

  const gradedSubmissions = useMemo(
    () => submissions.filter((item) => item.status === "GRADED"),
    [submissions],
  );

  const recentAssignments = assignments.slice(0, 5);

  const recentSubmissions = submissions.slice(0, 5);

  if (loading) {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="animate-spin text-indigo-600" size={32} />

          <p className="text-sm text-slate-500">Loading teacher dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6 lg:p-8">
      {/* Header */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-indigo-600">
            Teacher Portal
          </p>

          <h1 className="mt-1 text-3xl font-bold text-slate-900">
            Teacher Dashboard
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Manage your classes, assignments and student submissions.
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

      {/* Stats */}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Classes"
          value={classes.length}
          icon={<Users size={20} />}
        />

        <StatCard
          title="Subjects"
          value={subjects.length}
          icon={<BookOpen size={20} />}
        />

        <StatCard
          title="Assignments"
          value={assignments.length}
          icon={<ClipboardList size={20} />}
        />

        <StatCard
          title="Pending Grading"
          value={pendingGrading.length}
          icon={<Clock3 size={20} />}
        />
      </div>

      {/* Main content */}

      <div className="grid gap-6 xl:grid-cols-3">
        {/* Assignments */}

        <section className="rounded-2xl border border-slate-200 bg-white shadow-sm xl:col-span-2">
          <div className="flex items-center justify-between border-b border-slate-200 p-6">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Recent Assignments
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Your latest assignments.
              </p>
            </div>

            <Link
              href="/dashboard/assignments"
              className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
            >
              View all
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {recentAssignments.map((assignment) => (
              <Link
                key={assignment.id}
                href={`/dashboard/assignments/${assignment.id}`}
                className="block p-5 transition hover:bg-slate-50"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-semibold text-slate-900">
                      {assignment.title}
                    </h3>

                    <div className="mt-2 flex flex-wrap gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <BookOpen size={14} />
                        {assignment.subject_name ||
                          `Subject #${assignment.subject}`}
                      </span>

                      <span className="flex items-center gap-1">
                        <CalendarDays size={14} />
                        {new Date(assignment.deadline).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${
                      assignment.status === "PUBLISHED"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {assignment.status}
                  </span>
                </div>
              </Link>
            ))}

            {recentAssignments.length === 0 && (
              <div className="p-10 text-center text-sm text-slate-500">
                No assignments yet.
              </div>
            )}
          </div>
        </section>

        {/* Quick Actions */}

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            Quick Actions
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Frequently used teacher actions.
          </p>

          <div className="mt-5 space-y-2">
            <QuickAction
              href="/dashboard/assignments/create"
              label="Create Assignment"
              icon={<Plus size={17} />}
            />

            <QuickAction
              href="/dashboard/submissions"
              label="Review Submissions"
              icon={<FileCheck size={17} />}
            />

            <QuickAction
              href="/dashboard/classes"
              label="View Classes"
              icon={<Users size={17} />}
            />

            <QuickAction
              href="/dashboard/subjects"
              label="View Subjects"
              icon={<BookOpen size={17} />}
            />
          </div>
        </section>
      </div>

      {/* Submission Overview */}

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Submission Overview
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Track your students' submission progress.
            </p>
          </div>

          <Link
            href="/dashboard/submissions"
            className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600"
          >
            View all
            <ArrowUpRight size={15} />
          </Link>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <OverviewCard
            label="Total Submissions"
            value={submissions.length}
            icon={<FileCheck size={20} />}
          />

          <OverviewCard
            label="Pending Grading"
            value={pendingGrading.length}
            icon={<Clock3 size={20} />}
          />

          <OverviewCard
            label="Graded"
            value={gradedSubmissions.length}
            icon={<CheckCircle2 size={20} />}
          />
        </div>
      </section>

      {/* Recent Submissions */}

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-200 p-6">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Recent Submissions
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Latest student submissions.
            </p>
          </div>

          <Link
            href="/dashboard/submissions"
            className="text-sm font-semibold text-indigo-600"
          >
            View all
          </Link>
        </div>

        <div className="divide-y divide-slate-100">
          {recentSubmissions.map((submission) => (
            <Link
              key={submission.id}
              href={`/dashboard/submissions/${submission.id}`}
              className="flex items-center justify-between gap-4 p-5 transition hover:bg-slate-50"
            >
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  {submission.student_name}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  {submission.assignment_title}
                </p>
              </div>

              <div className="text-right">
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                    submission.status === "GRADED"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {submission.status}
                </span>
              </div>
            </Link>
          ))}

          {recentSubmissions.length === 0 && (
            <div className="p-10 text-center text-sm text-slate-500">
              No submissions yet.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

/* =====================================================
   REUSABLE COMPONENTS
===================================================== */

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="rounded-lg bg-indigo-50 p-2.5 text-indigo-600">
          {icon}
        </div>
      </div>

      <p className="mt-4 text-sm text-slate-500">{title}</p>

      <p className="mt-1 text-2xl font-bold text-slate-900">{value}</p>
    </div>
  );
}

function OverviewCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-xl bg-slate-50 p-5">
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-white p-2 text-indigo-600 shadow-sm">
          {icon}
        </div>

        <div>
          <p className="text-xs text-slate-500">{label}</p>

          <p className="mt-1 text-xl font-bold text-slate-900">{value}</p>
        </div>
      </div>
    </div>
  );
}

function QuickAction({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-lg border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
    >
      {icon}

      {label}

      <ArrowUpRight size={15} className="ml-auto" />
    </Link>
  );
}
