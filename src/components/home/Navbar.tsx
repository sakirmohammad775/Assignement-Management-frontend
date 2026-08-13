import Link from "next/link";
import { GraduationCap, Menu } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2.5"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-sm transition group-hover:bg-indigo-700">
            <GraduationCap size={21} strokeWidth={2.2} />
          </div>

          <div className="flex flex-col leading-none">
            <span className="text-lg font-bold tracking-tight text-slate-900">
              EduAssign
            </span>

          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-7 sm:flex">
          <a
            href="#features"
            className="text-sm font-medium text-slate-600 transition hover:text-indigo-600"
          >
            Features
          </a>

          <a
            href="#how-it-works"
            className="text-sm font-medium text-slate-600 transition hover:text-indigo-600"
          >
            How It Works
          </a>

          <Link
            href="/login"
            className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
          >
            Sign In
          </Link>
        </nav>

        {/* Mobile */}
        <div className="flex items-center gap-2 sm:hidden">
          <Link
            href="/login"
            className="rounded-lg bg-indigo-600 px-3.5 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            Sign In
          </Link>

          <button
            type="button"
            aria-label="Open navigation menu"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
          >
            <Menu size={19} />
          </button>
        </div>
      </div>
    </header>
  );
}