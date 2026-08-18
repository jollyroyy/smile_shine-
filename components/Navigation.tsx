'use client';

import React, { useEffect, useRef, useState } from 'react';
import { CLINIC } from '@/lib/clinic';
import { BookButton } from '@/components/BookingWidget';

/* Five destinations, not eight.
   The first draft listed Home, Virtual Tour, Transformations, Suites & Flow,
   Treatments, About Us, Location and Reserve Appointment -- three of which were
   the same film described three ways. A patient arrives wanting to know what
   you do, whether it works, who does it, where you are, and how to book, so
   those are the five things here. */

const LINKS = [
  { id: 'treatments', label: 'Treatments' },
  { id: 'voices', label: 'Patients' },
  { id: 'practice', label: 'The practice' },
  { id: 'visit', label: 'Visit' },
];

export default function Navigation() {
  const [lifted, setLifted] = useState(false);
  const [active, setActive] = useState('');
  const [open, setOpen] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const read = () => {
      rafRef.current = null;
      setLifted(window.scrollY > 24);

      /* The film sections are 350vh tall and pinned, so "which section am I in"
         cannot be answered from a single observer threshold. Walk the list
         backwards and take the last one whose top has passed under the bar. */
      let current = '';
      for (const l of LINKS) {
        const el = document.getElementById(l.id);
        if (el && el.getBoundingClientRect().top <= 120) current = l.id;
      }
      setActive(current);
    };

    const onScroll = () => {
      if (rafRef.current === null) rafRef.current = requestAnimationFrame(read);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    read();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  /* Close the drawer on Escape, and stop the page moving underneath it. */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  const go = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    setOpen(false);
    window.scrollTo({
      top: Math.max(0, el.getBoundingClientRect().top + window.scrollY - 72),
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    });
  };

  return (
    <>
      <header
        className={
          'fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,padding] duration-500 ease-ease ' +
          (lifted
            ? 'border-b border-line bg-ink/92 py-3 backdrop-blur-xl'
            : 'border-b border-transparent py-5')
        }
      >
        {/* At the top of the page the bar sits directly on a film frame, and
            these frames open on a lit reception -- pale marble, ceiling lights.
            Without a ground the links fail contrast against their own
            background. This is a legibility scrim, not decoration, so it exists
            only while the bar is transparent. */}
        <div
          aria-hidden="true"
          className={
            'pointer-events-none absolute inset-x-0 top-0 -z-10 h-32 bg-gradient-to-b from-ink via-ink/60 to-transparent transition-opacity duration-500 ' +
            (lifted ? 'opacity-0' : 'opacity-100')
          }
        />

        <nav
          aria-label="Primary"
          className="mx-auto flex max-w-page items-center justify-between gap-6 px-5 sm:px-8"
        >
          {/* Wordmark. Set in the display serif at a readable size instead of
              the old 10px letterspaced caps, which read as a legal disclaimer
              rather than a name. */}
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group flex items-baseline gap-2.5"
          >
            <span className="font-display text-[1.375rem] leading-none tracking-[-0.01em] text-bone">
              {CLINIC.name}
            </span>
            <span className="hidden text-[0.6875rem] leading-none text-bone-mute sm:inline">
              {CLINIC.neighbourhood}
            </span>
          </a>

          <div className="hidden items-center gap-1 lg:flex">
            {LINKS.map((l) => (
              <a
                key={l.id}
                href={'#' + l.id}
                onClick={(e) => go(e, l.id)}
                aria-current={active === l.id ? 'true' : undefined}
                className={
                  'relative px-3.5 py-2 text-[0.9375rem] transition-colors duration-200 ' +
                  (active === l.id ? 'text-bone' : 'text-bone-dim hover:text-bone')
                }
              >
                {l.label}
                <span
                  className={
                    'absolute inset-x-3.5 bottom-1 h-px origin-left bg-mint transition-transform duration-300 ease-ease ' +
                    (active === l.id ? 'scale-x-100' : 'scale-x-0')
                  }
                />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={CLINIC.phoneHref}
              className="hidden text-[0.9375rem] text-bone-dim transition-colors hover:text-bone md:inline"
            >
              {CLINIC.phone}
            </a>
            <BookButton className="btn btn-primary hidden sm:inline-flex">
              Book a consultation
            </BookButton>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="grid h-12 w-12 place-items-center text-bone lg:hidden"
            >
              <span className="relative block h-3 w-6">
                <span
                  className={
                    'absolute left-0 block h-px w-6 bg-current transition-transform duration-300 ease-ease ' +
                    (open ? 'top-1.5 rotate-45' : 'top-0')
                  }
                />
                <span
                  className={
                    'absolute left-0 block h-px w-6 bg-current transition-transform duration-300 ease-ease ' +
                    (open ? 'top-1.5 -rotate-45' : 'top-3')
                  }
                />
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* Drawer */}
      <div
        id="menu"
        hidden={!open}
        className="fixed inset-0 z-40 bg-ink px-5 pb-10 pt-24 lg:hidden"
      >
        <ul className="divide-y divide-line border-y border-line">
          {LINKS.map((l) => (
            <li key={l.id}>
              <a
                href={'#' + l.id}
                onClick={(e) => go(e, l.id)}
                className="block py-5 font-display text-3xl text-bone"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-8 space-y-3">
          <BookButton className="btn btn-primary w-full" onClick={() => setOpen(false)}>
            Book a consultation
          </BookButton>
          <a href={CLINIC.phoneHref} className="btn btn-ghost w-full">
            Call {CLINIC.phone}
          </a>
        </div>
      </div>
    </>
  );
}
