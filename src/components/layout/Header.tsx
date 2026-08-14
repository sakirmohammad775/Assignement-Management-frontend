"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Bell,
  ChevronDown,
  Menu,
  GraduationCap,
  Sparkles
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
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200/80 bg-white/95 px-4 sm:px-8 backdrop-blur-md transition-all">
      
      {/* Left side: Mobile menu toggle + Mobile logo */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open menu"
          className="rounded-xl p-2.5 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 lg:hidden"
        >
          <Menu size={22} />
        </button>

        {/* Small Screen Brand Logo (visible only when sidebar is hidden on small viewports) */}
        <Link href="/">
        <div className="flex items-center gap-2 lg:hidden">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#6b1d2f] text-white shadow-sm">
            <GraduationCap size={18} />
          </div>
          <span className="text-base font-black tracking-wide text-slate-900">
           
            EduAssign<span className="text-[#6b1d2f]">.</span>
          </span>
        </div>
        </Link>
      </div>

      {/* Centered desktop badge & title */}
      <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-2 rounded-full border border-red-100 bg-red-50/50 px-4 py-1.5 shadow-sm lg:flex">
        <Sparkles className="h-3.5 w-3.5 text-[#6b1d2f]" />
        <p className="whitespace-nowrap text-xs font-bold tracking-wider text-slate-800 uppercase">
          Assignment Management System
        </p>
      </div>

      {/* Right side controls */}
      <div className="ml-auto flex items-center gap-3 sm:gap-5">

        {/* Notification Bell */}
        <button
          type="button"
          aria-label="Notifications"
          className="relative rounded-xl border border-slate-200/60 bg-slate-50 p-2.5 text-slate-600 transition hover:border-slate-300 hover:bg-slate-100 hover:text-slate-900"
        >
          <Bell size={19} />

          {/* Pulse notification dot in burgundy tone */}
          <span className="absolute right-2 top-2 flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#6b1d2f] ring-2 ring-white" />
          </span>
        </button>

        {/* Vertical Divider */}
        <div className="hidden h-8 w-px bg-slate-200/80 sm:block" />

        {/* Profile Card */}
        <Link
          href="/profile"
          className="group flex items-center gap-3 rounded-2xl border border-transparent p-1.5 transition-all hover:border-slate-200 hover:bg-slate-50/80"
        >
          {/* Avatar with gradient ring */}
          <div className="relative">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#6b1d2f] to-rose-800 text-sm font-black text-white shadow-sm shadow-red-950/20 group-hover:scale-105 transition-transform duration-200">
              {initial}
            </div>
            {/* Active Indicator Status Dot */}
            <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-white" />
          </div>

          {/* User information */}
          <div className="hidden text-left sm:block">
            <p className="max-w-[140px] truncate text-xs font-extrabold text-slate-900 leading-snug group-hover:text-[#6b1d2f] transition-colors">
              {displayName}
            </p>

            <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-[#6b1d2f]">
              {user?.role || "Account"}
            </span>
          </div>

          <ChevronDown
            size={16}
            className="hidden text-slate-400 transition-transform duration-200 group-hover:translate-y-0.5 group-hover:text-slate-700 sm:block"
          />
        </Link>
      </div>

    </header>
  );
}