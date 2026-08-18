import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="relative z-30 bg-slate-950 border-t border-slate-800 text-slate-400 text-xs sm:text-sm py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
        {/* Brand Column */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-sky-400 flex items-center justify-center text-white shadow-md">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z" />
                <path d="M8 14s1.5 2 4 2 4-2 4-2" />
              </svg>
            </div>
            <span className="text-lg font-black text-white uppercase tracking-wider">
              We Design Smiles
            </span>
          </div>
          <p className="text-slate-400 max-w-sm text-xs leading-relaxed">
            Pioneering the intersection of cutting-edge biometric dental engineering and boutique cosmetic artistry. Transforming confidence one smile at a time.
          </p>
          <div className="text-[11px] text-slate-500 font-mono">
            450 Aesthetic Blvd, Ste 800, Beverly Hills, CA 90210
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <span className="block font-bold text-white uppercase tracking-wider text-xs mb-4">
            Navigation
          </span>
          <ul className="space-y-2.5 text-xs">
            <li><Link href="#walkthrough" className="hover:text-cyan-400 transition-colors">Virtual Tour</Link></li>
            <li><Link href="#transformations" className="hover:text-cyan-400 transition-colors">Results Gallery</Link></li>
            <li><Link href="#continuity" className="hover:text-cyan-400 transition-colors">Clinic Continuity</Link></li>
            <li><Link href="#services" className="hover:text-cyan-400 transition-colors">Services & Treatments</Link></li>
            <li><Link href="#about" className="hover:text-cyan-400 transition-colors">About Our Doctors</Link></li>
            <li><Link href="#location" className="hover:text-cyan-400 transition-colors">Location & Hours</Link></li>
          </ul>
        </div>

        {/* Treatments */}
        <div>
          <span className="block font-bold text-white uppercase tracking-wider text-xs mb-4">
            Cosmetic Treatments
          </span>
          <ul className="space-y-2.5 text-xs">
            <li><Link href="#services" className="hover:text-cyan-400 transition-colors">Digital Smile Design</Link></li>
            <li><Link href="#services" className="hover:text-cyan-400 transition-colors">Porcelain Veneers</Link></li>
            <li><Link href="#services" className="hover:text-cyan-400 transition-colors">Laser Whitening</Link></li>
            <li><Link href="#services" className="hover:text-cyan-400 transition-colors">Guided Implants</Link></li>
            <li><Link href="#services" className="hover:text-cyan-400 transition-colors">Clear Aligners</Link></li>
            <li><Link href="#services" className="hover:text-cyan-400 transition-colors">Sedation Dentistry</Link></li>
          </ul>
        </div>

        {/* Legal & Accreditations */}
        <div>
          <span className="block font-bold text-white uppercase tracking-wider text-xs mb-4">
            Contact & Emergencies
          </span>
          <div className="space-y-2 text-xs">
            <div className="text-white font-bold">Direct Line: (555) 019-2834</div>
            <div className="text-cyan-400 font-semibold">24/7 Dental Emergency Hotline</div>
            <div className="text-slate-400">concierge@wedesignsmiles.com</div>
            <div className="pt-2 text-[11px] text-slate-500">
              Licensed Dental Corporation under State Board of California.
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div>
          &copy; {new Date().getFullYear()} WE DESIGN SMILES Dental Clinic. All Rights Reserved.
        </div>
        <div className="flex items-center gap-6">
          <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
          <span className="hover:text-slate-400 cursor-pointer">HIPAA Notice</span>
          <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
