import React from 'react';

export const FeaturedSection: React.FC = () => {
  return (
    <section className="w-full bg-white py-16 lg:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Collage Images Column */}
          <div className="lg:col-span-6 relative min-h-[420px] sm:min-h-[500px] flex items-center justify-center">
            
            {/* Back Image (Professor & Student) */}
            <div className="absolute top-0 left-0 w-3/4 sm:w-2/3 rounded-2xl overflow-hidden shadow-md border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80"
                alt="Professor assisting student"
                className="w-full h-64 sm:h-80 object-cover"
              />
            </div>

            {/* Front Image (Female Student) */}
            <div className="absolute bottom-0 right-0 w-3/4 sm:w-2/3 rounded-2xl overflow-hidden shadow-2xl border-4 border-white z-10">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"
                alt="Smiling student"
                className="w-full h-64 sm:h-80 object-cover"
              />
            </div>

            {/* Floating Circular Seal / Stamp */}
            <div className="absolute top-8 right-4 sm:top-12 sm:right-12 z-20 bg-white rounded-full p-2 shadow-lg border border-red-100 flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 text-center">
              <div className="w-full h-full rounded-full border-2 border-dashed border-[#6b1d2f] flex flex-col items-center justify-center p-1">
                <span className="text-[9px] font-bold tracking-widest text-[#6b1d2f] uppercase">SINCE 1990</span>
                <span className="text-[10px] font-black text-slate-800">BEST EDU</span>
              </div>
            </div>

          </div>

          {/* Right Text Content Column */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Tag / Category */}
            <div>
              <span className="text-xs font-bold tracking-wider text-[#6b1d2f] uppercase border-b-2 border-[#6b1d2f] pb-0.5">
                SINCE 1990
              </span>
            </div>

            {/* Main Title */}
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
              Message from the <br className="hidden sm:inline" />
              main{' '}
              <span className="relative inline-block text-[#6b1d2f] underline decoration-[#6b1d2f] decoration-2 underline-offset-4">
                founder
              </span>
            </h2>

            {/* Description */}
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              We have focused on generating new knowledge and promoting critical thinking amongst our students, graduating more than 7,000 young men and women during this time.
            </p>

            {/* Quote Block */}
            <div className="border-l-4 border-[#6b1d2f] pl-4 py-1 bg-red-50/40 rounded-r-md">
              <p className="text-slate-700 text-xs sm:text-sm font-medium italic leading-relaxed">
                `Since its inception in 2001, Eduvet University has become one of the most reputed educational institution in NYC.`
              </p>
            </div>

            {/* Founder Profile Footer */}
            <div className="pt-4 flex items-center justify-between flex-wrap gap-4 border-t border-slate-100">
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80"
                  alt="Amelia K. Hamilton"
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#6b1d2f]"
                />
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Founder</p>
                  <p className="text-sm font-bold text-slate-900">Amelia K. Hamilton</p>
                </div>
              </div>

              {/* Signature Graphic Mockup */}
              <div className="font-serif italic text-2xl text-[#6b1d2f] opacity-80 select-none tracking-widest font-bold">
                A. Hamilton
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;