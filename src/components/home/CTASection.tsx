import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export const CTASection: React.FC = () => {
  return (
    <section className="w-full bg-[#521523] text-white py-16 sm:py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 bg-white/5 border border-white/10 p-8 sm:p-12 rounded-2xl backdrop-blur-md">
          
          <div className="space-y-3 text-center lg:text-left max-w-2xl">
            <span className="text-xs font-bold tracking-widest uppercase text-red-200">
              START YOUR JOURNEY TODAY
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Ready to take the next step in your academic career?
            </h2>
            <p className="text-xs sm:text-sm text-red-100/80 leading-relaxed">
              Join thousands of students shaping their future at Eduvet University. Applications are open for the upcoming academic semester.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <div className="px-7 py-3.5 bg-white text-[#521523] text-xs font-bold rounded-sm shadow-lg flex items-center justify-center gap-2 cursor-pointer">
              APPLY NOW <ArrowUpRight className="w-4 h-4" />
            </div>
            <div className="px-7 py-3.5 bg-transparent border border-white/30 text-white text-xs font-bold rounded-sm flex items-center justify-center cursor-pointer">
              EXPLORE PROGRAMS
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CTASection;