'use client';

import React from 'react';

export interface BusinessHours {
  monFri?: string;
  sat?: string;
  sun?: string;
}

export interface LocationSectionProps {
  /**
   * Clinic Name
   */
  clinicName?: string;
  /**
   * Street address, city, state, zip
   */
  address?: string;
  /**
   * Formatted phone number
   */
  phone?: string;
  /**
   * Clinic email address
   */
  email?: string;
  /**
   * Operating business hours schedule
   */
  hours?: BusinessHours;
  /**
   * Location description & landmark directions
   */
  locationDescription?: string;
  /**
   * Pre-configured Google Maps Embed URL
   */
  mapEmbedUrl?: string;
  /**
   * Direct Google Maps directions URL for the button
   */
  directionsUrl?: string;
}

export const LocationSection: React.FC<LocationSectionProps> = ({
  clinicName = 'WE DESIGN SMILES',
  address = '301-304, Signature Elite Arcade, RC Dutt Road, Alkapuri, Vadodara, Gujarat 390007, India',
  phone = '+91 98250 12345',
  email = 'care@wedesignsmiles.com',
  hours = {
    monFri: '9:00 AM – 6:00 PM',
    sat: '10:00 AM – 4:00 PM',
    sun: 'Closed (Emergency On-Call 24/7)',
  },
  locationDescription = 'Conveniently situated in the prime Alkapuri medical hub, opposite Railway Station Circle with dedicated valet parking and private elevator access.',
  mapEmbedUrl = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d118147.68202061266!2d73.10304620025732!3d22.307158814725357!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc8ab91a3ddab%3A0xac39d3bfe1473fb8!2sVadodara%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
  directionsUrl = 'https://www.google.com/maps/dir/?api=1&destination=Vadodara+Gujarat+India',
}) => {
  return (
    <section
      id="location"
      className="relative z-30 bg-slate-950 py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-slate-800 text-slate-100"
      aria-label="Location and Contact Information"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-[#06b6d4]/40 text-[#06b6d4] text-xs font-bold tracking-widest uppercase mb-4 shadow-sm shadow-[#06b6d4]/20">
            <span className="w-2 h-2 rounded-full bg-[#06b6d4] animate-pulse" />
            Find Our Clinic
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            Location & Contact Details
          </h2>
          <p className="text-slate-400 mt-4 text-base sm:text-lg">
            Visit our state-of-the-art dental studio in Vadodara. Easy accessibility, complimentary valet parking, and a relaxing lounge environment.
          </p>
        </div>

        {/* Content Grid: Contact Card + 16:9 Google Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* (2) Contact Information Card (Left Side on Desktop, Stacked on Mobile) */}
          <div className="lg:col-span-5 rounded-3xl bg-slate-900/90 border border-slate-800 p-8 sm:p-10 flex flex-col justify-between shadow-2xl backdrop-blur-md relative overflow-hidden">
            {/* Top Teal Accent Bar */}
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#06b6d4] to-cyan-400" />

            <div className="space-y-6">
              {/* Clinic Branding Header */}
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#06b6d4]">
                  Premier Dental Studio
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
                  {clinicName}
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm mt-2 leading-relaxed">
                  {locationDescription}
                </p>
              </div>

              {/* Contact Details List */}
              <div className="space-y-4 pt-4 border-t border-slate-800 text-sm">
                {/* Address */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center flex-shrink-0 text-[#06b6d4] shadow-sm">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">Clinic Address</span>
                    <span className="text-slate-200 text-xs sm:text-sm leading-snug">{address}</span>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center flex-shrink-0 text-[#06b6d4] shadow-sm">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">Phone Support</span>
                    <a
                      href={`tel:${phone.replace(/\s+/g, '')}`}
                      className="text-[#06b6d4] font-bold text-sm sm:text-base hover:underline flex items-center gap-1.5 mt-0.5"
                    >
                      {phone}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center flex-shrink-0 text-[#06b6d4] shadow-sm">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">Concierge Email</span>
                    <a
                      href={`mailto:${email}`}
                      className="text-slate-200 hover:text-[#06b6d4] text-xs sm:text-sm font-medium transition-colors"
                    >
                      {email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Operating Business Hours */}
              <div className="pt-5 border-t border-slate-800">
                <span className="block text-xs font-bold uppercase tracking-wider text-[#06b6d4] mb-3">
                  Business Hours
                </span>
                <div className="space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between items-center text-slate-300">
                    <span>Monday – Friday</span>
                    <span className="font-semibold text-white bg-slate-950 px-2.5 py-0.5 rounded-md border border-slate-800">
                      {hours.monFri}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-slate-300">
                    <span>Saturday</span>
                    <span className="font-semibold text-white bg-slate-950 px-2.5 py-0.5 rounded-md border border-slate-800">
                      {hours.sat}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-slate-400">
                    <span>Sunday</span>
                    <span className="text-rose-400 font-semibold bg-rose-950/30 px-2.5 py-0.5 rounded-md border border-rose-900/40">
                      {hours.sun}
                    </span>
                  </div>
                </div>
              </div>

              {/* (6) Optional: Clinic Accreditation / Patient Testimonial Badge */}
              <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-cyan-950 text-[#06b6d4] border border-[#06b6d4]/40 flex items-center justify-center font-bold text-xs flex-shrink-0">
                  ★
                </div>
                <div className="text-xs">
                  <span className="font-bold text-white block">4.9 / 5.0 Google Reviews (500+ Patients)</span>
                  <span className="text-slate-400 text-[11px]">Certified Center of Dental Aesthetics, Vadodara</span>
                </div>
              </div>
            </div>

            {/* (5) "Get Directions" CTA Button */}
            <div className="mt-8 pt-4">
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-4 rounded-2xl bg-[#06b6d4] hover:bg-cyan-400 text-slate-950 font-extrabold text-sm uppercase tracking-wider shadow-lg shadow-[#06b6d4]/20 hover:shadow-[#06b6d4]/40 transform hover:-translate-y-0.5 transition-all"
              >
                <span>Get Driving Directions</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>

          {/* (1) Embedded Google Map (Right Side on Desktop, 16:9 responsive with max-h-[500px]) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="relative w-full aspect-video max-h-[500px] rounded-3xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-950">
              <iframe
                title="WE DESIGN SMILES Dental Clinic - Vadodara Location Map"
                src={mapEmbedUrl}
                className="w-full h-full border-0 filter contrast-[105%] opacity-90 hover:opacity-100 transition-opacity"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />

              {/* Floating Pin Indicator */}
              <div className="absolute top-4 left-4 z-10 hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 backdrop-blur-md border border-[#06b6d4]/40 text-xs font-semibold text-white shadow-xl">
                <span className="w-2.5 h-2.5 rounded-full bg-[#06b6d4] animate-ping" />
                <span className="text-[#06b6d4] font-bold">WE DESIGN SMILES</span>
                <span className="text-slate-400">· Vadodara</span>
              </div>
            </div>

            {/* Quick Amenities Pill List */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex items-center gap-2.5 text-xs text-slate-300">
                <svg className="w-4 h-4 text-[#06b6d4] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Free Valet Parking</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex items-center gap-2.5 text-xs text-slate-300">
                <svg className="w-4 h-4 text-[#06b6d4] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Wheelchair Accessible</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex items-center gap-2.5 text-xs text-slate-300">
                <svg className="w-4 h-4 text-[#06b6d4] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
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
