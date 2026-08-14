"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { GraduationCap, Loader2, Lock, User, ArrowLeft, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { login } from "@/services/auth.service";

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const data = await login(username, password);

      if (data.user.role === "ADMIN") {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    } catch {
      setError("Invalid username or password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-12 bg-slate-950 font-sans">
      
      {/* Left Column: Visual Hero Section (Hidden on small mobile, visible on LG screens) */}
      <div className="hidden lg:flex lg:col-span-5 relative flex-col justify-between p-12 overflow-hidden bg-gradient-to-br from-[#6b1d2f] via-slate-900 to-slate-950 border-r border-slate-800/60">
        
        {/* Glow Effects */}
        <div className="absolute top-0 -left-20 w-96 h-96 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Brand Header */}
        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center gap-3 group">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-lg group-hover:scale-105 transition-transform duration-300">
              <GraduationCap size={26} className="text-red-300" />
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-white">
              EduAssign<span className="text-red-400">.</span>
            </span>
          </Link>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 space-y-6 max-w-md">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-xs font-semibold text-red-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Smart Academic Portal</span>
          </div>

          <h2 className="text-4xl font-extrabold text-white leading-tight">
            Streamline your learning experience today.
          </h2>

          <p className="text-slate-300 text-sm leading-relaxed">
            Access assignments, track progress, and stay connected with your instructors all in one place.
          </p>

          {/* Feature List */}
          <div className="pt-4 space-y-3">
            <div className="flex items-center gap-3 text-xs text-slate-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Real-time assignment updates and grade tracking</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Direct communication with faculty members</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-200">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Secure, encrypted role-based login system</span>
            </div>
          </div>
        </div>

        {/* Footer info in Hero */}
        <div className="relative z-10 text-xs text-slate-500">
          © EduAssign Learning Technologies. All rights reserved.
        </div>
      </div>

      {/* Right Column: Form Container */}
      <div className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-12 lg:p-16 bg-slate-900/60 backdrop-blur-xl">
        
        {/* Top Back Nav */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>

          {/* Mobile Logo View */}
          <div className="lg:hidden flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-900 text-white">
              <GraduationCap size={18} />
            </div>
            <span className="text-lg font-bold text-white">EduAssign</span>
          </div>
        </div>

        {/* Form Card Center */}
        <div className="my-auto py-10 max-w-md w-full mx-auto space-y-8">
          
          <div className="space-y-2 text-center sm:text-left">
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Welcome back
            </h1>
            <p className="text-sm text-slate-400">
              Sign in to your account to access your dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Username Input */}
            <div className="space-y-2">
              <label
                htmlFor="username"
                className="block text-xs font-semibold text-slate-300 uppercase tracking-wider"
              >
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <User className="w-4 h-4" />
                </div>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  required
                  placeholder="Enter your username"
                  className="w-full rounded-xl bg-slate-950 border border-slate-800 pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition duration-200 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-xs font-semibold text-slate-300 uppercase tracking-wider"
                >
                  Password
                </label>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full rounded-xl bg-slate-950 border border-slate-800 pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition duration-200 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                />
              </div>
            </div>

            {/* Error Banner */}
            {error && (
              <div className="rounded-xl bg-red-950/60 border border-red-800/80 px-4 py-3 text-xs font-medium text-red-300 flex items-center gap-2 animate-shake">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full relative flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#6b1d2f] to-rose-700 hover:from-[#521523] hover:to-rose-800 px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-red-950/50 transition-all duration-200 hover:shadow-red-900/60 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading && <Loader2 size={18} className="animate-spin text-white" />}
              {loading ? "Signing in..." : "Sign In to Dashboard"}
            </button>

          </form>

        </div>

        {/* Bottom Help Text */}
        <div className="text-center text-xs text-slate-500">
          Need assistance logging in? Contact your administrator or{" "}
          <span className="text-slate-400 underline cursor-pointer hover:text-white transition">
            IT support
          </span>
          .
        </div>

      </div>

    </main>
  );
}