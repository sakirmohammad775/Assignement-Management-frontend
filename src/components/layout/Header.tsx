"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Bell,
  ChevronDown,
  Menu,
} from "lucide-react";

import { getUser } from "@/lib/auth";
import type { User } from "@/types/auth";

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({
  onMenuClick,
}: HeaderProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setUser(getUser());
  }, []);

  const displayName =
    [user?.first_name, user?.last_name]
      .filter(Boolean)
      .join(" ") ||
    user?.username ||
    "User";

  const initial =
    user?.first_name?.charAt(0).toUpperCase() ||
    user?.username?.charAt(0).toUpperCase() ||
    "U";

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center border-b border-slate-200 bg-white px-4 sm:px-6">
      
      {/* Mobile menu */}
      <button
        type="button"
        onClick={onMenuClick}
        aria-label="Open menu"
        className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 lg:hidden"
      >
        <Menu size={22} />
      </button>

      {/* Centered desktop title */}
      <div className="absolute left-1/2 hidden -translate-x-1/2 lg:block">
        <p className="whitespace-nowrap text-sm font-semibold tracking-wide text-slate-700">
          Assignment Management System
        </p>
      </div>

      {/* Right side */}
      <div className="ml-auto flex items-center gap-2 sm:gap-4">

        {/* Notification */}
        <button
          type="button"
          aria-label="Notifications"
          className="relative rounded-lg p-2.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
        >
          <Bell size={20} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-indigo-600 ring-2 ring-white" />
        </button>

        {/* Divider */}
        <div className="hidden h-8 w-px bg-slate-200 sm:block" />

        {/* Profile */}
        <Link
          href="/profile"
          className="group flex items-center gap-2 rounded-xl px-2 py-1.5 transition hover:bg-slate-50"
        >
          {/* Avatar */}
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700 ring-2 ring-transparent transition group-hover:ring-indigo-100">
            {initial}
          </div>

          {/* User info */}
          <div className="hidden text-left sm:block">
            <p className="max-w-[140px] truncate text-sm font-semibold text-slate-800">
              {displayName}
            </p>

            <p className="text-[11px] font-semibold uppercase tracking-wider text-indigo-500">
              {user?.role || "Account"}
            </p>
          </div>

          <ChevronDown
            size={16}
            className="hidden text-slate-400 transition group-hover:text-slate-600 sm:block"
          />
        </Link>
      </div>
    </header>
  );
}