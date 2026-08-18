'use client';

import React from 'react';

export interface BusinessHours {
  monFri?: string;
  sat?: string;
  sun?: string;
}

export interface LocationSectionProps {
  clinicName?: string;
  address?: string;
  phone?: string;
  email?: string;
  hours?: BusinessHours;
  locationDescription?: string;
  mapEmbedUrl?: string;
  directionsUrl?: string;
}

export const LocationSection: React.FC<LocationSectionProps> = ({
  clinicName = 'Smile Shine',
  address = '301-304, Signature Elite Arcade, RC Dutt Road, Alkapuri, Vadodara, Gujarat 390007, India',
  phone = '+91 98250 12345',
  email = 'concierge@smileshine.com',
  hours = {
    monFri: '9:00 AM – 6:00 PM',
    sat: '10:00 AM – 4:00 PM',
    sun: 'Closed (Emergency Concierge 24/7)',
  },
  locationDescription = 'Conveniently situated in the prime Alkapuri medical hub, opposite Railway Station Circle with dedicated valet parking and private elevator access.',
  mapEmbedUrl = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d118147.68202061266!2d73.10304620025732!3d22.307158814725357!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc8ab91a3ddab%3A0xac39d3bfe1473fb8!2sVadodara%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
  directionsUrl = 'https://www.google.com/maps/dir/?api=1&destination=Vadodara+Gujarat+India',
}) => {
  return (
    <section
      id="location"
      className="relative z-30 bg-slate-950 py-28 sm:py-36 px-4 sm:px-6 lg:px-8 text-slate-100 border-t border-white/[0.06]"
      aria-label="Location and Contact Details"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-cyan-400 text-[11px] font-semibold tracking-[0.25em] uppercase mb-4 shadow-lg shadow-cyan-500/10">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Boutique Studio Location
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-tight leading-tight">
            Visit the <span className="italic text-cyan-300 font-normal">Smile Shine</span> Sanctuary
          </h2>
          <p className="text-slate-400 mt-5 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Located in Vadodara&apos;s prime district with dedicated valet parking, private elevator access, and soothing lounge views.
          </p>
        </div>

        {/* Content Grid: Contact Card + 16:9 Google Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Contact Information Card */}
          <div className="lg:col-span-5 rounded-3xl bg-slate-900/60 border border-white/[0.08] p-8 sm:p-10 flex flex-col justify-between shadow-2xl backdrop-blur-xl relative overflow-hidden">
            {/* Top Cyan Accent Bar */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-cyan-500 via-sky-400 to-teal-300" />

            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-cyan-400 font-display">
                  Haute Dental Studio
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-white tracking-tight mt-1">
                  {clinicName}
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm mt-2 leading-relaxed">
                  {locationDescription}
                </p>
              </div>

              {/* Contact Details List */}
              <div className="space-y-4 pt-4 border-t border-white/[0.06] text-sm">
                {/* Address */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-slate-950 border border-white/10 flex items-center justify-center flex-shrink-0 text-cyan-400 shadow-sm">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Clinic Address</span>
                    <span className="text-slate-200 text-xs sm:text-sm leading-snug">{address}</span>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-slate-950 border border-white/10 flex items-center justify-center flex-shrink-0 text-cyan-400 shadow-sm">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Direct Concierge</span>
                    <a
                      href={`tel:${phone.replace(/\s+/g, '')}`}
                      className="text-cyan-400 font-bold text-sm sm:text-base hover:underline flex items-center gap-1.5 mt-0.5"
                    >
                      {phone}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-slate-950 border border-white/10 flex items-center justify-center flex-shrink-0 text-cyan-400 shadow-sm">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">VIP Enquiries</span>
                    <a
                      href={`mailto:${email}`}
                      className="text-slate-200 hover:text-cyan-400 text-xs sm:text-sm font-medium transition-colors"
                    >
                      {email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Operating Business Hours */}
              <div className="pt-5 border-t border-white/[0.06]">
                <span className="block text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-400 mb-3">
                  Clinic Hours
                </span>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center text-slate-300">
                    <span>Monday – Friday</span>
                    <span className="font-semibold text-white bg-slate-950 px-2.5 py-0.5 rounded-md border border-white/[0.08]">
                      {hours.monFri}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-slate-300">
                    <span>Saturday</span>
                    <span className="font-semibold text-white bg-slate-950 px-2.5 py-0.5 rounded-md border border-white/[0.08]">
                      {hours.sat}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-slate-400">
                    <span>Sunday</span>
                    <span className="text-cyan-400 font-semibold bg-cyan-950/30 px-2.5 py-0.5 rounded-md border border-cyan-900/40">
                      {hours.sun}
                    </span>
                  </div>
                </div>
              </div>

              {/* Clinic Badge */}
              <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-white/[0.08] flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-500/40 flex items-center justify-center font-bold text-xs flex-shrink-0">
                  ★
                </div>
                <div className="text-xs">
                  <span className="font-bold text-white block">4.9 / 5.0 Google Reviews (500+ Patients)</span>
                  <span className="text-slate-400 text-[11px]">Center of Excellence in Dental Aesthetics, Vadodara</span>
                </div>
              </div>
            </div>

            {/* "Get Directions" CTA Button */}
            <div className="mt-8 pt-4">
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-4 rounded-full bg-gradient-to-r from-cyan-500 via-sky-500 to-teal-400 text-slate-950 font-bold text-xs uppercase tracking-[0.2em] shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transform hover:-translate-y-0.5 transition-all"
              >
                <span>Get Driving Directions</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.4}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>

          {/* Embedded Google Map (Vadodara, Gujarat) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="relative w-full aspect-video max-h-[500px] rounded-3xl overflow-hidden border border-white/[0.08] shadow-2xl bg-slate-950">
              <iframe
                title="Smile Shine Dental Clinic - Vadodara Location Map"
                src={mapEmbedUrl}
                className="w-full h-full border-0 filter contrast-[105%] opacity-90 hover:opacity-100 transition-opacity"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />

              {/* Floating Pin Badge */}
              <div className="absolute top-4 left-4 z-10 hidden sm:flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-xl border border-white/10 text-xs font-semibold text-white shadow-xl">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span className="text-cyan-400 font-bold font-display">Smile Shine</span>
                <span className="text-slate-400">· Vadodara</span>
              </div>
            </div>

            {/* Amenities Highlights */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-2xl bg-slate-900/50 border border-white/[0.06] flex items-center gap-2.5 text-xs text-slate-300">
                <svg className="w-4 h-4 text-cyan-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span>Free Valet Parking</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-900/50 border border-white/[0.06] flex items-center gap-2.5 text-xs text-slate-300">
                <svg className="w-4 h-4 text-cyan-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span>Wheelchair Accessible</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-900/50 border border-white/[0.06] flex items-center gap-2.5 text-xs text-slate-300">
                <svg className="w-4 h-4 text-cyan-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span>Near Vadodara Station</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
