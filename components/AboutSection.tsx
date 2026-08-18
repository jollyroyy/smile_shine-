import React from 'react';
import Link from 'next/link';

interface DoctorTeamMember {
  name: string;
  role: string;
  credentials: string;
  specialty: string;
  bio: string;
  initials: string;
}

const teamMembers: DoctorTeamMember[] = [
  {
    name: 'Dr. Elena Vance, DDS, FAGD',
    role: 'Founder & Lead Cosmetic Prosthodontist',
    credentials: 'Harvard School of Dental Medicine | AACD Accredited Fellow',
    specialty: 'Digital Smile Design, Porcelain Veneers & Full Mouth Aesthetics',
    bio: 'With over 18 years refining smiles across Beverly Hills and New York, Dr. Vance combines bio-mechanical engineering precision with aesthetic facial proportion mapping.',
    initials: 'EV',
  },
  {
    name: 'Dr. Marcus Hayes, DMD, MS',
    role: 'Surgical Director & Implantologist',
    credentials: 'Columbia University | Diplomate, American Board of Oral Implantology',
    specialty: '3D CBCT Guided Implants, Bone Regeneration & All-on-X Restorations',
    bio: 'Pioneer in minimally invasive computer-navigated dental implants with a focus on immediate same-day restorative loading and zero-pain surgical recovery.',
    initials: 'MH',
  },
  {
    name: 'Dr. Sophia Lin, DDS, MS',
    role: 'Orthodontics & Facial Aesthetics',
    credentials: 'UPenn Dental Medicine | Diamond+ Top 1% Invisalign Provider',
    specialty: 'Accelerated Clear Aligner Therapy & Airway Orthodontics',
    bio: 'Specializes in harmonic bite alignment and subtle airway expansion, harmonizing dental arches with natural facial symmetry.',
    initials: 'SL',
  },
];

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="relative z-30 bg-slate-950 py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-slate-800 text-slate-100">
      <div className="max-w-7xl mx-auto">
        {/* Top Story & Mission Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs font-bold tracking-widest uppercase">
              <span>Our Philosophy & Craft</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
              Where High-Tech Dentistry Meets Bespoke Artistry.
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              At <strong className="text-white">WE DESIGN SMILES</strong>, we believe every smile is as unique as a fingerprint. Founded with a vision to eliminate dental anxiety, our clinic combines hospital-grade sterile environments with the soothing luxury of a boutique wellness spa.
            </p>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              We leverage completely paperless, digital workflows—from 3D intraoral HD scans to robotic-assisted implantology and in-house ceramic master labs—giving our patients predictable, natural, and lifelong aesthetic results.
            </p>

            {/* Accreditations & Badges */}
            <div className="pt-4 flex flex-wrap items-center gap-3">
              {['AACD Accredited', 'ADA Member', 'ICOI Fellow', 'Digital Smile Design Certified'].map((badge) => (
                <span
                  key={badge}
                  className="px-3.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-semibold text-cyan-300 flex items-center gap-1.5 shadow-sm"
                >
                  <svg className="w-3.5 h-3.5 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Clinic Stats & Pillars Box */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
              <div className="w-12 h-12 rounded-2xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold text-lg mb-4">
                01
              </div>
              <h3 className="text-lg font-bold text-white mb-1">Zero Pain Promise</h3>
              <p className="text-slate-400 text-xs sm:text-sm">
                Computerized anesthesia delivery and soothing acoustic suites ensure maximum serenity.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
              <div className="w-12 h-12 rounded-2xl bg-sky-950/60 border border-sky-500/30 flex items-center justify-center text-sky-400 font-bold text-lg mb-4">
                02
              </div>
              <h3 className="text-lg font-bold text-white mb-1">In-House Master Lab</h3>
              <p className="text-slate-400 text-xs sm:text-sm">
                Direct chairside shade matching and same-day ceramic adjustments by master ceramists.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
              <div className="w-12 h-12 rounded-2xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold text-lg mb-4">
                03
              </div>
              <h3 className="text-lg font-bold text-white mb-1">3D Biometric Scans</h3>
              <p className="text-slate-400 text-xs sm:text-sm">
                No messy impression trays. Instant micron-accurate optical modeling in seconds.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
              <div className="w-12 h-12 rounded-2xl bg-sky-950/60 border border-sky-500/30 flex items-center justify-center text-sky-400 font-bold text-lg mb-4">
                04
              </div>
              <h3 className="text-lg font-bold text-white mb-1">Comprehensive Warranty</h3>
              <p className="text-slate-400 text-xs sm:text-sm">
                Long-term clinical guarantee on porcelain veneers, crowns, and dental implants.
              </p>
            </div>
          </div>
        </div>

        {/* Doctor Team Introduction */}
        <div className="pt-12 border-t border-slate-800">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">Clinical Leadership</span>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white mt-2">
              Meet Your World-Class Dental Masters
            </h3>
            <p className="text-slate-400 text-sm sm:text-base mt-2">
              Renowned specialists dedicated to delivering exceptional clinical precision and natural aesthetic elegance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="rounded-3xl bg-slate-900/80 border border-slate-800 p-7 flex flex-col justify-between hover:border-cyan-500/40 transition-all hover:shadow-xl hover:shadow-cyan-950/30 group"
              >
                <div>
                  {/* Doctor Profile Placeholder Avatar */}
                  <div className="relative w-full aspect-[4/3] rounded-2xl bg-gradient-to-tr from-slate-800 via-slate-800/60 to-cyan-950/50 border border-slate-700/50 flex flex-col items-center justify-center mb-6 overflow-hidden group-hover:border-cyan-500/40 transition-all">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 to-sky-600 text-white font-extrabold text-2xl flex items-center justify-center shadow-xl group-hover:scale-105 transition-transform">
                      {member.initials}
                    </div>
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mt-3">
                      Board Certified Specialist
                    </span>
                  </div>

                  <h4 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {member.name}
                  </h4>
                  <div className="text-xs font-semibold text-cyan-400 mt-0.5">{member.role}</div>
                  <div className="text-[11px] text-slate-400 font-mono mt-1 mb-3">{member.credentials}</div>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">{member.bio}</p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <span className="font-medium text-slate-300">{member.specialty}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
