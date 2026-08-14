"use client";

import React, { useState } from "react";
import { Mail, Phone, Search, Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full font-sans bg-white shadow-sm">
      {/* 1. Top Bar */}
      <div className="bg-[#521523] text-white text-xs py-2 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          {/* Welcome Text */}
          <div className="text-center sm:text-left text-red-100/90 font-medium">
            Welcome To Our{" "}
            <span className="font-bold text-white">Eduvet University</span>
          </div>

          {/* Contact & Language Links */}
          <div className="flex items-center gap-6 text-red-100/90 text-[11px] sm:text-xs">
            <div className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-red-200" />
              <span>+123 (456) 789 00</span>
            </div>

            <div className="hidden sm:flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-red-200" />
              <span>info@eduvet.com</span>
            </div>

            {/* Language Dropdown Mock */}
            <div className="flex items-center gap-1 cursor-pointer hover:text-white transition">
              <span>English</span>
              <ChevronDown className="w-3 h-3" />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <nav className="bg-white border-b border-slate-100 shadow-sm relative z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="w-9 h-9 rounded-sm bg-[#6b1d2f] flex items-center justify-center font-black text-white text-xl shadow-sm">
                E
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-wider text-slate-900 leading-none">
                  EDUVET<span className="text-[#6b1d2f]">.</span>
                </span>
                <span className="text-[9px] font-bold tracking-widest text-slate-400 uppercase leading-tight">
                  UNIVERSITY
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-8 text-xs font-bold uppercase tracking-wider text-slate-700">
              <a href="#home" className="text-[#6b1d2f] transition">
                HOME
              </a>
              <a href="#campus" className="hover:text-[#6b1d2f] transition">
                CAMPUS
              </a>
              <a href="#programs" className="hover:text-[#6b1d2f] transition">
                PROGRAMS
              </a>
              <a
                href="#pages"
                className="hover:text-[#6b1d2f] transition flex items-center gap-1"
              >
                PAGES <ChevronDown className="w-3 h-3 text-slate-400" />
              </a>
              <a href="#contact" className="hover:text-[#6b1d2f] transition">
                CONTACT
              </a>
            </div>

            {/* Right Action Items (Search + CTA) */}
            <div className="hidden sm:flex items-center gap-5">
              <div className="p-2 text-slate-600 hover:text-[#6b1d2f] cursor-pointer transition">
                <Search className="w-4 h-4" />
              </div>

              <Link href="/login">
                <div className="px-5 py-2.5 border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white text-xs font-bold uppercase tracking-wider rounded-sm transition cursor-pointer flex items-center gap-2">
                  Sign In
                </div>
              </Link>
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="lg:hidden flex items-center gap-3">
              <div className="p-2 text-slate-600 cursor-pointer sm:hidden">
                <Search className="w-5 h-5" />
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md text-slate-700 hover:text-[#6b1d2f] focus:outline-none"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* 3. Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3 shadow-lg">
            <a
              href="#home"
              className="block py-2 text-xs font-bold uppercase text-[#6b1d2f]"
            >
              HOME
            </a>
            <a
              href="#campus"
              className="block py-2 text-xs font-bold uppercase text-slate-700 hover:text-[#6b1d2f]"
            >
              CAMPUS
            </a>
            <a
              href="#programs"
              className="block py-2 text-xs font-bold uppercase text-slate-700 hover:text-[#6b1d2f]"
            >
              PROGRAMS
            </a>
            <a
              href="#pages"
              className="block py-2 text-xs font-bold uppercase text-slate-700 hover:text-[#6b1d2f]"
            >
              PAGES
            </a>
            <a
              href="#contact"
              className="block py-2 text-xs font-bold uppercase text-slate-700 hover:text-[#6b1d2f]"
            >
              CONTACT
            </a>

            <div className="pt-4 border-t border-slate-100">
              <Link href="/login">Sign In</Link>
              <div className="w-full py-3 border-2 border-slate-900 text-slate-900 text-center text-xs font-bold uppercase tracking-wider rounded-sm"></div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
