import React from 'react';
import { UserCheck, BookOpen, HeartHandshake } from 'lucide-react';

export const RoleSection: React.FC = () => {
  const roles = [
    {
      icon: <UserCheck className="w-7 h-7 text-white" />,
      title: 'Undergraduate Students',
      description: 'Foundational degrees crafted to build technical competency and critical thinking.'
    },
    {
      icon: <BookOpen className="w-7 h-7 text-white" />,
      title: 'Postgraduate Scholars',
      description: 'Advanced research and specialized programs for ambitious career leaders.'
    },
    {
      icon: <HeartHandshake className="w-7 h-7 text-white" />,
      title: 'Alumni Network',
      description: 'A lifelong connection to over 50,000 active professionals across the globe.'
    }
  ];

  return (
    <section className="w-full bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-bold tracking-wider text-[#6b1d2f] uppercase border-b-2 border-[#6b1d2f] pb-0.5">
            OUR COMMUNITY
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Tailored Paths for Every Role
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {roles.map((role, index) => (
            <div key={index} className="p-8 rounded-2xl border border-slate-100 bg-slate-50/50 space-y-4 text-center">
              <div className="w-14 h-14 bg-[#6b1d2f] rounded-full flex items-center justify-center mx-auto shadow-md">
                {role.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900">{role.title}</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{role.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default RoleSection;