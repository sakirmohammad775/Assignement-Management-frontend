"use client";

import React, { useEffect, useState } from "react";
import { Mail, Phone, Search, Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { getUser, clearAuth } from "@/lib/auth";

export const Navbar: React.FC = () => {
  const router = useRouter();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check authentication
  useEffect(() => {
    const user = getUser();
    setIsLoggedIn(Boolean(user));

    // Listen for storage changes
    const handleStorageChange = () => {
      const user = getUser();
      setIsLoggedIn(Boolean(user));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  function handleLogout() {
    clearAuth();

    setIsLoggedIn(false);
    setIsMobileMenuOpen(false);

    router.push("/login");
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-white font-sans shadow-sm">
      {/* 1. Top Bar */}
      <div className="bg-[#521523] px-4 py-2 text-xs text-white sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 sm:flex-row">
          {/* Welcome Text */}
          <div className="text-center font-medium text-red-100/90 sm:text-left">
            Welcome To Our{" "}
            <span className="font-bold text-white">Eduvet University</span>
          </div>

          {/* Contact & Language */}
          <div className="flex items-center gap-6 text-[11px] text-red-100/90 sm:text-xs">
            <div className="flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5 text-red-200" />
              <span>+123 (456) 789 00</span>
            </div>

            <div className="hidden items-center gap-1.5 sm:flex">
              <Mail className="h-3.5 w-3.5 text-red-200" />
              <span>info@eduvet.com</span>
            </div>

            <div className="flex cursor-pointer items-center gap-1 transition hover:text-white">
              <span>English</span>
              <ChevronDown className="h-3 w-3" />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation */}
      <nav className="relative z-50 border-b border-slate-100 bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex cursor-pointer items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-sm bg-[#6b1d2f] text-xl font-black text-white shadow-sm">
                E
              </div>

              <div className="flex flex-col">
                <span className="text-2xl font-black leading-none tracking-wider text-slate-900">
                  EDUVET
                  <span className="text-[#6b1d2f]">.</span>
                </span>

                <span className="text-[9px] font-bold uppercase leading-tight tracking-widest text-slate-400">
                  UNIVERSITY
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden items-center gap-8 text-xs font-bold uppercase tracking-wider text-slate-700 lg:flex">
              <a href="#home" className="text-[#6b1d2f] transition">
                HOME
              </a>

              <a href="#campus" className="transition hover:text-[#6b1d2f]">
                CAMPUS
              </a>

              <a href="#programs" className="transition hover:text-[#6b1d2f]">
                PROGRAMS
              </a>

              <a
                href="#pages"
                className="flex items-center gap-1 transition hover:text-[#6b1d2f]"
              >
                PAGES
                <ChevronDown className="h-3 w-3 text-slate-400" />
              </a>

              {isLoggedIn && (
                <Link
                  href="/dashboard"
                  className="transition hover:text-[#6b1d2f]"
                >
                  DASHBOARD
                </Link>
              )}

              <a href="#contact" className="transition hover:text-[#6b1d2f]">
                CONTACT
              </a>
            </div>

            {/* Desktop Actions */}
            <div className="hidden items-center gap-5 sm:flex">
              <div className="cursor-pointer p-2 text-slate-600 transition hover:text-[#6b1d2f]">
                <Search className="h-4 w-4" />
              </div>

              {isLoggedIn ? (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex cursor-pointer items-center gap-2 rounded-sm border-2 border-[#6b1d2f] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#6b1d2f] transition hover:bg-[#6b1d2f] hover:text-white"
                >
                  Sign Out
                </button>
              ) : (
                <Link href="/login">
                  <div className="flex cursor-pointer items-center gap-2 rounded-sm border-2 border-slate-900 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-900 transition hover:bg-slate-900 hover:text-white">
                    Sign In
                  </div>
                </Link>
              )}
            </div>

            {/* Mobile Toggle */}
            <div className="flex items-center gap-3 lg:hidden">
              <div className="cursor-pointer p-2 text-slate-600 sm:hidden">
                <Search className="h-5 w-5" />
              </div>

              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="rounded-md p-2 text-slate-700 hover:text-[#6b1d2f] focus:outline-none"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* 3. Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="space-y-3 border-b border-slate-200 bg-white px-4 pb-6 pt-2 shadow-lg lg:hidden">
            <a
              href="#home"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2 text-xs font-bold uppercase text-[#6b1d2f]"
            >
              HOME
            </a>

            <a
              href="#campus"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2 text-xs font-bold uppercase text-slate-700 hover:text-[#6b1d2f]"
            >
              CAMPUS
            </a>

            <a
              href="#programs"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2 text-xs font-bold uppercase text-slate-700 hover:text-[#6b1d2f]"
            >
              PROGRAMS
            </a>

            <a
              href="#pages"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2 text-xs font-bold uppercase text-slate-700 hover:text-[#6b1d2f]"
            >
              PAGES
            </a>

            <a
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2 text-xs font-bold uppercase text-slate-700 hover:text-[#6b1d2f]"
            >
              CONTACT
            </a>

            {/* Mobile Auth */}
            <div className="border-t border-slate-100 pt-4">
              {isLoggedIn ? (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full rounded-sm border-2 border-[#6b1d2f] py-3 text-center text-xs font-bold uppercase tracking-wider text-[#6b1d2f] transition hover:bg-[#6b1d2f] hover:text-white"
                >
                  Sign Out
                </button>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full rounded-sm border-2 border-slate-900 py-3 text-center text-xs font-bold uppercase tracking-wider text-slate-900 transition hover:bg-slate-900 hover:text-white"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
