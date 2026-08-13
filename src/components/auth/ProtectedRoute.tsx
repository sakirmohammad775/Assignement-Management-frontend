"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  getRole,
  isAuthenticated,
} from "@/lib/auth";

import type { UserRole } from "@/types/auth";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: UserRole[];
}

export default function ProtectedRoute({
  children,
  allowedRoles,
}: ProtectedRouteProps) {
  const router = useRouter();

  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const authenticated = isAuthenticated();
    const role = getRole();

    if (!authenticated || !role) {
      router.replace("/login");
      return;
    }

    if (allowedRoles && !allowedRoles.includes(role)) {
      if (role === "ADMIN") {
        router.replace("/admin");
      } else {
        router.replace("/dashboard");
      }

      return;
    }

    setChecking(false);
  }, [router, allowedRoles]);

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600" />

          <p className="mt-3 text-sm text-slate-500">
            Checking authentication...
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}