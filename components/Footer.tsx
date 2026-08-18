import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="relative z-30 bg-slate-950 border-t border-white/[0.06] text-slate-400 text-xs py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
        {/* Brand Column */}
        <div className="lg:col-span-2 space-y-5">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 via-sky-400 to-teal-300 p-[1px] shadow-md">
              <div className="w-full h-full rounded-[15px] bg-slate-950 flex items-center justify-center">
                <svg className="w-5 h-5 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z" />
                  <path d="M8 13.5s1.5 2.5 4 2.5 4-2.5 4-2.5" />
                </svg>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-extrabold tracking-[0.12em] text-white uppercase font-display leading-none">
                Smile <span className="font-light tracking-[0.18em] text-cyan-400">Shine</span>
              </span>
              <span className="text-[9px] font-medium tracking-[0.25em] text-slate-400 uppercase mt-1">
                Haute Dental Studio
              </span>
            </div>
          </div>
          <p className="text-slate-400 max-w-sm text-xs leading-relaxed">
            Pioneering the intersection of cutting-edge biometric dental engineering and bespoke cosmetic artistry. Transforming confidence one radiant smile at a time.
          </p>
          <div className="text-[10px] text-slate-500 font-mono">
            301-304, Signature Elite Arcade, RC Dutt Road, Alkapuri, Vadodara, Gujarat 390007
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <span className="block font-semibold text-white uppercase tracking-[0.2em] text-[11px] mb-4">
            Navigation
          </span>
          <ul className="space-y-2.5 text-xs text-slate-400">
            <li><Link href="#home" className="hover:text-cyan-300 transition-colors">Home Studio</Link></li>
            <li><Link href="#videos" className="hover:text-cyan-300 transition-colors">Virtual Tour</Link></li>
            <li><Link href="#gallery" className="hover:text-cyan-300 transition-colors">Transformations</Link></li>
            <li><Link href="#suites" className="hover:text-cyan-300 transition-colors">Clinic Suites & Flow</Link></li>
            <li><Link href="#services" className="hover:text-cyan-300 transition-colors">Curated Treatments</Link></li>
            <li><Link href="#about" className="hover:text-cyan-300 transition-colors">About Our Masters</Link></li>
          </ul>
        </div>

        {/* Treatments */}
        <div>
          <span className="block font-semibold text-white uppercase tracking-[0.2em] text-[11px] mb-4">
            Cosmetic Atelier
          </span>
          <ul className="space-y-2.5 text-xs text-slate-400">
            <li><Link href="#services" className="hover:text-cyan-300 transition-colors">Digital Smile Design</Link></li>
            <li><Link href="#services" className="hover:text-cyan-300 transition-colors">Handcrafted Veneers</Link></li>
            <li><Link href="#services" className="hover:text-cyan-300 transition-colors">Photonic Laser Whitening</Link></li>
            <li><Link href="#services" className="hover:text-cyan-300 transition-colors">Guided Implants</Link></li>
            <li><Link href="#services" className="hover:text-cyan-300 transition-colors">Diamond+ Clear Aligners</Link></li>
            <li><Link href="#services" className="hover:text-cyan-300 transition-colors">Sedation Serenity Care</Link></li>
          </ul>
        </div>

        {/* Contact & Hours */}
        <div>
          <span className="block font-semibold text-white uppercase tracking-[0.2em] text-[11px] mb-4">
            Direct Concierge
          </span>
          <div className="space-y-2 text-xs">
            <div className="text-white font-semibold">+91 98250 12345</div>
            <div className="text-cyan-400 text-[11px]">24/7 Dental Emergency On-Call</div>
            <div className="text-slate-400">concierge@smileshine.com</div>
            <div className="pt-2 text-[10px] text-slate-500 leading-normal">
              State-of-the-art accredited clinical dental studio in Vadodara, Gujarat.
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
        <div>
          &copy; {new Date().getFullYear()} Smile Shine Dental Studio. All Rights Reserved.
        </div>
        <div className="flex items-center gap-6">
          <span className="hover:text-slate-400 cursor-pointer">Privacy Protocol</span>
          <span className="hover:text-slate-400 cursor-pointer">HIPAA Compliance</span>
          <span className="hover:text-slate-400 cursor-pointer">Terms of Concierge</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
