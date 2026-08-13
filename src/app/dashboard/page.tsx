"use client";

import { useEffect, useState } from "react";

import { getRole } from "@/lib/auth";
import type { UserRole } from "@/types/auth";

import TeacherDashboard from "@/components/dashboard/teacher/TeacherDashboard";
import StudentDashboard from "@/components/dashboard/student/StudentDashboard";

export default function DashboardPage() {
  const [role, setRole] = useState<UserRole | null>(null);

  useEffect(() => {
    setRole(getRole());
  }, []);

  if (!role) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-slate-500">
          Loading dashboard...
        </p>
      </div>
    );
  }

  if (role === "TEACHER") {
    return <TeacherDashboard />;
  }

  if (role === "STUDENT") {
    return <StudentDashboard />;
  }

  return (
    <div className="p-6">
      <p className="text-sm text-red-500">
        You do not have access to this dashboard.
      </p>
    </div>
  );
}