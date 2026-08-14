import React from 'react';
import { Mail, Phone, MapPin,  } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-slate-950 text-slate-300">
      
      {/* Top Banner / Newsletter Section */}
      <div className="border-b border-slate-800 bg-slate-900/50 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left space-y-1">
              <h3 className="text-lg font-bold text-white">Subscribe to Our Newsletter</h3>
              <p className="text-xs text-slate-400">Get the latest news, updates, and program announcements delivered to your inbox.</p>
            </div>
            
            <div className="flex w-full md:w-auto max-w-md gap-2">
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full sm:w-72 px-4 py-2.5 rounded-sm bg-slate-800 border border-slate-700 text-sm text-white placeholder-slate-500 pointer-events-none"
                readOnly
              />
              <button
                type="button"
                className="px-5 py-2.5 bg-[#6b1d2f] text-white text-xs font-bold rounded-sm whitespace-nowrap"
              >
                Join Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-sm bg-[#6b1d2f] flex items-center justify-center font-black text-white text-lg">
                E
              </div>
              <span className="text-xl font-extrabold tracking-wider text-white">EDUVET.</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Empowering students through innovative education, world-class faculty, and modern research opportunities.
            </p>
            
            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <div className="p-2 rounded-full bg-slate-800 text-slate-300">
                <Mail className="w-4 h-4" />
              </div>
              <div className="p-2 rounded-full bg-slate-800 text-slate-300">
                <Mail className="w-4 h-4" />
              </div>
              <div className="p-2 rounded-full bg-slate-800 text-slate-300">
                <Mail className="w-4 h-4" />
              </div>
              <div className="p-2 rounded-full bg-slate-800 text-slate-300">
                <Mail className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>About Eduvet</li>
              <li>Campus Life</li>
              <li>Academics & Degrees</li>
              <li>Admissions & Aid</li>
              <li>Research & Innovation</li>
            </ul>
          </div>

          {/* Programs Column */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Programs</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>Computer Science & IT</li>
              <li>Business Administration</li>
              <li>Health & Veterinary Sciences</li>
              <li>Engineering & Technology</li>
              <li>Arts & Humanities</li>
            </ul>
          </div>

          {/* Contact Information Column */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Contact Us</h4>
            <ul className="space-y-3 text-xs text-slate-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#6b1d2f] shrink-0 mt-0.5" />
                <span>123 University Ave, New York, NY 10001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#6b1d2f] shrink-0" />
                <span>+123 (456) 789 00</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#6b1d2f] shrink-0" />
                <span>info@eduvet.com</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="border-t border-slate-900 bg-slate-950 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© Eduvet University. All Rights Reserved.</p>
          <div className="flex gap-6">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Cookie Settings</span>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;