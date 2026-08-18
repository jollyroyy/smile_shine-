'use client';

import React, { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  treatment: string;
  notes: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  date?: string;
  time?: string;
}

export const BookingForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    treatment: 'Digital Smile Design & 3D Consultation',
    notes: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your full name.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please provide a valid email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address format.';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Please provide your contact phone number.';
    } else if (formData.phone.replace(/\D/g, '').length < 10) {
      newErrors.phone = 'Please enter a valid 10-digit phone number.';
    }

    if (!formData.date) {
      newErrors.date = 'Please select your preferred appointment date.';
    }

    if (!formData.time) {
      newErrors.time = 'Please select your preferred consultation time.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate async booking API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  return (
    <section id="booking" className="relative z-30 bg-slate-950 py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-slate-800 text-slate-100">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs font-bold tracking-widest uppercase mb-4">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            Online Reservation
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            Schedule Your Smile Consultation
          </h2>
          <p className="text-slate-400 mt-3 text-sm sm:text-base">
            Reserve your private 3D digital imaging session with our master cosmetic dentists. Complimentary for all new smile makeover inquiries.
          </p>
        </div>

        {/* Form Container */}
        <div className="relative rounded-3xl bg-slate-900/90 border border-slate-800 p-8 sm:p-12 shadow-2xl backdrop-blur-md">
          {isSubmitted ? (
            <div className="text-center py-10 space-y-6">
              <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto text-3xl shadow-xl shadow-emerald-500/10">
                ✓
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Appointment Requested Successfully!
              </h3>
              <p className="text-slate-300 max-w-lg mx-auto text-sm sm:text-base leading-relaxed">
                Thank you, <strong className="text-white">{formData.name}</strong>. Our clinical concierge team will reach out at <strong className="text-cyan-400">{formData.phone}</strong> to confirm your slot for <strong className="text-white">{formData.date}</strong> at <strong className="text-white">{formData.time}</strong>.
              </p>
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs text-slate-400 max-w-md mx-auto">
                <span className="font-semibold text-slate-300">Selected Treatment:</span> {formData.treatment}
              </div>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    date: '',
                    time: '',
                    treatment: 'Digital Smile Design & 3D Consultation',
                    notes: '',
                  });
                }}
                className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold uppercase tracking-wider transition-all"
              >
                Book Another Appointment
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Full Name */}
                <div>
                  <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                    Full Name <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Eleanor Vance"
                    className={`w-full px-4 py-3.5 rounded-xl bg-slate-950 border text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-sm transition-all ${
                      errors.name ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-800'
                    }`}
                  />
                  {errors.name && <p className="text-rose-400 text-xs mt-1.5">{errors.name}</p>}
                </div>

                {/* Email Address */}
                <div>
                  <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                    Email Address <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. eleanor@example.com"
                    className={`w-full px-4 py-3.5 rounded-xl bg-slate-950 border text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-sm transition-all ${
                      errors.email ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-800'
                    }`}
                  />
                  {errors.email && <p className="text-rose-400 text-xs mt-1.5">{errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {/* Phone Number */}
                <div>
                  <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                    Phone Number <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(555) 000-0000"
                    className={`w-full px-4 py-3.5 rounded-xl bg-slate-950 border text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-sm transition-all ${
                      errors.phone ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-800'
                    }`}
                  />
                  {errors.phone && <p className="text-rose-400 text-xs mt-1.5">{errors.phone}</p>}
                </div>

                {/* Preferred Date */}
                <div>
                  <label htmlFor="date" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                    Preferred Date <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                    className={`w-full px-4 py-3.5 rounded-xl bg-slate-950 border text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-sm transition-all ${
                      errors.date ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-800'
                    }`}
                  />
                  {errors.date && <p className="text-rose-400 text-xs mt-1.5">{errors.date}</p>}
                </div>

                {/* Preferred Time */}
                <div>
                  <label htmlFor="time" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                    Preferred Time <span className="text-cyan-400">*</span>
                  </label>
                  <select
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className={`w-full px-4 py-3.5 rounded-xl bg-slate-950 border text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-sm transition-all ${
                      errors.time ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-800'
                    }`}
                  >
                    <option value="">Select Time Slot</option>
                    <option value="Morning (8:00 AM – 11:00 AM)">Morning (8:00 AM – 11:00 AM)</option>
                    <option value="Mid-Day (11:00 AM – 2:00 PM)">Mid-Day (11:00 AM – 2:00 PM)</option>
                    <option value="Afternoon (2:00 PM – 5:00 PM)">Afternoon (2:00 PM – 5:00 PM)</option>
                    <option value="Evening (5:00 PM – 7:00 PM)">Evening (5:00 PM – 7:00 PM)</option>
                  </select>
                  {errors.time && <p className="text-rose-400 text-xs mt-1.5">{errors.time}</p>}
                </div>
              </div>

              {/* Treatment Focus */}
              <div>
                <label htmlFor="treatment" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Treatment / Inquiry Interest
                </label>
                <select
                  id="treatment"
                  name="treatment"
                  value={formData.treatment}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-sm"
                >
                  <option value="Digital Smile Design & 3D Consultation">Digital Smile Design & 3D Consultation</option>
                  <option value="Custom Porcelain Veneers">Custom Porcelain Veneers</option>
                  <option value="Laser Teeth Whitening">Laser Teeth Whitening</option>
                  <option value="Guided Dental Implants">Guided Dental Implants</option>
                  <option value="Clear Aligners & Orthodontics">Clear Aligners & Orthodontics</option>
                  <option value="Routine Preventive & Hygiene Care">Routine Preventive & Hygiene Care</option>
                </select>
              </div>

              {/* Special Requests / Notes */}
              <div>
                <label htmlFor="notes" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Personal Preferences / Notes (Optional)
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={3}
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Tell us about your dental goals, previous treatments, or any anxiety concerns..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-sm resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-sky-600 via-cyan-500 to-teal-400 hover:from-sky-500 hover:to-teal-300 text-white font-extrabold text-sm sm:text-base uppercase tracking-wider shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transform hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      <span>Securing Your Slot...</span>
                    </>
                  ) : (
                    <>
                      <span>Confirm Appointment Request</span>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </button>
              </div>

              <p className="text-center text-[11px] text-slate-500">
                🔒 HIPAA Compliant & Confidential. Your medical data is strictly private.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default BookingForm;
