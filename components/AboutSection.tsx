import React from 'react';

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
    specialty: 'Digital Smile Design, Handcrafted Veneers & Full Mouth Aesthetics',
    bio: 'Renowned for orchestrating transformative smiles with biometric precision and nuanced ceramic stratification that celebrates unique facial beauty.',
    initials: 'EV',
  },
  {
    name: 'Dr. Marcus Hayes, DMD, MS',
    role: 'Surgical Director & Implantologist',
    credentials: 'Columbia University | Diplomate, American Board of Oral Implantology',
    specialty: '3D CBCT Navigated Implants, Bone Regeneration & Full-Arch Restorations',
    bio: 'Pioneered computer-assisted micro-invasive implantology delivering instant functional loading with serene recovery experiences.',
    initials: 'MH',
  },
  {
    name: 'Dr. Sophia Lin, DDS, MS',
    role: 'Orthodontics & Facial Harmony Specialist',
    credentials: 'UPenn Dental Medicine | Diamond+ Top 1% Invisalign Provider',
    specialty: 'Accelerated Clear Aligner Protocols & Airway Aesthetics',
    bio: 'Dedicated to harmonic dental arch development, non-extraction alignment, and holistic facial proportion enhancement.',
    initials: 'SL',
  },
];

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="relative z-30 bg-slate-950 py-28 sm:py-36 px-4 sm:px-6 lg:px-8 text-slate-100 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto">
        {/* Top Story & Mission Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-28">
          <div className="lg:col-span-6 space-y-7">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-cyan-400 text-[11px] font-semibold tracking-[0.25em] uppercase shadow-lg shadow-cyan-500/10">
              <span>Haute Dentistry Philosophy</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-tight leading-tight">
              Where Engineering Meets <span className="italic text-cyan-300 font-normal">Artisanal Artistry</span>.
            </h2>
            <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed">
              <strong className="text-white font-bold">Smile Shine</strong> was established with a singular vision: to dismantle dental apprehension through serene luxury, uncompromising clinical mastery, and next-generation optical technology.
            </p>
            <p className="text-slate-400 text-xs sm:text-sm md:text-base leading-relaxed">
              From instant micron-precision 3D intraoral scans to our on-site ceramic atelier, we craft bespoke smile transformations that feel natural, radiant, and enduringly confident.
            </p>

            {/* Accreditations & Badges */}
            <div className="pt-3 flex flex-wrap items-center gap-3">
              {['AACD Accredited Fellow', 'ADA Member', 'ICOI Diplomate', 'Digital Smile Design Certified'].map((badge) => (
                <span
                  key={badge}
                  className="px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-[11px] font-medium tracking-wide text-slate-300 flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Pillars Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-7 rounded-3xl bg-slate-900/60 border border-white/[0.08] flex flex-col justify-between backdrop-blur-xl">
              <div className="w-11 h-11 rounded-2xl bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-serif font-bold text-lg mb-5">
                01
              </div>
              <h3 className="font-serif text-lg font-semibold text-white mb-1.5">Gentle Sanctuary Protocol</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Computerized needleless anesthesia delivery and soothing acoustic suites ensure zero-pain relaxation.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-slate-900/60 border border-white/[0.08] flex flex-col justify-between backdrop-blur-xl">
              <div className="w-11 h-11 rounded-2xl bg-sky-950/80 border border-sky-500/30 flex items-center justify-center text-sky-400 font-serif font-bold text-lg mb-5">
                02
              </div>
              <h3 className="font-serif text-lg font-semibold text-white mb-1.5">On-Site Master Ceramic Lab</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Custom chairside shade calibration and individual porcelain stratification by master ceramists.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-slate-900/60 border border-white/[0.08] flex flex-col justify-between backdrop-blur-xl">
              <div className="w-11 h-11 rounded-2xl bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-serif font-bold text-lg mb-5">
                03
              </div>
              <h3 className="font-serif text-lg font-semibold text-white mb-1.5">3D Biometric Optics</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                No uncomfortable trays. Sub-millimeter optical digital scanning in under 90 seconds.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-slate-900/60 border border-white/[0.08] flex flex-col justify-between backdrop-blur-xl">
              <div className="w-11 h-11 rounded-2xl bg-sky-950/80 border border-sky-500/30 flex items-center justify-center text-sky-400 font-serif font-bold text-lg mb-5">
                04
              </div>
              <h3 className="font-serif text-lg font-semibold text-white mb-1.5">Comprehensive Warranty</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Enduring clinical warranty on handcrafted veneers, crowns, and guided osseointegrated implants.
              </p>
            </div>
          </div>
        </div>

        {/* Doctor Team Introduction */}
        <div className="pt-16 border-t border-white/[0.06]">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-cyan-400 font-display">
              Clinical Leadership
            </span>
            <h3 className="font-serif text-2xl sm:text-4xl md:text-5xl font-light text-white mt-2">
              Meet the Masters Behind <span className="italic font-normal text-cyan-300">Smile Shine</span>
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm mt-3">
              Distinguished clinicians recognized internationally for surgical excellence and refined aesthetic finesse.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="rounded-3xl bg-slate-900/60 border border-white/[0.08] p-8 flex flex-col justify-between hover:border-cyan-500/40 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/10 group backdrop-blur-xl"
              >
                <div>
                  {/* Doctor Profile Visual Box */}
                  <div className="relative w-full aspect-[4/3] rounded-2xl bg-gradient-to-tr from-slate-950 via-slate-900 to-cyan-950/40 border border-white/[0.08] flex flex-col items-center justify-center mb-6 overflow-hidden group-hover:border-cyan-500/30 transition-all">
                    <div className="w-18 h-18 rounded-full bg-gradient-to-br from-cyan-500 via-sky-500 to-teal-400 p-[1.5px] shadow-xl group-hover:scale-105 transition-transform duration-300">
                      <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center text-white font-serif font-bold text-xl">
                        {member.initials}
                      </div>
                    </div>
                    <span className="text-[10px] font-medium tracking-[0.2em] text-slate-400 uppercase mt-3">
                      Board Certified Specialist
                    </span>
                  </div>

                  <h4 className="font-serif text-xl font-semibold text-white group-hover:text-cyan-200 transition-colors">
                    {member.name}
                  </h4>
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-cyan-400 mt-1">{member.role}</div>
                  <div className="text-[10px] text-slate-400 font-mono mt-1 mb-4">{member.credentials}</div>
                  <p className="text-slate-300 text-xs leading-relaxed mb-4">{member.bio}</p>
                </div>

                <div className="pt-4 border-t border-white/[0.06] text-[11px] text-slate-400">
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
