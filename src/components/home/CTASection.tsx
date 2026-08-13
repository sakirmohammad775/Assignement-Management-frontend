import Link from "next/link";
import { ArrowRight, GraduationCap } from "lucide-react";

export default function CTASection() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-slate-900 px-6 py-12 text-center shadow-xl sm:px-12">
          {/* Decorative elements */}
          <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-indigo-600/20 blur-3xl" />

          <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-indigo-500/10 blur-3xl" />

          <div className="relative">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-white">
              <GraduationCap size={25} />
            </div>

            <h2 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to simplify assignment management?
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-300 sm:text-base">
              Bring teachers, students and administrators together with
              one simple academic assignment platform.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
              >
                Get Started
                <ArrowRight size={17} />
              </Link>

              <a
                href="#features"
                className="inline-flex items-center justify-center rounded-lg border border-slate-700 bg-slate-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
              >
                Explore Features
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}