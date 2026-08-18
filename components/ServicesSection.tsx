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
    title: 'Digital Smile Design & 3D Planning',
    badge: 'Flagship Tech',
    description:
      'Preview your perfect smile before treatment begins using 3D intraoral scanning, facial harmony analysis, and digital mockups.',
    features: ['Real-time 3D smile preview', 'Precision biometric fitting', '0% guesswork'],
    icon: (
      <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: 'porcelain-veneers',
    title: 'Custom Porcelain Veneers',
    badge: 'Cosmetic Artistry',
    description:
      'Ultra-thin, handcrafted ceramic veneers designed by master dental artisans to correct chips, discoloration, gaps, and misalignment.',
    features: ['E-max & Zirconia porcelain', 'Natural translucency match', 'Stain-resistant finish'],
    icon: (
      <svg className="w-6 h-6 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
  {
    id: 'laser-whitening',
    title: 'Laser Teeth Whitening',
    badge: '1-Hour Results',
    description:
      'Advanced medical laser light activation gently brightens enamel up to 8 shades in a single comfortable 60-minute session.',
    features: ['Zero sensitivity formula', 'Up to 8 shades lighter', 'Long-lasting brilliance'],
    icon: (
      <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    id: 'dental-implants',
    title: 'Guided Dental Implants',
    badge: 'Lifetime Restorations',
    description:
      'Computer-guided titanium & ceramic implant placements providing rock-solid foundation for single crowns or full-arch All-on-4 restorations.',
    features: ['3D CBCT guided surgery', 'Same-day temporary crowns', 'Lifetime osseointegration'],
    icon: (
      <svg className="w-6 h-6 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
  {
    id: 'invisalign',
    title: 'Clear Aligners & Orthodontics',
    badge: 'Discreet Correction',
    description:
      'Virtually invisible medical-grade aligners that straighten teeth smoothly without metal brackets, wires, or dietary restrictions.',
    features: ['Custom weekly progression trays', 'Removable for dining', 'Accelerated tooth movement'],
    icon: (
      <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
  },
  {
    id: 'gentle-care',
    title: 'Pain-Free & Sedation Care',
    badge: 'Stress-Free',
    description:
      'Relaxation protocols and needle-less numbing designed specifically for anxious patients, creating a calm, spa-like experience.',
    features: ['Nitrous oxide & twilight sedation', 'Noise-canceling headphones', 'Heated comfort chairs'],
    icon: (
      <svg className="w-6 h-6 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
];

export const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="relative z-30 bg-slate-900 py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs font-bold tracking-widest uppercase mb-4">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            Comprehensive Dental Excellence
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            Specialized Treatments Tailored to Your Smile
          </h2>
          <p className="text-slate-400 mt-4 text-base sm:text-lg">
            From precision digital smile makeovers to gentle preventive dentistry, our master specialists combine cutting-edge technology with bespoke clinical care.
          </p>
        </div>

        {/* Services Grid (3 cols desktop, 2 cols tablet, 1 col mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service) => (
            <div
              key={service.id}
              className="group relative rounded-3xl bg-slate-950/70 border border-slate-800/80 hover:border-cyan-500/50 p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10 hover:-translate-y-1 backdrop-blur-sm"
            >
              <div>
                {/* Header with Icon and Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-700/60 flex items-center justify-center group-hover:scale-110 group-hover:bg-cyan-950/50 group-hover:border-cyan-500/40 transition-all">
                    {service.icon}
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-slate-800 text-cyan-300 border border-slate-700">
                    {service.badge}
                  </span>
                </div>

                {/* Title and Description */}
                <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-3">
                  {service.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Features List */}
                <ul className="space-y-2.5 pt-4 border-t border-slate-800/80">
                  {service.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-300 font-medium">
                      <svg className="w-4 h-4 text-cyan-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Consultation Link */}
              <div className="mt-8 pt-4">
                <Link
                  href="#booking"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400 hover:text-cyan-300 group/link"
                >
                  <span>Book Consultation</span>
                  <svg className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
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
