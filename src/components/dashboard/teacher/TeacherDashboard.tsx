"use client";

import { useEffect, useState } from "react";

import {
  ClipboardList,
  BookOpen,
  Users,
  Clock,
  CalendarDays,
} from "lucide-react";

import StatCard from "@/components/dashboard/shared/StatCard";
import StatusBadge from "@/components/dashboard/shared/StatusBadge";
import EmptyState from "@/components/dashboard/shared/EmptyState";

import {
  getAssignments,
  type Assignment,
} from "@/services/assignment.service";

import {
  getSubmissions,
  type Submission,
} from "@/services/submission.service";

import {
  getTeacherClasses,
  getTeacherSubjects,
  type TeacherClass,
  type TeacherSubject,
} from "@/services/teacher.service";

export default function TeacherDashboard() {
  const [assignments, setAssignments] = useState<
    Assignment[]
  >([]);

  const [submissions, setSubmissions] = useState<
    Submission[]
  >([]);

  const [classes, setClasses] = useState<
    TeacherClass[]
  >([]);

  const [subjects, setSubjects] = useState<
    TeacherSubject[]
  >([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDashboard() {
      try {
        setLoading(true);
        setError("");

        const [
          assignmentsData,
          submissionsData,
          classesData,
          subjectsData,
        ] = await Promise.all([
          getAssignments(),
          getSubmissions(),
          getTeacherClasses(),
          getTeacherSubjects(),
        ]);

        setAssignments(assignmentsData);
        setSubmissions(submissionsData);
        setClasses(classesData);
        setSubjects(subjectsData);
      } catch (error) {
        console.error(
          "TEACHER DASHBOARD ERROR:",
          error,
        );

        setError(
          "Failed to load dashboard data.",
        );
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  /*
   * Loading
   */
  if (loading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-indigo-600" />

            <p className="mt-3 text-sm text-slate-500">
              Loading teacher dashboard...
            </p>
          </div>
        </div>
      </div>
    );
  }

  /*
   * Error
   */
  if (error) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="rounded-xl border border-red-200 bg-red-50 p-5">
          <h2 className="font-semibold text-red-800">
            Something went wrong
          </h2>

          <p className="mt-1 text-sm text-red-600">
            {error}
          </p>
        </div>
      </div>
    );
  }

  /*
   * Pending grading
   *
   * Teacher submissions that haven't been graded.
   */
  const pendingSubmissions =
    submissions.filter(
      (submission) =>
        submission.status !== "GRADED",
    );

  /*
   * Recent assignments
   */
  const recentAssignments = [...assignments]
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() -
        new Date(a.created_at).getTime(),
    )
    .slice(0, 5);

  return (
    <div className="p-4 sm:p-6 lg:p-8">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Teacher Dashboard
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage your classes, assignments, and
          student submissions.
        </p>
      </div>

      {/* Stats */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

        <StatCard
          label="My Classes"
          value={classes.length}
          icon={Users}
          description="Classes you teach"
        />

        <StatCard
          label="My Subjects"
          value={subjects.length}
          icon={BookOpen}
          description="Subjects you teach"
        />

        <StatCard
          label="Assignments"
          value={assignments.length}
          icon={ClipboardList}
          description="Created assignments"
        />

        <StatCard
          label="Pending Grading"
          value={pendingSubmissions.length}
          icon={Clock}
          description="Submissions to review"
        />

      </div>

      {/* Main */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">

        {/* Recent assignments */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-slate-900">
                Recent Assignments
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Your latest assignments
              </p>
            </div>

            <ClipboardList
              size={20}
              className="text-slate-400"
            />
          </div>

          <div className="mt-5 space-y-3">

            {recentAssignments.length === 0 ? (
              <EmptyState
                message="No assignments yet."
              />
            ) : (
              recentAssignments.map(
                (assignment) => (
                  <div
                    key={assignment.id}
                    className="rounded-lg border border-slate-100 p-4 transition hover:bg-slate-50"
                  >
                    <div className="flex items-start justify-between gap-3">

                      <div className="min-w-0">
                        <h3 className="truncate text-sm font-semibold text-slate-900">
                          {assignment.title}
                        </h3>

                        <p className="mt-1 text-xs text-slate-500">
                          {assignment.subject_name}
                          {" · "}
                          {assignment.class_name}
                        </p>
                      </div>

                      <StatusBadge
                        status={
                          assignment.status
                        }
                      />
                    </div>

                    <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
                      <CalendarDays
                        size={14}
                      />

                      Deadline:
                      {" "}
                      {new Date(
                        assignment.deadline,
                      ).toLocaleDateString()}
                    </div>
                  </div>
                ),
              )
            )}

          </div>
        </div>

        {/* Pending submissions */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-slate-900">
                Pending Submissions
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Submissions waiting for grading
              </p>
            </div>

            <Clock
              size={20}
              className="text-slate-400"
            />
          </div>

          <div className="mt-5 space-y-3">

            {pendingSubmissions.length === 0 ? (
              <EmptyState
                message="No pending submissions."
              />
            ) : (
              pendingSubmissions
                .slice(0, 5)
                .map((submission) => (
                  <div
                    key={submission.id}
                    className="rounded-lg border border-slate-100 p-4 transition hover:bg-slate-50"
                  >
                    <div className="flex items-start justify-between gap-3">

                      <div className="min-w-0">
                        <h3 className="truncate text-sm font-semibold text-slate-900">
                          {submission.assignment_title}
                        </h3>

                        <p className="mt-1 text-xs text-slate-500">
                          Student:{" "}
                          {submission.student_name}
                        </p>
                      </div>

                      <StatusBadge
                        status={
                          submission.status ||
                          "SUBMITTED"
                        }
                      />
                    </div>

                    <p className="mt-3 text-xs text-slate-500">
                      Submitted{" "}
                      {new Date(
                        submission.submitted_at,
                      ).toLocaleDateString()}
                    </p>
                  </div>
                ))
            )}

          </div>
        </div>

      </div>
    </div>
  );
}