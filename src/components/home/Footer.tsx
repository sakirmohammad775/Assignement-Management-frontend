import Link from "next/link";
import { GraduationCap, Mail, ArrowUpRight, GitBranch } from "lucide-react";

const productLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
];

const platformLinks = [
  { label: "Teacher", href: "/login" },
  { label: "Student", href: "/login" },
  { label: "Administrator", href: "/login" },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-sm">
                <GraduationCap size={22} />
              </div>

              <div>
                <p className="text-lg font-bold tracking-tight text-slate-900">
                  EduAssign
                </p>

                <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                  Assignment Management
                </p>
              </div>
            </Link>

            <p className="mt-5 max-w-md text-sm leading-6 text-slate-600">
              A simple platform for managing academic assignments,
              submissions, grading and feedback. Built to connect
              administrators, teachers and students.
            </p>

            {/* Social / Contact */}
            <div className="mt-6 flex items-center gap-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
              >
                <GitBranch size={17} />
              </a>

              <a
                href="mailto:contact@eduassign.com"
                aria-label="Email"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
              >
                <Mail size={17} />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              Product
            </h3>

            <ul className="mt-4 space-y-3">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-500 transition hover:text-indigo-600"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              Platform
            </h3>

            <ul className="mt-4 space-y-3">
              {platformLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-1 text-sm text-slate-500 transition hover:text-indigo-600"
                  >
                    {link.label}

                    <ArrowUpRight
                      size={13}
                      className="opacity-0 transition group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col gap-4 border-t border-slate-100 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-500">
            © 2026 EduAssign. All rights reserved.
          </p>

          <div className="flex items-center gap-5 text-xs text-slate-500">
            <a
              href="#"
              className="transition hover:text-slate-900"
            >
              Privacy
            </a>

            <a
              href="#"
              className="transition hover:text-slate-900"
            >
              Terms
            </a>

            <Link
              href="/login"
              className="font-medium text-indigo-600 transition hover:text-indigo-700"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}