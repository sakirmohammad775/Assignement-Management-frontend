import React from 'react';
import { CheckCircle2, Award, Users, Globe } from 'lucide-react';

export const BenefitsSection: React.FC = () => {
  const benefits = [
    {
      icon: <Award className="w-8 h-8 text-[#6b1d2f]" />,
      title: 'Accredited Programs',
      description: 'Globally recognized degrees designed to meet modern industry standards.'
    },
    {
      icon: <Users className="w-8 h-8 text-[#6b1d2f]" />,
      title: 'Expert Mentorship',
      description: 'Direct guidance from top-tier professors and industry practitioners.'
    },
    {
      icon: <Globe className="w-8 h-8 text-[#6b1d2f]" />,
      title: 'Global Community',
      description: 'Diverse student body representing over 80+ countries around the world.'
    }
  ];

  const highlights = [
    'Flexible online & hybrid course schedules',
    'State-of-the-art research laboratories',
    'Career guidance & internship placements',
    'Over $2M allocated annually in scholarships'
  ];

  return (
    <section className="w-full bg-slate-50 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-bold tracking-wider text-[#6b1d2f] uppercase border-b-2 border-[#6b1d2f] pb-0.5">
            STUDENT ADVANTAGES
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Why Students Choose Eduvet
          </h2>
        </div>

        {/* Top Benefits Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 space-y-4">
              <div className="p-3 bg-red-50 inline-block rounded-lg">
                {benefit.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900">{benefit.title}</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Key Highlights Checklist */}
        <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-sm border border-slate-200/80">
          <h3 className="text-lg font-bold text-slate-900 mb-6 text-center lg:text-left">
            Everything you need for an exceptional learning experience
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highlights.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#6b1d2f] shrink-0" />
                <span className="text-xs sm:text-sm text-slate-700 font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default BenefitsSection;