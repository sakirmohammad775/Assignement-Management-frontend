import React from 'react';
import { ArrowUpRight, Award, Trophy, ShieldCheck } from 'lucide-react';

export const Banner: React.FC = () => {
  return (
    <section className="relative w-full bg-slate-50 overflow-hidden py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Content Column */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left z-10">
            {/* Tagline Badge */}
            <div className="inline-block">
              <span className="text-xs font-bold tracking-wider text-red-900 bg-red-100/60 uppercase px-3 py-1.5 rounded-sm">
                MEET WITH #01 UNIVERSITY
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight">
              Most reputed <br className="hidden sm:inline" />
              educational{' '}
              <span className="relative inline-block text-red-900 underline decoration-red-800 decoration-2 underline-offset-8">
                institution
              </span>{' '}
              <br className="hidden sm:inline" />
              in Booston
            </h1>

            {/* CTA Button */}
            <div className="pt-2">
              <a
                href="#apply"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#6b1d2f] hover:bg-[#521523] text-white text-sm font-semibold rounded-sm transition-all shadow-md hover:shadow-lg"
              >
                APPLY NOW
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

            {/* Accreditations / Awards Row */}
            <div className="pt-8 border-t border-slate-200/80 flex items-center justify-center lg:justify-start gap-8 opacity-80">
              <div className="flex items-center gap-2 text-slate-600">
                <Trophy className="w-8 h-8 text-amber-600" />
                <span className="text-xs font-semibold leading-tight text-left">TOP 10<br />GLOBAL</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Award className="w-8 h-8 text-[#6b1d2f]" />
                <span className="text-xs font-semibold leading-tight text-left">HYPER BEST<br />AWARD</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <ShieldCheck className="w-8 h-8 text-slate-700" />
                <span className="text-xs font-semibold leading-tight text-left">ULTRA<br />CERTIFIED</span>
              </div>
            </div>
          </div>

          {/* Right Image Column */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg lg:max-w-none">
              {/* Main Student Image */}
              <div className="rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-white">
                <img
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80"
                  alt="Student with laptop"
                  className="w-full h-[380px] sm:h-[480px] object-cover object-center"
                />
              </div>

              {/* Floating Award Badge (Bottom Right) */}
              <div className="absolute -bottom-6 -left-2 sm:bottom-6 sm:-left-8 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-xl border border-slate-100 flex items-center gap-3 z-20 max-w-xs">
                <div className="p-2.5 bg-red-50 text-[#6b1d2f] rounded-lg">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">2009</h4>
                  <p className="text-xs text-slate-500 font-medium">Towerd Education Award</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Banner;