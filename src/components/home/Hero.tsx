import { ArrowRight, CheckCircle2, Link } from "lucide-react";

export default function Hero(){
    return(
        <section className="overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-2 lg:px-8">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700">
              <CheckCircle2 size={16} />
              Simple assignment management
            </div>

            <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Manage assignments.
              <span className="block text-indigo-600">
                Simplify learning.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
              A centralized platform for teachers and students to create,
              submit, review and manage academic assignments.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700"
              >
                Get Started
                <ArrowRight size={18} />
              </Link>

              <a
                href="#features"
                className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Explore Features
              </a>
            </div>
          </div>

          {/* Dashboard Preview */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xl sm:p-6">
            <div className="rounded-xl bg-slate-900 p-4 sm:p-5">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-400">
                    Teacher Dashboard
                  </p>

                  <h2 className="mt-1 text-lg font-semibold text-white">
                    Overview
                  </h2>
                </div>

                <div className="h-9 w-9 rounded-full bg-indigo-500" />
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[
                  ["12", "Assignments"],
                  ["8", "Pending"],
                  ["34", "Submissions"],
                ].map(([value, label]) => (
                  <div
                    key={label}
                    className="rounded-lg bg-slate-800 p-3"
                  >
                    <p className="text-xl font-bold text-white">
                      {value}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-lg bg-white p-4">
                <p className="text-sm font-semibold text-slate-900">
                  Recent Assignments
                </p>

                <div className="mt-3 space-y-3">
                  {[
                    "Mathematics Assignment",
                    "Physics Assignment",
                    "Programming Assignment",
                  ].map((assignment, index) => (
                    <div
                      key={assignment}
                      className="flex items-center justify-between border-b border-slate-100 pb-3 last:border-0 last:pb-0"
                    >
                      <span className="text-sm text-slate-700">
                        {assignment}
                      </span>

                      <span
                        className={`rounded-full px-2 py-1 text-xs font-medium ${
                          index === 1
                            ? "bg-amber-50 text-amber-700"
                            : "bg-green-50 text-green-700"
                        }`}
                      >
                        {index === 1 ? "Draft" : "Published"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
}