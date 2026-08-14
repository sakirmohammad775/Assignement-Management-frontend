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
        <div className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white px-5 py-3 shadow-sm">
          <span className="h-2 w-2 rounded-full bg-[#6b1d2f] animate-ping" />
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Loading profile...
          </p>
        </div>
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
    <div className="mx-auto max-w-5xl space-y-6 p-4 sm:p-6 lg:p-8 bg-slate-50/50 min-h-screen">
      {/* Header */}
      <div>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 transition-colors hover:text-[#6b1d2f]"
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </Link>

        <div className="mt-4 border-b border-slate-200/80 pb-5">
          <p className="text-xs font-bold uppercase tracking-widest text-[#6b1d2f]">
            Account Management
          </p>
          <h1 className="mt-1 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
            My Profile
          </h1>
          <p className="mt-1 text-xs font-medium text-slate-500">
            View your account information and profile details.
          </p>
        </div>
      </div>

      {/* Profile Hero */}
      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
        {/* Cover */}
        <div className="h-32 bg-gradient-to-r from-[#6b1d2f] via-rose-900 to-slate-900 sm:h-44 relative">
          <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />
        </div>

        {/* Profile information */}
        <div className="px-5 pb-6 sm:px-8">
          <div className="-mt-12 flex flex-col gap-4 sm:-mt-16 sm:flex-row sm:items-end sm:justify-between">
            {/* Avatar */}
            <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-white bg-gradient-to-br from-[#6b1d2f] to-rose-950 text-3xl font-black text-white shadow-lg ring-1 ring-slate-900/10 sm:h-28 sm:w-28 sm:text-4xl">
              {initial}
            </div>

            {/* Role */}
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-xl bg-slate-100 px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-wider text-[#6b1d2f] border border-slate-200/60 shadow-xs">
                <ShieldCheck size={15} className="text-[#6b1d2f]" />
                {user.role}
              </span>
            </div>
          </div>

          {/* Name */}
          <div className="mt-5">
            <h2 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
              {fullName}
            </h2>

            <p className="mt-0.5 text-xs font-semibold text-slate-400">
              @{user.username}
            </p>
          </div>
        </div>
      </div>

      {/* Information */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Account information */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm lg:col-span-2">
          <div className="flex items-center gap-3.5 border-b border-slate-100 pb-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-[#6b1d2f]">
              <UserCircle size={22} />
            </div>

            <div>
              <h2 className="text-base font-bold text-slate-900">
                Account Information
              </h2>

              <p className="text-xs text-slate-500">
                Your basic account details
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
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
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-base font-bold text-slate-900">
                Account Status
              </h2>

              <p className="mt-0.5 text-xs text-slate-500">
                Current account information
              </p>
            </div>

            <div className="mt-6 space-y-3.5">
              <div className="rounded-xl border border-emerald-200/80 bg-emerald-50/60 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                    <ShieldCheck size={18} />
                  </div>

                  <div>
                    <p className="text-xs font-bold text-emerald-900 uppercase tracking-wider">
                      Active
                    </p>

                    <p className="text-xs font-medium text-emerald-700">
                      Account is active
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-4">
                <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                  Role
                </p>

                <p className="mt-1 text-sm font-bold text-slate-900">
                  {user.role}
                </p>
              </div>

              <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-4">
                <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                  Username
                </p>

                <p className="mt-1 truncate text-sm font-bold text-slate-900">
                  @{user.username}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Future settings */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Profile Settings
            </h2>

            <p className="mt-0.5 text-xs text-slate-500">
              Profile editing and password management can be added here.
            </p>
          </div>

          <button
            type="button"
            disabled
            className="cursor-not-allowed rounded-xl border border-slate-200 bg-slate-100/80 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-400"
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
    <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-3.5">
      <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <div className="mt-1.5 flex items-center gap-2">
        {icon && (
          <span className="text-slate-400 shrink-0">
            {icon}
          </span>
        )}

        <p className="truncate text-sm font-bold text-slate-800">
          {value}
        </p>
      </div>
    </div>
  );
}