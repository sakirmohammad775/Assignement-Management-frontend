"use client";

import { FormEvent, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  CalendarDays,
  Loader2,
  Send,
} from "lucide-react";

import {
  getAssignment,
  type Assignment,
} from "@/services/assignment.service";

import { createSubmission } from "@/services/submission.service";

export default function SubmitAssignmentPage() {
  const params = useParams();
  const router = useRouter();

  const id = Number(params.id);

  const [assignment, setAssignment] =
    useState<Assignment | null>(null);

  const [answer, setAnswer] = useState("");

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
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

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (!answer.trim()) {
      setError("Please enter your answer.");
      return;
    }

    try {
      setError("");
      setSubmitting(true);

      await createSubmission({
        assignment: id,
        answer: answer.trim(),
      });

      router.push("/dashboard/submissions");
    } catch (error: any) {
      console.error("SUBMISSION ERROR:", error);

      const message =
        error?.response?.data?.detail ||
        error?.response?.data?.non_field_errors?.[0] ||
        "Failed to submit assignment.";

      setError(message);
    } finally {
      setSubmitting(false);
    }
  }

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

  if (!assignment) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-600">
        {error || "Assignment not found."}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      {/* Back */}
      <Link
        href={`/dashboard/assignments/${id}`}
        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900"
      >
        <ArrowLeft size={16} />
        Back to assignment
      </Link>

      {/* Assignment summary */}
      <div className="mt-5 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
            PUBLISHED
          </span>

          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
            {assignment.max_marks} Marks
          </span>
        </div>

        <h1 className="mt-4 text-2xl font-bold text-slate-900">
          {assignment.title}
        </h1>

        <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-500">
          <span className="flex items-center gap-1.5">
            <BookOpen size={16} />
            {assignment.subject_name}
          </span>

          <span className="flex items-center gap-1.5">
            <CalendarDays size={16} />
            Due{" "}
            {new Date(
              assignment.deadline,
            ).toLocaleString()}
          </span>
        </div>
      </div>

      {/* Submission form */}
      <form
        onSubmit={handleSubmit}
        className="mt-5 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"
      >
        <div>
          <label
            htmlFor="answer"
            className="text-sm font-semibold text-slate-900"
          >
            Your Answer
          </label>

          <p className="mt-1 text-xs text-slate-500">
            Write your answer clearly and submit it before
            the deadline.
          </p>

          <textarea
            id="answer"
            value={answer}
            onChange={(event) =>
              setAnswer(event.target.value)
            }
            placeholder="Write your answer here..."
            rows={12}
            disabled={submitting}
            className="mt-3 w-full resize-y rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 disabled:bg-slate-50"
          />
        </div>

        {error && (
          <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Link
            href={`/dashboard/assignments/${id}`}
            className="inline-flex items-center justify-center rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#6b1d2f] px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? (
              <>
                <Loader2
                  size={17}
                  className="animate-spin"
                />
                Submitting...
              </>
            ) : (
              <>
                <Send size={17} />
                Submit Assignment
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}