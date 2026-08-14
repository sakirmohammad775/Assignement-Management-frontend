import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <section className="w-full bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-bold tracking-wider text-[#6b1d2f] uppercase border-b-2 border-[#6b1d2f] pb-0.5">
              GET IN TOUCH
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              We are Here to Help You
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Have questions about admissions, programs, or campus visits? Reach out to our team directly.
            </p>

            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-4 p-4 rounded-lg bg-slate-50 border border-slate-100">
                <div className="p-2.5 bg-red-100 text-[#6b1d2f] rounded-md">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase">Campus Location</h4>
                  <p className="text-xs text-slate-600">123 University Ave, New York, NY 10001</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-lg bg-slate-50 border border-slate-100">
                <div className="p-2.5 bg-red-100 text-[#6b1d2f] rounded-md">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase">Phone Number</h4>
                  <p className="text-xs text-slate-600">+123 (456) 789 00</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-lg bg-slate-50 border border-slate-100">
                <div className="p-2.5 bg-red-100 text-[#6b1d2f] rounded-md">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase">Email Address</h4>
                  <p className="text-xs text-slate-600">info@eduvet.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Layout */}
          <div className="lg:col-span-7 bg-slate-50 p-8 sm:p-10 rounded-2xl border border-slate-200">
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="John Doe" 
                    className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-sm text-xs text-slate-900 pointer-events-none"
                    readOnly 
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="john@example.com" 
                    className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-sm text-xs text-slate-900 pointer-events-none"
                    readOnly 
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Subject</label>
                <input 
                  type="text" 
                  placeholder="Inquiry about Admission" 
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-sm text-xs text-slate-900 pointer-events-none"
                  readOnly 
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Message</label>
                <textarea 
                  rows={4} 
                  placeholder="Write your message here..." 
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-sm text-xs text-slate-900 pointer-events-none resize-none"
                  readOnly 
                />
              </div>

              <div className="px-7 py-3.5 bg-[#6b1d2f] text-white text-xs font-bold rounded-sm flex items-center justify-center gap-2 cursor-pointer">
                SEND MESSAGE <Send className="w-4 h-4" />
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Contact;