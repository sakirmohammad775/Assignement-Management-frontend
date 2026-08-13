"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  ShieldCheck,
  UserCircle,
  UserRound,
} from "lucide-react";

import { getUser } from "@/lib/auth";
import type { User } from "@/types/auth";

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setUser(getUser());
  }, []);

  if (!user) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-slate-500">
          Loading profile...
        </p>
      </div>
    );
  }

  const fullName =
    [user.first_name, user.last_name]
      .filter(Boolean)
      .join(" ") || user.username;

  const initial =
    user.first_name?.charAt(0).toUpperCase() ||
    user.username?.charAt(0).toUpperCase() ||
    "U";

  return (
    <div className="mx-auto max-w-5xl p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
        >
          <ArrowLeft size={17} />
          Back to Dashboard
        </Link>

        <div className="mt-5">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            My Profile
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            View your account information and profile details.
          </p>
        </div>
      </div>

      {/* Profile Hero */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* Cover */}
        <div className="h-32 bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-500 sm:h-40" />

        {/* Profile information */}
        <div className="px-5 pb-6 sm:px-8">
          <div className="-mt-12 flex flex-col gap-5 sm:-mt-14 sm:flex-row sm:items-end sm:justify-between">
            {/* Avatar */}
            <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-white bg-indigo-100 text-3xl font-bold text-indigo-700 shadow-md sm:h-28 sm:w-28 sm:text-4xl">
              {initial}
            </div>

            {/* Role */}
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-indigo-700">
                <ShieldCheck size={14} />
                {user.role}
              </span>
            </div>
          </div>

          {/* Name */}
          <div className="mt-5">
            <h2 className="text-2xl font-bold text-slate-900">
              {fullName}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              @{user.username}
            </p>
          </div>
        </div>
      </div>

      {/* Information */}
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Account information */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
              <UserCircle size={20} />
            </div>

            <div>
              <h2 className="font-semibold text-slate-900">
                Account Information
              </h2>

              <p className="text-xs text-slate-500">
                Your basic account details
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {/* First name */}
            <InfoItem
              label="First Name"
              value={user.first_name || "Not provided"}
            />

            {/* Last name */}
            <InfoItem
              label="Last Name"
              value={user.last_name || "Not provided"}
            />

            {/* Username */}
            <InfoItem
              label="Username"
              value={user.username}
            />

            {/* Email */}
            <InfoItem
              label="Email"
              value={user.email || "Not provided"}
              icon={<Mail size={16} />}
            />

            {/* Role */}
            <InfoItem
              label="Role"
              value={user.role}
              icon={<ShieldCheck size={16} />}
            />

            {/* User ID */}
            <InfoItem
              label="User ID"
              value={String(user.id)}
              icon={<UserRound size={16} />}
            />
          </div>
        </div>

        {/* Account status */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-semibold text-slate-900">
            Account Status
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Current account information
          </p>

          <div className="mt-6 space-y-4">
            <div className="rounded-xl bg-green-50 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <ShieldCheck size={18} />
                </div>

                <div>
                  <p className="text-sm font-semibold text-green-800">
                    Active
                  </p>

                  <p className="text-xs text-green-600">
                    Account is active
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Role
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-800">
                {user.role}
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Username
              </p>

              <p className="mt-1 truncate text-sm font-semibold text-slate-800">
                @{user.username}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Future settings */}
      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-semibold text-slate-900">
              Profile Settings
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Profile editing and password management can be added here.
            </p>
          </div>

          <button
            type="button"
            disabled
            className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-400"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}

interface InfoItemProps {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

function InfoItem({
  label,
  value,
  icon,
}: InfoItemProps) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <div className="mt-2 flex items-center gap-2">
        {icon && (
          <span className="text-slate-400">
            {icon}
          </span>
        )}

        <p className="truncate text-sm font-medium text-slate-800">
          {value}
        </p>
      </div>
    </div>
  );
}