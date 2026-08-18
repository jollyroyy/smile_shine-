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
    <div className="h-screen w-full bg-slate-950 flex items-center justify-center text-cyan-400">
      <div className="w-10 h-10 border-2 border-cyan-500/20 border-t-cyan-400 rounded-full animate-spin" />
    </div>
  ),
});

const ResultsVideoScrubber = dynamic(() => import('@/components/ResultsVideoScrubber'), {
  ssr: false,
  loading: () => (
    <div className="h-screen w-full bg-slate-950 flex items-center justify-center text-cyan-400">
      <div className="w-10 h-10 border-2 border-cyan-500/20 border-t-cyan-400 rounded-full animate-spin" />
    </div>
  ),
});

const VideoSection3 = dynamic(() => import('@/components/VideoSection3'), {
  ssr: false,
  loading: () => (
    <div className="h-screen w-full bg-slate-950 flex items-center justify-center text-cyan-400">
      <div className="w-10 h-10 border-2 border-cyan-500/20 border-t-cyan-400 rounded-full animate-spin" />
    </div>
  ),
});

/**
 * Main Landing Page Component for "Smile Shine" Dental Clinic.
 * Features 3 seamless contiguous video sequences with zero interruptions between them,
 * followed by curated treatments, about master doctors, location map, and booking concierge.
 */
export default function HomePage() {
  const navSections = [
    { id: 'home', label: 'Home', href: '#home' },
    { id: 'videos', label: 'Virtual Tour', href: '#videos' },
    { id: 'gallery', label: 'Transformations', href: '#gallery' },
    { id: 'suites', label: 'Suites & Flow', href: '#suites' },
    { id: 'services', label: 'Treatments', href: '#services' },
    { id: 'about', label: 'About Us', href: '#about' },
    { id: 'location', label: 'Location', href: '#location' },
    { id: 'booking', label: 'Reserve Appointment', href: '#booking', isCta: true },
  ];

  return (
    <div
      id="home"
      className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-400 selection:text-slate-950 font-sans antialiased scroll-smooth"
    >
      {/* Sticky Haute Navigation Bar */}
      <Navigation sections={navSections} />

      {/* ========================================================================= */}
      {/* 1. SEAMLESS CONTIGUOUS VIDEO EXPERIENCE: 3 VIDEOS WITH ZERO INTERRUPTION */}
      {/* ========================================================================= */}
      <div className="relative w-full">
        {/* VIDEO 1: Virtual Tour Entrance (Video 3 Frames) */}
        <div id="videos">
          <HeroVideoScrubber
            videoFramePath="/videos/video_3_frames/frame_"
            totalFrames={300}
            overlayTitle="Smile Shine — Haute Dental Artistry"
            overlayDescription="Where clinical master-craft meets pure sanctuary serenity."
            scrollContainerHeight="350vh"
          />
        </div>

        {/* VIDEO 2: Smile Transformations & Results (Video 2 Frames) */}
        <div id="gallery">
          <ResultsVideoScrubber
            videoFramePath="/videos/video_2_frames/frame_"
            totalFrames={300}
            overlayTitle="Smile Shine Transformations — Before & After Artistry"
            overlayDescription="Witness natural facial harmony sculpted by master ceramists."
            scrollContainerHeight="350vh"
          />
        </div>

        {/* VIDEO 3: Operatory Suites & Patient Flow (Video 1 Frames) */}
        <div id="suites">
          <VideoSection3
            videoFramePath="/videos/video_1_frames/frame_"
            totalFrames={300}
            title="Smile Shine Sanctuary — Designed for Ultimate Comfort"
            description="Every dimension engineered for tranquility, luxury, and peace of mind."
            scrollContainerHeight="350vh"
          />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. EDITORIAL PHILOSOPHY QUOTE                                             */}
      {/* ========================================================================= */}
      <section className="relative z-30 bg-slate-950 py-24 sm:py-32 px-6 text-center border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="w-12 h-12 rounded-full bg-slate-900 border border-cyan-500/30 flex items-center justify-center mx-auto text-xl font-serif text-cyan-300 shadow-lg shadow-cyan-500/10">
            “
          </div>
          <p className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light italic text-slate-200 leading-snug tracking-tight">
            &ldquo;Every curve, contour, and shade of ceramic is individually sculpted to harmonize with your innate facial beauty and radiance.&rdquo;
          </p>
          <div className="pt-2">
            <span className="text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400 font-display">
              Dr. Elena Vance
            </span>
            <span className="text-slate-500 text-xs block mt-1 tracking-wider uppercase">
              Fellow, American Academy of Cosmetic Dentistry · Founder, Smile Shine
            </span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. CLINIC KEY METRICS & EXCELLENCE PILLARS                                */}
      {/* ========================================================================= */}
      <section className="relative z-30 bg-slate-900/60 backdrop-blur-2xl border-y border-white/[0.06] py-16 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          <div>
            <div className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight">
              15,000<span className="text-cyan-400 font-normal">+</span>
            </div>
            <div className="text-[11px] sm:text-xs text-slate-400 mt-2 font-medium uppercase tracking-[0.2em]">
              Smiles Perfected
            </div>
          </div>
          <div>
            <div className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight">
              99.8<span className="text-cyan-400 font-normal">%</span>
            </div>
            <div className="text-[11px] sm:text-xs text-slate-400 mt-2 font-medium uppercase tracking-[0.2em]">
              Patient Satisfaction
            </div>
          </div>
          <div>
            <div className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight">
              25<span className="text-cyan-400 font-normal">+</span>
            </div>
            <div className="text-[11px] sm:text-xs text-slate-400 mt-2 font-medium uppercase tracking-[0.2em]">
              Years Clinical Mastery
            </div>
          </div>
          <div>
            <div className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight">
              100<span className="text-cyan-400 font-normal">%</span>
            </div>
            <div className="text-[11px] sm:text-xs text-slate-400 mt-2 font-medium uppercase tracking-[0.2em]">
              Digital 3D Workflow
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. CURATED TREATMENTS & SERVICES MENU                                     */}
      {/* ========================================================================= */}
      <ServicesSection />

      {/* ========================================================================= */}
      {/* 5. ABOUT US & MASTER DOCTOR TEAM                                          */}
      {/* ========================================================================= */}
      <AboutSection />

      {/* ========================================================================= */}
      {/* 6. CLINIC LOCATION & 16:9 MAP                                             */}
      {/* ========================================================================= */}
      <LocationSection />

      {/* ========================================================================= */}
      {/* 7. PRIVATE APPOINTMENT CONCIERGE                                          */}
      {/* ========================================================================= */}
      <BookingForm />

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
