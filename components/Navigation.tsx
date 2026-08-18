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
  sections?: (string | NavItem)[];
}

const DEFAULT_NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'videos', label: 'Virtual Tour', href: '#videos' },
  { id: 'gallery', label: 'Transformations', href: '#gallery' },
  { id: 'suites', label: 'Suites & Flow', href: '#suites' },
  { id: 'services', label: 'Treatments', href: '#services' },
  { id: 'about', label: 'About Us', href: '#about' },
  { id: 'location', label: 'Location', href: '#location' },
  { id: 'booking', label: 'Reserve Appointment', href: '#booking', isCta: true },
];

export const Navigation: React.FC<NavigationProps> = ({ sections }) => {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const navItems: NavItem[] = React.useMemo(() => {
    if (!sections || sections.length === 0) {
      return DEFAULT_NAV_ITEMS;
    }

    return sections.map((sec) => {
      if (typeof sec === 'string') {
        const id = sec.replace(/^#/, '');
        const labelMap: Record<string, string> = {
          home: 'Home',
          videos: 'Virtual Tour',
          walkthrough: 'Virtual Tour',
          gallery: 'Transformations',
          suites: 'Suites & Flow',
          continuity: 'Suites & Flow',
          about: 'About Us',
          services: 'Treatments',
          location: 'Location',
          booking: 'Reserve Appointment',
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

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 30);

      const navHeight = 90;
      const sectionElements = navItems
        .map((item) => ({
          id: item.id,
          element: document.getElementById(item.id),
        }))
        .filter((item): item is { id: string; element: HTMLElement } => item.element !== null);

      if (sectionElements.length === 0) return;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const { id, element } = sectionElements[i];
        const offsetTop = element.offsetTop - navHeight - 50;
        if (scrollPosition >= offsetTop) {
          setActiveSection(id);
          break;
        }
      }

      if (scrollPosition < 100 && sectionElements.length > 0) {
        setActiveSection(sectionElements[0].id);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

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
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-slate-950/80 backdrop-blur-2xl shadow-2xl shadow-black/40 border-b border-white/[0.08] py-3.5'
          : 'bg-gradient-to-b from-slate-950/90 via-slate-950/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand: Smile Shine */}
        <Link
          href="#home"
          onClick={(e) => handleNavClick(e, '#home', 'home')}
          className="flex items-center gap-3.5 group focus:outline-none focus:ring-1 focus:ring-cyan-400 rounded-xl"
          aria-label="Smile Shine - Return to top"
        >
          {/* Luminous Emblem */}
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 via-sky-400 to-teal-300 p-[1px] shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 group-hover:scale-105 transition-all duration-300">
            <div className="w-full h-full rounded-[15px] bg-slate-950 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-cyan-400 group-hover:text-cyan-300 transition-colors"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z" />
                <path d="M8 13.5s1.5 2.5 4 2.5 4-2.5 4-2.5" />
                <circle cx="9" cy="9" r="1.2" fill="currentColor" />
                <circle cx="15" cy="9" r="1.2" fill="currentColor" />
              </svg>
            </div>
          </div>

          {/* Typography: Smile Shine */}
          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-extrabold tracking-[0.12em] text-white uppercase group-hover:text-cyan-300 transition-colors leading-none font-display">
              Smile <span className="font-light tracking-[0.18em] text-cyan-400">Shine</span>
            </span>
            <span className="text-[9px] sm:text-[10px] font-medium tracking-[0.28em] text-slate-400 uppercase mt-1">
              Haute Dental Studio
            </span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-2">
          {regularLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <Link
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href, link.id)}
                className={`relative px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] transition-all duration-300 rounded-full ${
                  isActive
                    ? 'text-cyan-300 bg-white/[0.06] border border-cyan-500/30 shadow-sm shadow-cyan-500/10'
                    : 'text-slate-300 hover:text-white hover:bg-white/[0.03]'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* CTA Button in Teal */}
        {ctaLink && (
          <div className="hidden sm:flex items-center">
            <Link
              href={ctaLink.href}
              onClick={(e) => handleNavClick(e, ctaLink.href, ctaLink.id)}
              className="relative group overflow-hidden px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 via-sky-500 to-teal-400 text-slate-950 font-bold text-xs uppercase tracking-[0.18em] shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center gap-2"
            >
              <span className="relative z-10">{ctaLink.label}</span>
              <svg
                className="w-3.5 h-3.5 relative z-10 transform group-hover:translate-x-0.5 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.4}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        )}

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="lg:hidden p-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/60 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-colors"
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950/95 backdrop-blur-2xl border-b border-white/[0.08] px-6 py-6 transition-all duration-300">
          <div className="flex flex-col gap-2">
            {regularLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <Link
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href, link.id)}
                  className={`py-3 px-4 rounded-xl text-xs font-semibold uppercase tracking-[0.18em] flex items-center justify-between transition-colors ${
                    isActive
                      ? 'bg-cyan-950/50 text-cyan-300 border border-cyan-500/30'
                      : 'text-slate-300 hover:bg-white/[0.04] hover:text-white'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />}
                </Link>
              );
            })}

            {ctaLink && (
              <div className="pt-4 mt-2 border-t border-white/[0.08]">
                <Link
                  href={ctaLink.href}
                  onClick={(e) => handleNavClick(e, ctaLink.href, ctaLink.id)}
                  className="w-full text-center py-3.5 rounded-full bg-gradient-to-r from-cyan-500 to-teal-400 text-slate-950 font-bold text-xs uppercase tracking-[0.2em] shadow-lg shadow-cyan-500/20 block transition-all"
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
