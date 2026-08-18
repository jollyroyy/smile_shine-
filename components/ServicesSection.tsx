import React from 'react';
import Link from 'next/link';

interface ServiceItem {
  id: string;
  title: string;
  badge: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
}

const servicesData: ServiceItem[] = [
  {
    id: 'digital-smile-design',
    title: 'Digital Smile Design & 3D Biometrics',
    badge: 'Flagship Architecture',
    description:
      'Preview your sculpted smile before clinical intervention using 3D micron intraoral optical topography and facial symmetry alignment.',
    features: ['High-definition 3D smile simulation', 'Biometric facial proportion mapping', 'Zero-approximation precision'],
    icon: (
      <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: 'porcelain-veneers',
    title: 'Handcrafted Ceramic Veneers',
    badge: 'Artisanal Prosthetics',
    description:
      'Ultra-thin master-crafted E-max and layered feldspathic porcelain veneers designed to harmonize natural translucency with luminescent vitality.',
    features: ['Individually stratified ceramics', 'Flawless optical light dispersion', 'Permanent stain-resistant polish'],
    icon: (
      <svg className="w-6 h-6 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
  {
    id: 'laser-whitening',
    title: 'Photonic Laser Enamel Whitening',
    badge: 'Instant Luster',
    description:
      'Therapeutic cold-laser light wavelengths gently unlock up to 8 shades of optical radiance without dental sensitivity or enamel erosion.',
    features: ['Custom remineralizing barrier', 'Up to 8 shades lighter in 60 mins', 'Long-lasting natural luminescence'],
    icon: (
      <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    id: 'dental-implants',
    title: 'Guided Titanium & Zirconia Implants',
    badge: 'Lifetime Restorations',
    description:
      'Robotic CBCT-guided micro-surgical placements creating an enduring foundation for single aesthetic crowns and full-arch restorations.',
    features: ['Micron-precise surgical navigation', 'Same-day provisional restoration', 'Superior biocompatible integration'],
    icon: (
      <svg className="w-6 h-6 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
  {
    id: 'invisalign',
    title: 'Diamond+ Clear Aligners & Orthodontics',
    badge: 'Discreet Correction',
    description:
      'Invisible medical-grade polymer trays calibrated with AI movement modeling to gracefully align teeth and optimize airway dimensions.',
    features: ['Accelerated weekly aligner cycles', 'Zero lifestyle or dietary limits', 'Virtually undetectable clarity'],
    icon: (
      <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
  },
  {
    id: 'gentle-care',
    title: 'Painless Sedation & Spa Dentistry',
    badge: 'Pure Serenity',
    description:
      'Boutique relaxation protocols featuring computerized pressure-free anesthesia, ambient noise-canceling acoustics, and heated ergonomics.',
    features: ['Computer-controlled needleless numbing', 'Twilight nitrous sedation options', 'Spa-inspired serene environment'],
    icon: (
      <svg className="w-6 h-6 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
];

export const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="relative z-30 bg-slate-950 py-28 sm:py-36 px-4 sm:px-6 lg:px-8 text-slate-100">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-cyan-400 text-[11px] font-semibold tracking-[0.25em] uppercase mb-4 shadow-lg shadow-cyan-500/10">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Curated Clinical Portfolio
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-tight leading-tight">
            Exemplary Treatments Sculpted with <span className="font-normal italic text-cyan-300">Precision</span>.
          </h2>
          <p className="text-slate-400 mt-5 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            At <strong className="text-white font-semibold">Smile Shine</strong>, clinical excellence is elevated into fine art. Every procedure is custom-architected for supreme comfort and enduring aesthetics.
          </p>
        </div>

        {/* Services Grid (3 cols desktop, 2 cols tablet, 1 col mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service) => (
            <div
              key={service.id}
              className="group relative rounded-3xl bg-slate-900/60 border border-white/[0.08] hover:border-cyan-500/40 p-8 sm:p-9 flex flex-col justify-between transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/10 hover:-translate-y-1 backdrop-blur-xl"
            >
              <div>
                {/* Header with Icon and Badge */}
                <div className="flex items-center justify-between mb-7">
                  <div className="w-13 h-13 p-3.5 rounded-2xl bg-slate-950/80 border border-white/10 flex items-center justify-center group-hover:scale-105 group-hover:border-cyan-500/40 transition-all duration-300">
                    {service.icon}
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] px-3.5 py-1 rounded-full bg-white/[0.04] text-cyan-300 border border-white/[0.08]">
                    {service.badge}
                  </span>
                </div>

                {/* Title and Description */}
                <h3 className="font-serif text-xl sm:text-2xl font-semibold text-white group-hover:text-cyan-200 transition-colors mb-3 leading-snug">
                  {service.title}
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Features List */}
                <ul className="space-y-2.5 pt-5 border-t border-white/[0.06]">
                  {service.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2.5 text-xs text-slate-300">
                      <svg className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="tracking-wide">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Consultation Link */}
              <div className="mt-8 pt-4">
                <Link
                  href="#booking"
                  className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-400 hover:text-cyan-300 group/link"
                >
                  <span>Reserve Consultation</span>
                  <svg className="w-3.5 h-3.5 transform group-hover/link:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
