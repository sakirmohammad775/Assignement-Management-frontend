"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  ClipboardList,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Settings,
  ShieldAlert,
  UserCheck,
  Users,
  X,
} from "lucide-react";

import { getRole, clearAuth } from "@/lib/auth";
import type { UserRole } from "@/types/auth";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

interface NavigationItem {
  label: string;
  href: string;
  icon: React.ElementType;
  roles: UserRole[];
}

const navigation: NavigationItem[] = [
  // =========================
  // TEACHER
  // =========================
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    roles: ["TEACHER"],
  },
  {
    label: "Assignments",
    href: "/dashboard/assignments",
    icon: ClipboardList,
    roles: ["TEACHER"],
  },
  {
    label: "Submissions",
    href: "/dashboard/submissions",
    icon: BookOpen,
    roles: ["TEACHER"],
  },
  {
    label: "Classes",
    href: "/dashboard/classes",
    icon: Users,
    roles: ["TEACHER"],
  },
  {
    label: "Subjects",
    href: "/dashboard/subjects",
    icon: BookOpen,
    roles: ["TEACHER"],
  },

  // =========================
  // STUDENT
  // =========================
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    roles: ["STUDENT"],
  },
  {
    label: "My Assignments",
    href: "/dashboard/assignments",
    icon: ClipboardList,
    roles: ["STUDENT"],
  },
  {
    label: "My Submissions",
    href: "/dashboard/submissions",
    icon: BookOpen,
    roles: ["STUDENT"],
  },

  // ADMIN

  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
    roles: ["ADMIN"],
  },
  {
    label: "Users",
    href: "/admin/users",
    icon: Users,
    roles: ["ADMIN"],
  },
  {
    label: "Classes",
    href: "/admin/classes",
    icon: Users,
    roles: ["ADMIN"],
  },
  {
    label: "Teachers",
    href: "/admin/teachers",
    icon: Users,
    roles: ["ADMIN"],
  },
  {
    label: "Students",
    href: "/admin/students",
    icon: Users,
    roles: ["ADMIN"],
  },
  {
    label: "Subjects",
    href: "/admin/subjects",
    icon: BookOpen,
    roles: ["ADMIN"],
  },
  // Monitoring
  {
    label: "Assignments",
    href: "/admin/assignments",
    icon: ClipboardList,
    roles: ["ADMIN"],
  },
  {
    label: "Submissions",
    href: "/admin/submissions",
    icon: BookOpen,
    roles: ["ADMIN"],
  },
];

export default function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();

  const role = getRole();

  const visibleNavigation = navigation.filter((item) =>
    role ? item.roles.includes(role) : false,
  );

  function handleLogout() {
    clearAuth();
    window.location.href = "/login";
  }

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <button
          aria-label="Close sidebar"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm transition-opacity lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-slate-950 border-r border-slate-800/80 text-slate-300 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand Logo Header */}
        <div className="flex h-20 items-center justify-between border-b border-slate-800/80 px-6">
          <Link
            href={role === "ADMIN" ? "/" : "/"}
            className="flex items-center gap-3 group"
            onClick={onClose}
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#6b1d2f] text-white shadow-md shadow-red-950/50 group-hover:bg-[#521523] transition-colors">
              <GraduationCap size={20} />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-extrabold tracking-wide text-white leading-tight">
                EduAssign<span className="text-[#6b1d2f]">.</span>
              </span>
              <span className="text-[9px] font-bold tracking-widest text-slate-400 uppercase">
                ACADEMIC PORTAL
              </span>
            </div>
          </Link>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-900 hover:text-white lg:hidden transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Role Badge Section */}
        <div className="px-6 pt-6 pb-2">
          <div className="flex items-center gap-2 rounded-xl bg-slate-900/90 border border-slate-800/60 px-3 py-2">
            {role === "ADMIN" ? (
              <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
            ) : (
              <UserCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            )}
            <div className="flex flex-col">
              <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                Logged in as
              </span>
              <span className="text-xs font-bold text-white tracking-wide">
                {role || "Account"}
              </span>
            </div>
          </div>
        </div>

        {/* Main Navigation Links */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
          <p className="px-3 pb-2 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
            Menu Navigation
          </p>
          <nav className="space-y-1.5">
            {visibleNavigation.map((item) => {
              const Icon = item.icon;

              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={`${item.label}-${item.href}`}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-semibold tracking-wide transition-all duration-200 ${
                    active
                      ? "bg-gradient-to-r from-[#6b1d2f] to-rose-900 text-white shadow-md shadow-red-950/40"
                      : "text-slate-400 hover:bg-slate-900 hover:text-white"
                  }`}
                >
                  <Icon size={18} className={active ? "text-white" : "text-slate-400"} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions Section */}
        <div className="mt-auto border-t border-slate-800/80 p-4 space-y-1 bg-slate-950">
          <Link
            href={role === "ADMIN" ? "/admin/settings" : "/dashboard/settings"}
            className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-semibold tracking-wide transition-colors ${
              pathname.includes("/settings")
                ? "bg-gradient-to-r from-[#6b1d2f] to-rose-900 text-white"
                : "text-slate-400 hover:bg-slate-900 hover:text-white"
            }`}
          >
            <Settings size={18} />
            Settings
          </Link>

          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-semibold tracking-wide text-rose-400/90 hover:bg-rose-950/40 hover:text-rose-300 transition-colors"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

      </aside>
    </>
  );
}
