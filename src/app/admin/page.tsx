"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import {
  Users,
  GraduationCap,
  UserRound,
  School,
  BookOpen,
  ClipboardList,
  FileCheck,
  Clock3,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
  Loader2,
} from "lucide-react";

import StatCard from "@/components/admin/StatCard";
import OverviewCard from "@/components/admin/OverviewCard";
import QuickAction from "@/components/admin/QuickAction";
import StatusBadge from "@/components/admin/StatusBadge";

import { getUsers } from "@/services/user.service";
import { getTeachers } from "@/services/teacher.service";
import { getStudents } from "@/services/student.service";
import { getClasses } from "@/services/class.service";
import { getSubjects } from "@/services/subject.service";
import { getAssignments } from "@/services/assignment.service";
import { getSubmissions } from "@/services/submission.service";

import type { Submission } from "@/services/submission.service";

export default function AdminDashboardPage() {
  // =====================================================
  // STATE
  // =====================================================

  const [users, setUsers] = useState<any[]>([]);
  const [teachers, setTeachers] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [classes, setClasses] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [assignments, setAssignments] = useState<any[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>(
    [],
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =====================================================
  // LOAD DASHBOARD DATA
  // =====================================================

  useEffect(() => {
    async function loadDashboard() {
      try {
        setLoading(true);
        setError("");

        const [
          usersData,
          teachersData,
          studentsData,
          classesData,
          subjectsData,
          assignmentsData,
          submissionsData,
        ] = await Promise.all([
          getUsers(),
          getTeachers(),
          getStudents(),
          getClasses(),
          getSubjects(),
          getAssignments(),
          getSubmissions(),
        ]);

        setUsers(usersData);
        setTeachers(teachersData);
        setStudents(studentsData);
        setClasses(classesData);
        setSubjects(subjectsData);
        setAssignments(assignmentsData);
        setSubmissions(submissionsData);
      } catch (error) {
        console.error(
          "ADMIN DASHBOARD ERROR:",
          error,
        );

        setError(
          "Failed to load dashboard data. Please try again.",
        );
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  // =====================================================
  // SUBMISSION STATISTICS
  // =====================================================

  const submittedCount = useMemo(() => {
    return submissions.filter(
      (submission) =>
        submission.status === "SUBMITTED",
    ).length;
  }, [submissions]);

  const gradedCount = useMemo(() => {
    return submissions.filter(
      (submission) =>
        submission.status === "GRADED",
    ).length;
  }, [submissions]);

  const lateCount = useMemo(() => {
    return submissions.filter(
      (submission) =>
        submission.status === "LATE",
    ).length;
  }, [submissions]);

  // =====================================================
  // RECENT SUBMISSIONS
  // =====================================================

  const recentSubmissions = submissions.slice(
    0,
    6,
  );

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2
            size={32}
            className="animate-spin text-indigo-600"
          />

          <p className="text-sm text-slate-500">
            Loading admin dashboard...
          </p>
        </div>
      </div>
    );
  }

  // =====================================================
  // DASHBOARD
  // =====================================================

  return (
    <div className="space-y-8 p-6 lg:p-8">
      {/* =================================================
          HEADER
      ================================================= */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-indigo-600">
            Administration
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
            Admin Dashboard
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Monitor and manage your academy from one
            place.
          </p>
        </div>

        <Link
          href="/admin/users"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
        >
          <Users size={18} />

          Manage Users
        </Link>
      </div>

      {/* =================================================
          ERROR
      ================================================= */}

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4">
          <p className="text-sm font-medium text-red-700">
            {error}
          </p>
        </div>
      )}

      {/* =================================================
          CORE STATISTICS
      ================================================= */}

      <section>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-slate-900">
            Academy Overview
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Overview of users and academic structure.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total Users"
            value={users.length}
            icon={Users}
            href="/admin/users"
            description="All registered users"
          />

          <StatCard
            title="Teachers"
            value={teachers.length}
            icon={GraduationCap}
            href="/admin/teachers"
            description="Teaching staff"
          />

          <StatCard
            title="Students"
            value={students.length}
            icon={UserRound}
            href="/admin/students"
            description="Registered students"
          />

          <StatCard
            title="Classes"
            value={classes.length}
            icon={School}
            href="/admin/classes"
            description="Available classes"
          />
        </div>
      </section>

      {/* =================================================
          ACADEMIC STATISTICS
      ================================================= */}

      <section>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-slate-900">
            Academic Activity
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Assignments, subjects and student submissions.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard
            title="Subjects"
            value={subjects.length}
            icon={BookOpen}
            href="/admin/subjects"
            description="Academic subjects"
          />

          <StatCard
            title="Assignments"
            value={assignments.length}
            icon={ClipboardList}
            href="/admin/assignments"
            description="Created assignments"
          />

          <StatCard
            title="Submissions"
            value={submissions.length}
            icon={FileCheck}
            href="/admin/submissions"
            description="Student submissions"
          />
        </div>
      </section>

      {/* =================================================
          SUBMISSION OVERVIEW + QUICK ACTIONS
      ================================================= */}

      <section className="grid gap-6 xl:grid-cols-3">
        {/* Submission Overview */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-2">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Submission Overview
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Current submission status across the
                academy.
              </p>
            </div>

            <Link
              href="/admin/submissions"
              className="shrink-0 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
            >
              View all
            </Link>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <OverviewCard
              label="Submitted"
              value={submittedCount}
              icon={Clock3}
            />

            <OverviewCard
              label="Graded"
              value={gradedCount}
              icon={CheckCircle2}
            />

            <OverviewCard
              label="Late"
              value={lateCount}
              icon={AlertCircle}
            />
          </div>
        </div>

        {/* Quick Actions */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            Quick Actions
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Frequently used administration tools.
          </p>

          <div className="mt-5 space-y-2">
            <QuickAction
              href="/admin/users"
              label="Manage Users"
            />

            <QuickAction
              href="/admin/teachers"
              label="Manage Teachers"
            />

            <QuickAction
              href="/admin/students"
              label="Manage Students"
            />

            <QuickAction
              href="/admin/classes"
              label="Manage Classes"
            />

            <QuickAction
              href="/admin/subjects"
              label="Manage Subjects"
            />
          </div>
        </div>
      </section>

      {/* =================================================
          RECENT SUBMISSIONS
      ================================================= */}

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* Table Header */}

        <div className="flex flex-col gap-3 border-b border-slate-200 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Recent Submissions
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Latest student submission activity.
            </p>
          </div>

          <Link
            href="/admin/submissions"
            className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
          >
            View all
            <ArrowUpRight size={15} />
          </Link>
        </div>

        {/* Table */}

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Student
                </th>

                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Assignment
                </th>

                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Teacher
                </th>

                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Class
                </th>

                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Status
                </th>

                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Marks
                </th>

                <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {recentSubmissions.map(
                (submission) => (
                  <tr
                    key={submission.id}
                    className="transition hover:bg-slate-50"
                  >
                    {/* Student */}

                    <td className="px-6 py-4">
                      <p className="text-sm font-semibold text-slate-900">
                        {submission.student_name}
                      </p>
                    </td>

                    {/* Assignment */}

                    <td className="px-6 py-4">
                      <p className="max-w-[220px] truncate text-sm text-slate-700">
                        {submission.assignment_title}
                      </p>
                    </td>

                    {/* Teacher */}

                    <td className="px-6 py-4">
                      <p className="text-sm text-slate-600">
                        {submission.teacher_name ||
                          "—"}
                      </p>
                    </td>

                    {/* Class */}

                    <td className="px-6 py-4">
                      <p className="text-sm text-slate-600">
                        {submission.class_name ||
                          "—"}
                      </p>
                    </td>

                    {/* Status */}

                    <td className="px-6 py-4">
                      <StatusBadge
                        status={
                          submission.status ||
                          "SUBMITTED"
                        }
                      />
                    </td>

                    {/* Marks */}

                    <td className="px-6 py-4">
                      <p className="text-sm font-semibold text-slate-700">
                        {submission.marks ??
                          "Not graded"}

                        {submission.marks !==
                          null &&
                          submission.marks !==
                            undefined &&
                          submission.max_marks !==
                            undefined &&
                          ` / ${submission.max_marks}`}
                      </p>
                    </td>

                    {/* Action */}

                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/admin/submissions/${submission.id}`}
                        className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
                      >
                        View
                        <ArrowUpRight
                          size={14}
                        />
                      </Link>
                    </td>
                  </tr>
                ),
              )}

              {/* Empty State */}

              {recentSubmissions.length ===
                0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-14 text-center"
                  >
                    <FileCheck
                      size={36}
                      className="mx-auto text-slate-300"
                    />

                    <p className="mt-3 text-sm font-medium text-slate-700">
                      No submissions yet
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Student submissions will appear
                      here.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* =================================================
          FOOTER SUMMARY
      ================================================= */}

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Total Assignments
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-900">
            {assignments.length}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Total Submissions
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-900">
            {submissions.length}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Grading Progress
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-900">
            {submissions.length > 0
              ? Math.round(
                  (gradedCount /
                    submissions.length) *
                    100,
                )
              : 0}
            %
          </p>
        </div>
      </div>
    </div>
  );
}