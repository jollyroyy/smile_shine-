'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export interface NavItem {
  id: string;
  label: string;
  href: string;
  isCta?: boolean;
}

export interface NavigationProps {
  /**
   * Optional custom list of section IDs or nav items to observe and navigate to.
   * e.g. ['home', 'videos', 'gallery', 'about', 'services', 'booking']
   * or array of NavItem objects.
   */
  sections?: (string | NavItem)[];
}

const DEFAULT_NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'videos', label: 'Videos', href: '#videos' },
  { id: 'gallery', label: 'Gallery', href: '#gallery' },
  { id: 'about', label: 'About Us', href: '#about' },
  { id: 'services', label: 'Services', href: '#services' },
  { id: 'booking', label: 'Book Appointment', href: '#booking', isCta: true },
];

export const Navigation: React.FC<NavigationProps> = ({ sections }) => {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Normalize sections prop into standardized NavItem array
  const navItems: NavItem[] = React.useMemo(() => {
    if (!sections || sections.length === 0) {
      return DEFAULT_NAV_ITEMS;
    }

    return sections.map((sec) => {
      if (typeof sec === 'string') {
        const id = sec.replace(/^#/, '');
        const labelMap: Record<string, string> = {
          home: 'Home',
          videos: 'Videos',
          walkthrough: 'Videos',
          gallery: 'Gallery',
          transformations: 'Gallery',
          about: 'About Us',
          services: 'Services',
          location: 'Location',
          booking: 'Book Appointment',
          appointment: 'Book Appointment',
        };
        const label =
          labelMap[id.toLowerCase()] ||
          id.charAt(0).toUpperCase() + id.slice(1).replace(/[-_]/g, ' ');

        return {
          id,
          label,
          href: `#${id}`,
          isCta: id.toLowerCase().includes('book') || id.toLowerCase() === 'booking',
        };
      }
      return sec;
    });
  }, [sections]);

  // Track scroll position to update active section & sticky shadow styling
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 30);

      const navHeight = 90; // offset for fixed header
      const sectionElements = navItems
        .map((item) => ({
          id: item.id,
          element: document.getElementById(item.id),
        }))
        .filter((item): item is { id: string; element: HTMLElement } => item.element !== null);

      if (sectionElements.length === 0) return;

      // Check which section is currently in view
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const { id, element } = sectionElements[i];
        const offsetTop = element.offsetTop - navHeight - 50;
        if (scrollPosition >= offsetTop) {
          setActiveSection(id);
          break;
        }
      }

      // If at very top, default to first item
      if (scrollPosition < 100 && sectionElements.length > 0) {
        setActiveSection(sectionElements[0].id);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial evaluation on mount

    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  // Smooth scroll handler
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    id: string
  ) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetElement = document.getElementById(id) || document.querySelector(href);
      if (targetElement) {
        const navHeight = 80;
        const targetPosition =
          targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;

        window.scrollTo({
          top: Math.max(0, targetPosition),
          behavior: 'smooth',
        });
        setActiveSection(id);
      } else {
        // If element doesn't exist, scroll to top if home
        if (id === 'home') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          setActiveSection('home');
        }
      }
      setMobileMenuOpen(false);
    }
  };

  const regularLinks = navItems.filter((item) => !item.isCta);
  const ctaLink = navItems.find((item) => item.isCta);

  return (
    <nav
      role="navigation"
      aria-label="Main Navigation"
      className={`sticky top-0 inset-x-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-950/85 backdrop-blur-md shadow-lg shadow-black/20 border-b border-slate-800/80 py-3.5'
          : 'bg-slate-950/60 backdrop-blur-sm border-b border-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* (1) Clinic Logo / Branding in Teal (#06b6d4) */}
        <Link
          href="#home"
          onClick={(e) => handleNavClick(e, '#home', 'home')}
          className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#06b6d4] rounded-xl p-1"
          aria-label="WE DESIGN SMILES - Return to top"
        >
          {/* Teal Icon Container */}
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#06b6d4] to-cyan-400 flex items-center justify-center shadow-lg shadow-[#06b6d4]/30 group-hover:scale-105 transition-transform">
            <svg
              className="w-6 h-6 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z" />
              <path d="M8 14s1.5 2 4 2 4-2 4-2" />
              <line x1="9" y1="9" x2="9.01" y2="9" />
              <line x1="15" y1="9" x2="15.01" y2="9" />
            </svg>
          </div>

          {/* Branding Typography with Teal Accent */}
          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-black tracking-wider text-white uppercase group-hover:text-[#06b6d4] transition-colors leading-tight">
              WE DESIGN <span className="text-[#06b6d4]">SMILES</span>
            </span>
            <span className="text-[10px] sm:text-xs font-semibold tracking-widest text-[#06b6d4] uppercase">
              Dental Clinic & Aesthetics
            </span>
          </div>
        </Link>

        {/* (2) & (3) Desktop Navigation: Horizontal Menu with Active Highlight */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-2">
          {regularLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <Link
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href, link.id)}
                className={`relative px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'text-[#06b6d4] bg-cyan-950/40'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900/50'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {link.label}
                {/* Active Indicator Underline */}
                {isActive && (
                  <span className="absolute bottom-0 inset-x-3 h-0.5 bg-[#06b6d4] rounded-full shadow-sm shadow-[#06b6d4]" />
                )}
              </Link>
            );
          })}
        </div>

        {/* (7) Desktop CTA Button: "Book Appointment" in Teal with Hover Effects */}
        {ctaLink && (
          <div className="hidden sm:flex items-center">
            <Link
              href={ctaLink.href}
              onClick={(e) => handleNavClick(e, ctaLink.href, ctaLink.id)}
              className="px-5 py-2.5 rounded-full bg-[#06b6d4] hover:bg-cyan-400 text-slate-950 hover:text-black font-extrabold text-xs sm:text-sm tracking-wide shadow-lg shadow-[#06b6d4]/25 hover:shadow-[#06b6d4]/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center gap-2"
            >
              <span>{ctaLink.label}</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        )}

        {/* (4) Mobile: Hamburger Menu Icon */}
        <button
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="lg:hidden p-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/60 focus:outline-none focus:ring-2 focus:ring-[#06b6d4] transition-colors"
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* (4) Mobile Vertical Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950/95 backdrop-blur-xl border-b border-slate-800 px-6 py-6 transition-all duration-300 animate-fadeIn">
          <div className="flex flex-col gap-2">
            {regularLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <Link
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href, link.id)}
                  className={`py-3 px-4 rounded-xl text-base font-semibold flex items-center justify-between transition-colors ${
                    isActive
                      ? 'bg-cyan-950/60 text-[#06b6d4] border border-[#06b6d4]/30'
                      : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-[#06b6d4]" />}
                </Link>
              );
            })}

            {ctaLink && (
              <div className="pt-4 mt-2 border-t border-slate-800">
                <Link
                  href={ctaLink.href}
                  onClick={(e) => handleNavClick(e, ctaLink.href, ctaLink.id)}
                  className="w-full text-center py-3.5 rounded-xl bg-[#06b6d4] hover:bg-cyan-400 text-slate-950 font-extrabold text-sm uppercase tracking-wider shadow-lg shadow-[#06b6d4]/20 block transition-all"
                >
                  {ctaLink.label}
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
