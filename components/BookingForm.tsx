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
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  return (
    <section id="booking" className="relative z-30 bg-slate-950 py-28 sm:py-36 px-4 sm:px-6 lg:px-8 text-slate-100 border-t border-white/[0.06]">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-cyan-400 text-[11px] font-semibold tracking-[0.25em] uppercase mb-4 shadow-lg shadow-cyan-500/10">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Private Concierge Reservation
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-tight leading-tight">
            Reserve Your <span className="italic font-normal text-cyan-300">Consultation</span>
          </h2>
          <p className="text-slate-400 mt-4 text-sm sm:text-base leading-relaxed">
            Schedule a private 3D digital imaging session with our master cosmetic prosthodontists at <strong className="text-white">Smile Shine</strong>.
          </p>
        </div>

        {/* Form Container */}
        <div className="relative rounded-3xl bg-slate-900/60 border border-white/[0.08] p-8 sm:p-12 shadow-2xl backdrop-blur-2xl">
          {isSubmitted ? (
            <div className="text-center py-10 space-y-6">
              <div className="w-20 h-20 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 flex items-center justify-center mx-auto text-3xl shadow-xl shadow-cyan-500/10">
                ✓
              </div>
              <h3 className="font-serif text-2xl sm:text-4xl font-light text-white">
                Appointment Requested <span className="italic font-normal text-cyan-300">Successfully</span>
              </h3>
              <p className="text-slate-300 max-w-lg mx-auto text-xs sm:text-sm leading-relaxed">
                Thank you, <strong className="text-white font-semibold">{formData.name}</strong>. Our concierge team at <strong className="text-cyan-300">Smile Shine</strong> will reach out at <strong className="text-white">{formData.phone}</strong> to confirm your private suite appointment for <strong className="text-white">{formData.date}</strong> ({formData.time}).
              </p>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/[0.08] text-xs text-slate-400 max-w-md mx-auto">
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
                className="px-6 py-3 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-white text-xs font-semibold uppercase tracking-[0.2em] transition-all border border-white/10"
              >
                Book Another Appointment
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Full Name */}
                <div>
                  <label htmlFor="name" className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300 mb-2">
                    Full Name <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Eleanor Vance"
                    className={`w-full px-4 py-3.5 rounded-2xl bg-slate-950/90 border text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-400 text-sm transition-all ${
                      errors.name ? 'border-rose-500 focus:ring-rose-500' : 'border-white/[0.08]'
                    }`}
                  />
                  {errors.name && <p className="text-rose-400 text-xs mt-1.5">{errors.name}</p>}
                </div>

                {/* Email Address */}
                <div>
                  <label htmlFor="email" className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300 mb-2">
                    Email Address <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. eleanor@example.com"
                    className={`w-full px-4 py-3.5 rounded-2xl bg-slate-950/90 border text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-400 text-sm transition-all ${
                      errors.email ? 'border-rose-500 focus:ring-rose-500' : 'border-white/[0.08]'
                    }`}
                  />
                  {errors.email && <p className="text-rose-400 text-xs mt-1.5">{errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {/* Phone Number */}
                <div>
                  <label htmlFor="phone" className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300 mb-2">
                    Phone Number <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 00000 00000"
                    className={`w-full px-4 py-3.5 rounded-2xl bg-slate-950/90 border text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-400 text-sm transition-all ${
                      errors.phone ? 'border-rose-500 focus:ring-rose-500' : 'border-white/[0.08]'
                    }`}
                  />
                  {errors.phone && <p className="text-rose-400 text-xs mt-1.5">{errors.phone}</p>}
                </div>

                {/* Preferred Date */}
                <div>
                  <label htmlFor="date" className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300 mb-2">
                    Preferred Date <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                    className={`w-full px-4 py-3.5 rounded-2xl bg-slate-950/90 border text-slate-100 focus:outline-none focus:ring-1 focus:ring-cyan-400 text-sm transition-all ${
                      errors.date ? 'border-rose-500 focus:ring-rose-500' : 'border-white/[0.08]'
                    }`}
                  />
                  {errors.date && <p className="text-rose-400 text-xs mt-1.5">{errors.date}</p>}
                </div>

                {/* Preferred Time */}
                <div>
                  <label htmlFor="time" className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300 mb-2">
                    Preferred Time <span className="text-cyan-400">*</span>
                  </label>
                  <select
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className={`w-full px-4 py-3.5 rounded-2xl bg-slate-950/90 border text-slate-100 focus:outline-none focus:ring-1 focus:ring-cyan-400 text-sm transition-all ${
                      errors.time ? 'border-rose-500 focus:ring-rose-500' : 'border-white/[0.08]'
                    }`}
                  >
                    <option value="">Select Time Window</option>
                    <option value="Morning (9:00 AM – 12:00 PM)">Morning (9:00 AM – 12:00 PM)</option>
                    <option value="Afternoon (12:00 PM – 3:00 PM)">Afternoon (12:00 PM – 3:00 PM)</option>
                    <option value="Late Afternoon (3:00 PM – 6:00 PM)">Late Afternoon (3:00 PM – 6:00 PM)</option>
                  </select>
                  {errors.time && <p className="text-rose-400 text-xs mt-1.5">{errors.time}</p>}
                </div>
              </div>

              {/* Treatment Focus */}
              <div>
                <label htmlFor="treatment" className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300 mb-2">
                  Treatment of Interest
                </label>
                <select
                  id="treatment"
                  name="treatment"
                  value={formData.treatment}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 rounded-2xl bg-slate-950/90 border border-white/[0.08] text-slate-100 focus:outline-none focus:ring-1 focus:ring-cyan-400 text-sm"
                >
                  <option value="Digital Smile Design & 3D Consultation">Digital Smile Design & 3D Biometric Consultation</option>
                  <option value="Handcrafted Ceramic Veneers">Handcrafted Ceramic Veneers</option>
                  <option value="Photonic Laser Enamel Whitening">Photonic Laser Enamel Whitening</option>
                  <option value="Guided Titanium & Zirconia Implants">Guided Titanium & Zirconia Implants</option>
                  <option value="Diamond+ Clear Aligners & Orthodontics">Diamond+ Clear Aligners & Orthodontics</option>
                  <option value="Painless Sedation & Hygiene Care">Painless Sedation & Hygiene Care</option>
                </select>
              </div>

              {/* Notes */}
              <div>
                <label htmlFor="notes" className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300 mb-2">
                  Personal Preferences / Clinical Notes (Optional)
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={3}
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Tell us about your aesthetic goals, prior treatments, or anxiety considerations..."
                  className="w-full px-4 py-3 rounded-2xl bg-slate-950/90 border border-white/[0.08] text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-400 text-sm resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-full bg-gradient-to-r from-cyan-500 via-sky-500 to-teal-400 hover:from-cyan-400 hover:to-teal-300 text-slate-950 font-bold text-xs uppercase tracking-[0.22em] shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transform hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 rounded-full border-2 border-slate-950/30 border-t-slate-950 animate-spin" />
                      <span>Confirming Request...</span>
                    </>
                  ) : (
                    <>
                      <span>Confirm Consultation Request</span>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.4}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </button>
              </div>

              <p className="text-center text-[10px] text-slate-500 font-mono tracking-wider uppercase">
                🔒 Strict Medical Privacy & HIPAA Compliant Data Protocol
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default BookingForm;
