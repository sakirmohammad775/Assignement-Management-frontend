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
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-[#0F1F3D] text-white transition-transform duration-200 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-white/10 px-5">
          <Link
            href={role === "ADMIN" ? "/admin" : "/dashboard"}
            className="flex items-center gap-2 text-lg font-bold"
            onClick={onClose}
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500">
              <GraduationCap size={20} />
            </div>
            EduAssign
          </Link>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-white lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Role */}
        <div className="px-5 pt-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            {role || "Account"}
          </p>
        </div>

        {/* Navigation */}
        <div className="px-4 py-4">
          <nav className="space-y-1">
            {visibleNavigation.map((item) => {
              const Icon = item.icon;

              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={`${item.label}-${item.href}`}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                    active
                      ? "bg-indigo-600 text-white"
                      : "text-slate-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon size={18} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom */}
        <div className="mt-auto border-t border-white/10 p-4">
          <Link
            href={role === "ADMIN" ? "/admin/settings" : "/dashboard/settings"}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-300 hover:bg-white/10 hover:text-white"
          >
            <Settings size={18} />
            Settings
          </Link>

          <button
            onClick={handleLogout}
            className="mt-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-300 hover:bg-white/10 hover:text-white"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
