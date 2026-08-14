"use client";

import { FormEvent, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CalendarDays, Loader2, User } from "lucide-react";

import {
  getSubmission,
  gradeSubmission,
  type Submission,
} from "@/services/submission.service";

import { getUser } from "@/lib/auth";

export default function SubmissionDetailsPage() {
  const params = useParams();

  const id = Number(params.id);

  const user = getUser();
  const isTeacher = user?.role === "TEACHER";

  const [submission, setSubmission] = useState<Submission | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [marks, setMarks] = useState("");
  const [feedback, setFeedback] = useState("");
  const [saving, setSaving] = useState(false);
  const [gradeError, setGradeError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    async function loadSubmission() {
      try {
        const data = await getSubmission(id);

        setSubmission(data);

        setMarks(
          data.marks !== null && data.marks !== undefined
            ? String(data.marks)
            : "",
        );

        setFeedback(data.feedback ?? "");
      } catch (error: any) {
        console.error(error);

        setError(error?.response?.data?.detail || "Failed to load submission.");
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadSubmission();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 size={24} className="animate-spin text-slate-500" />
      </div>
    );
  }
  async function handleGrade(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!submission) return;

    setGradeError("");
    setSuccess("");

    const numericMarks = Number(marks);

    if (marks.trim() === "") {
      setGradeError("Please enter marks.");
      return;
    }

    if (Number.isNaN(numericMarks)) {
      setGradeError("Marks must be a valid number.");
      return;
    }

    if (numericMarks < 0) {
      setGradeError("Marks cannot be negative.");
      return;
    }

    if (
      submission.max_marks !== undefined &&
      numericMarks > submission.max_marks
    ) {
      setGradeError(`Marks cannot exceed ${submission.max_marks}.`);
      return;
    }

    try {
      setSaving(true);

      const updated = await gradeSubmission(submission.id, {
        marks: numericMarks,
        feedback: feedback.trim(),
      });

      setSubmission(updated);

      setMarks(
        updated.marks !== null && updated.marks !== undefined
          ? String(updated.marks)
          : "",
      );

      setFeedback(updated.feedback ?? "");

      setSuccess("Grade saved successfully.");
    } catch (error: any) {
      console.error("GRADING ERROR:", error);

      setGradeError(
        error?.response?.data?.detail ||
          error?.response?.data?.marks?.[0] ||
          error?.response?.data?.non_field_errors?.[0] ||
          "Failed to save grade.",
      );
    } finally {
      setSaving(false);
    }
  }

  if (!submission) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-600">
        {error || "Submission not found."}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      {/* Back */}
      <Link
        href="/admin/submissions"
        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900"
      >
        <ArrowLeft size={16} />
        Back to submissions
      </Link>

      {/* Header */}
      <div className="mt-5 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
            {submission.status || "SUBMITTED"}
          </span>

          {submission.max_marks !== undefined && (
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
              Max: {submission.max_marks}
            </span>
          )}
        </div>

        <h1 className="mt-4 text-2xl font-bold text-slate-900">
          {submission.assignment_title}
        </h1>

        <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
          <CalendarDays size={17} />
          Submitted {new Date(submission.submitted_at).toLocaleString()}
        </div>
      </div>

      {/* Answer */}
      <div className="mt-5 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
        <h2 className="text-sm font-semibold text-slate-900">Student Answer</h2>

        <div className="mt-4 rounded-lg bg-slate-50 p-5">
          <p className="whitespace-pre-wrap text-sm leading-7 text-slate-700">
            {submission.answer}
          </p>
        </div>
      </div>

      {/* Result */}
      <div className="mt-5 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
        <h2 className="text-sm font-semibold text-slate-900">Result</h2>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg bg-slate-50 p-4">
            <p className="text-xs text-slate-500">Marks</p>

            <p className="mt-1 text-xl font-bold text-slate-900">
              {submission.marks ?? "Not graded"}
              {submission.max_marks !== undefined &&
                submission.marks !== null && <> / {submission.max_marks}</>}
            </p>
          </div>

          <div className="rounded-lg bg-slate-50 p-4">
            <p className="text-xs text-slate-500">Feedback</p>

            <p className="mt-1 text-sm text-slate-700">
              {submission.feedback || "No feedback yet."}
            </p>
          </div>
        </div>
      </div>

      {/* Student graded message */}
      {submission.status === "GRADED" && !isTeacher && (
        <div className="mt-5 rounded-xl border border-green-200 bg-green-50 p-4">
          <p className="font-semibold text-green-800">Assignment Graded</p>

          <p className="mt-1 text-sm text-green-700">
            Your teacher has graded this submission. You can no longer modify
            your answer.
          </p>
        </div>
      )}

      {/* Teacher grading */}

      {/* Teacher grading */}
      {/* Teacher grading */}
      {isTeacher && (
        <form
          onSubmit={handleGrade}
          className="mt-5 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"
        >
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Grade Submission
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Review the student answer and provide marks and feedback.
            </p>
          </div>

          {/* Marks */}
          <div className="mt-6">
            <label
              htmlFor="marks"
              className="text-sm font-semibold text-slate-900"
            >
              Marks
            </label>

            <div className="mt-2 flex items-center gap-2">
              <input
                id="marks"
                type="number"
                min="0"
                max={submission.max_marks}
                value={marks}
                onChange={(event) => setMarks(event.target.value)}
                disabled={saving}
                className="w-32 rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 disabled:bg-slate-50"
                placeholder="0"
              />

              {submission.max_marks !== undefined && (
                <span className="text-sm text-slate-500">
                  / {submission.max_marks}
                </span>
              )}
            </div>
          </div>

          {/* Feedback */}
          <div className="mt-5">
            <label
              htmlFor="feedback"
              className="text-sm font-semibold text-slate-900"
            >
              Feedback
            </label>

            <textarea
              id="feedback"
              rows={5}
              value={feedback}
              onChange={(event) => setFeedback(event.target.value)}
              disabled={saving}
              placeholder="Write feedback for the student..."
              className="mt-2 w-full resize-y rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 disabled:bg-slate-50"
            />
          </div>

          {/* Error */}
          {gradeError && (
            <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
              {gradeError}
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="mt-4 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700">
              {success}
            </div>
          )}

          {/* Save */}
          <div className="mt-5 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-[#6b1d2f] px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save Grade"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
