'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import Navigation from '@/components/Navigation';
import ServicesSection from '@/components/ServicesSection';
import AboutSection from '@/components/AboutSection';
import LocationSection from '@/components/LocationSection';
import BookingForm from '@/components/BookingForm';
import Footer from '@/components/Footer';

// Dynamic imports for the interactive video scrubber components for fast page loading
const HeroVideoScrubber = dynamic(() => import('@/components/HeroVideoScrubber'), {
  ssr: false,
  loading: () => (
    <div className="h-screen w-full bg-slate-950 flex items-center justify-center text-[#06b6d4]">
      <div className="w-10 h-10 border-4 border-cyan-500/20 border-t-[#06b6d4] rounded-full animate-spin" />
    </div>
  ),
});

const ResultsVideoScrubber = dynamic(() => import('@/components/ResultsVideoScrubber'), {
  ssr: false,
  loading: () => (
    <div className="h-screen w-full bg-slate-950 flex items-center justify-center text-[#06b6d4]">
      <div className="w-10 h-10 border-4 border-cyan-500/20 border-t-[#06b6d4] rounded-full animate-spin" />
    </div>
  ),
});

const VideoSection3 = dynamic(() => import('@/components/VideoSection3'), {
  ssr: false,
  loading: () => (
    <div className="h-screen w-full bg-slate-950 flex items-center justify-center text-[#06b6d4]">
      <div className="w-10 h-10 border-4 border-cyan-500/20 border-t-[#06b6d4] rounded-full animate-spin" />
    </div>
  ),
});

/**
 * Main Landing Page Component for "WE DESIGN SMILES" Dental Clinic.
 * Integrates Navigation, 3 Video Scrubber Hero Sections, Services, About Us, Location & Map, and Booking Engine.
 */
export default function HomePage() {
  const navSections = [
    { id: 'home', label: 'Home', href: '#home' },
    { id: 'videos', label: 'Videos', href: '#videos' },
    { id: 'gallery', label: 'Gallery', href: '#gallery' },
    { id: 'about', label: 'About Us', href: '#about' },
    { id: 'services', label: 'Services', href: '#services' },
    { id: 'booking', label: 'Book Appointment', href: '#booking', isCta: true },
  ];

  return (
    <div
      id="home"
      className="min-h-screen bg-slate-950 text-slate-100 selection:bg-[#06b6d4] selection:text-slate-950 font-sans antialiased scroll-smooth"
    >
      {/* Sticky Navigation Component */}
      <Navigation sections={navSections} />

      {/* ========================================================================= */}
      {/* 1. HERO VIDEO SECTION 1: Virtual Tour (Reception -> Doctor Chair)        */}
      {/* ========================================================================= */}
      <div id="videos">
        <HeroVideoScrubber
          videoFramePath="/videos/video_1_frames/frame_"
          totalFrames={300}
          overlayTitle="We Design Smiles - Professional Dental Care"
          overlayDescription="Your journey to perfect smiles starts here."
          scrollContainerHeight="350vh"
        />
      </div>

      {/* Clinic Key Metrics Ribbon */}
      <div className="relative z-30 bg-slate-900/95 backdrop-blur-xl border-y border-slate-800 py-12 px-6 shadow-2xl">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#06b6d4] tracking-tight">15,000+</div>
            <div className="text-xs sm:text-sm text-slate-400 mt-2 font-medium uppercase tracking-wider">
              Smiles Perfected
            </div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#06b6d4] tracking-tight">99.8%</div>
            <div className="text-xs sm:text-sm text-slate-400 mt-2 font-medium uppercase tracking-wider">
              Patient Satisfaction
            </div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#06b6d4] tracking-tight">25+</div>
            <div className="text-xs sm:text-sm text-slate-400 mt-2 font-medium uppercase tracking-wider">
              Years Clinical Mastery
            </div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#06b6d4] tracking-tight">100%</div>
            <div className="text-xs sm:text-sm text-slate-400 mt-2 font-medium uppercase tracking-wider">
              Digital 3D Workflow
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. VIDEO SECTION 2: Results Gallery (Treatment Chair -> Results Wall)     */}
      {/* ========================================================================= */}
      <div id="gallery">
        <ResultsVideoScrubber
          videoFramePath="/videos/video_2_frames/frame_"
          totalFrames={300}
          overlayTitle="See Our Smile Transformations - Before & After Results"
          overlayDescription="Join hundreds of satisfied patients who achieved their dream smiles."
          scrollContainerHeight="350vh"
        />
      </div>

      {/* Editorial Philosophy Quote Banner */}
      <div className="relative z-30 bg-slate-900/90 backdrop-blur-md border-y border-slate-800 py-16 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="w-10 h-10 rounded-full bg-cyan-950 text-[#06b6d4] border border-[#06b6d4]/30 flex items-center justify-center mx-auto text-xl font-serif">
            “
          </div>
          <p className="text-xl sm:text-2xl md:text-3xl font-light italic text-slate-200 leading-snug">
            &ldquo;Every curve, contour, and shade of porcelain is customized to harmonize with your facial aesthetics and natural radiance.&rdquo;
          </p>
          <div className="pt-2">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#06b6d4]">
              Dr. Elena Vance
            </span>
            <span className="text-slate-500 text-xs block mt-0.5">
              Fellow, American Academy of Cosmetic Dentistry
            </span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. VIDEO SECTION 3: Clinic Continuity & Flow (Lounge -> Active Suites)    */}
      {/* ========================================================================= */}
      <div>
        <VideoSection3
          videoFramePath="/videos/video_3_frames/frame_"
          totalFrames={300}
          title="Professional Clinic Design - Built for Your Comfort"
          description="Every space designed for your peace of mind."
          scrollContainerHeight="350vh"
        />
      </div>

      {/* ========================================================================= */}
      {/* 4. ABOUT US & DOCTOR TEAM                                                 */}
      {/* ========================================================================= */}
      <AboutSection />

      {/* ========================================================================= */}
      {/* 5. SERVICES / TREATMENTS MENU                                             */}
      {/* ========================================================================= */}
      <ServicesSection />

      {/* ========================================================================= */}
      {/* 6. CLINIC LOCATION & 16:9 MAP                                             */}
      {/* ========================================================================= */}
      <LocationSection />

      {/* ========================================================================= */}
      {/* 7. APPOINTMENT BOOKING ENGINE                                             */}
      {/* ========================================================================= */}
      <BookingForm />

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
