import React from 'react';

export const Facility: React.FC = () => {
  const facilities = [
    {
      title: 'Modern Library',
      category: 'Academic Resource',
      image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Research Labs',
      category: 'Innovation Center',
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Sports Complex',
      category: 'Student Life',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80'
    }
  ];

  return (
    <section className="w-full bg-slate-50 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-bold tracking-wider text-[#6b1d2f] uppercase border-b-2 border-[#6b1d2f] pb-0.5">
            CAMPUS LIFE
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            World-Class University Facilities
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {facilities.map((item, index) => (
            <div key={index} className="rounded-xl overflow-hidden bg-white shadow-sm border border-slate-200">
              <div className="h-48 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="p-6 space-y-2">
                <span className="text-[10px] font-bold text-[#6b1d2f] uppercase tracking-wider">{item.category}</span>
                <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Facility;