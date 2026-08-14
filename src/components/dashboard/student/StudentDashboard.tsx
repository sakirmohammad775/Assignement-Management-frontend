"use client";

import { useEffect, useMemo, useState } from "react";
import {
  BookOpen,
  CheckCircle2,
  Clock,
  GraduationCap,
  Loader2,
  ClipboardList,
} from "lucide-react";

import {
  getStudentAssignments,
  type Assignment,
} from "@/services/assignment.service";

import {
  getMySubmissions,
  type Submission,
} from "@/services/submission.service";

import {
  getMyStudentClass,
  type StudentClass,
} from "@/services/student.service";
import StatCard from "../shared/StatCard";

export default function StudentDashboardPage() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [studentClass, setStudentClass] = useState<StudentClass[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDashboard() {
      try {
        setLoading(true);
        setError("");

        // Load independently so one failed endpoint
        // does not destroy the entire dashboard.
        const [assignmentResult, submissionResult, classResult] =
          await Promise.allSettled([
            getStudentAssignments(),
            getMySubmissions(),
            getMyStudentClass(),
          ]);

        if (assignmentResult.status === "fulfilled") {
          setAssignments(assignmentResult.value);
        } else {
          console.error("Student assignments error:", assignmentResult.reason);
        }

        if (submissionResult.status === "fulfilled") {
          setSubmissions(submissionResult.value);
        } else {
          console.error("Student submissions error:", submissionResult.reason);
        }

        if (classResult.status === "fulfilled") {
          setStudentClass(classResult.value);
        } else {
          console.error("Student class error:", classResult.reason);
        }

        // Only show a dashboard-level error if all three requests fail.
        if (
          assignmentResult.status === "rejected" &&
          submissionResult.status === "rejected" &&
          classResult.status === "rejected"
        ) {
          setError("Failed to load dashboard data.");
        }
      } catch (error) {
        console.error("STUDENT DASHBOARD ERROR:", error);
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  const submittedAssignmentIds = useMemo(() => {
    return new Set(submissions.map((submission) => submission.assignment));
  }, [submissions]);

  const publishedAssignments = useMemo(() => {
    return assignments.filter(
      (assignment) => assignment.status === "PUBLISHED",
    );
  }, [assignments]);

  const pendingAssignments = useMemo(() => {
    return publishedAssignments.filter(
      (assignment) => !submittedAssignmentIds.has(assignment.id),
    );
  }, [publishedAssignments, submittedAssignmentIds]);

  const gradedSubmissions = useMemo(() => {
    return submissions.filter((submission) => submission.status === "GRADED");
  }, [submissions]);

  const recentAssignments = useMemo(() => {
    return [...publishedAssignments]
      .sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      )
      .slice(0, 5);
  }, [publishedAssignments]);

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex items-center gap-2 text-slate-500">
          <Loader2 size={20} className="animate-spin" />
          Loading dashboard...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          Student Dashboard
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Track your assignments, submissions and academic progress.
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Class */}
      {studentClass.length > 0 && (
        <div className="flex items-center gap-3 rounded-xl border border-indigo-100 bg-rose-50 p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#6b1d2f] text-white">
            <GraduationCap size={21} />
          </div>

          <div>
            <p className="text-xs font-medium text-[#6b1d2f]">My Class</p>

            <p className="font-semibold text-slate-900">
              {studentClass[0].class_name}
            </p>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Assignments"
          value={publishedAssignments.length}
          icon={BookOpen}
          description="Published assignments"
        />

        <StatCard
          label="Pending"
          value={pendingAssignments.length}
          icon={Clock}
          description="Assignments pending"
        />

        <StatCard
          label="Submitted"
          value={submissions.length}
          icon={ClipboardList}
          description="Your submissions"
        />

        <StatCard
          label="Graded"
          value={gradedSubmissions.length}
          icon={CheckCircle2}
          description="Graded submissions"
        />
      </div>
      {/* Recent Assignments */}
      <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-5 py-4">
          <h2 className="font-semibold text-slate-900">Recent Assignments</h2>

          <p className="mt-1 text-sm text-slate-500">
            Your latest published assignments.
          </p>
        </div>

        {recentAssignments.length === 0 ? (
          <div className="px-5 py-12 text-center">
            <BookOpen size={38} className="mx-auto text-slate-300" />

            <p className="mt-3 font-medium text-slate-700">
              No assignments yet
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Your published assignments will appear here.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {recentAssignments.map((assignment) => {
              const submitted = submittedAssignmentIds.has(assignment.id);

              return (
                <div
                  key={assignment.id}
                  className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <h3 className="font-medium text-slate-900">
                      {assignment.title}
                    </h3>

                    <div className="mt-1 flex flex-wrap gap-3 text-xs text-slate-500">
                      <span>{assignment.subject_name}</span>

                      <span>
                        Due {new Date(assignment.deadline).toLocaleDateString()}
                      </span>

                      <span>{assignment.max_marks} marks</span>
                    </div>
                  </div>

                  <span
                    className={`w-fit rounded-full px-2.5 py-1 text-xs font-semibold ${
                      submitted
                        ? "bg-green-100 text-green-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {submitted ? "Submitted" : "Pending"}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Quick Summary */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Pending */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
              <Clock size={20} />
            </div>

            <div>
              <p className="text-sm font-medium text-slate-500">
                Pending Assignments
              </p>

              <p className="text-2xl font-bold text-slate-900">
                {pendingAssignments.length}
              </p>
            </div>
          </div>

          <p className="mt-4 text-sm text-slate-500">
            Complete and submit these assignments before their deadlines.
          </p>
        </div>

        {/* Results */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600">
              <CheckCircle2 size={20} />
            </div>

            <div>
              <p className="text-sm font-medium text-slate-500">
                Graded Submissions
              </p>

              <p className="text-2xl font-bold text-slate-900">
                {gradedSubmissions.length}
              </p>
            </div>
          </div>

          <p className="mt-4 text-sm text-slate-500">
            Your graded submissions and feedback are available in your
            submissions section.
          </p>
        </div>
      </div>
    </div>
  );
}
