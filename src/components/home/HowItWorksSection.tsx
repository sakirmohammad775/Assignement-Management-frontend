import React from 'react';
import { GraduationCap, Brain, Laptop } from 'lucide-react';

export const HowItWorkSection: React.FC = () => {
  const steps = [
    {
      icon: <GraduationCap className="w-10 h-10 text-white" />,
      title: 'Expert Instruction',
      description: 'Learn from industry experts and experienced faculty members committed to your academic excellence.',
    },
    {
      icon: <Brain className="w-10 h-10 text-white" />,
      title: 'Critical Thinking',
      description: 'Engage in innovative research and practical curriculum designed to foster problem-solving skills.',
    },
    {
      icon: <Laptop className="w-10 h-10 text-white" />,
      title: 'Flexible Learning',
      description: 'Access state-of-the-art digital resources and flexible program schedules tailored for every student.',
    },
  ];

  return (
    <section className="w-full bg-[#521523] text-white py-16 sm:py-20 lg:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold tracking-widest uppercase text-red-200 border-b border-red-300/40 pb-1">
            WHY CHOOSE EDUVET
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            One of the largest, most diverse <br className="hidden sm:inline" />
            <span className="underline decoration-red-300 decoration-2 underline-offset-8">
              universities
            </span>{' '}
            in the nyc
          </h2>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group relative p-8 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 flex flex-col items-center text-center space-y-4"
            >
              {/* Icon Container */}
              <div className="p-4 rounded-full bg-white/10 group-hover:bg-red-900/50 transition-colors border border-white/20">
                {step.icon}
              </div>

              {/* Title & Description */}
              <h3 className="text-lg font-bold text-white tracking-wide">
                {step.title}
              </h3>
              <p className="text-xs sm:text-sm text-red-100/80 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HowItWorkSection;