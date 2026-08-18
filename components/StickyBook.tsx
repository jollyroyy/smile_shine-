'use client';

import { useEffect, useRef, useState } from 'react';
import { CLINIC } from '@/lib/clinic';
import { BookButton } from '@/components/BookingWidget';

/* Mobile-only booking bar. The header already carries a persistent Book
   button on desktop (see Navigation.tsx), so this only renders below sm.
   Hidden until the reader has scrolled past the first viewport, then it
   slides up from the bottom -- unless the reader has asked for reduced
   motion, in which case it simply appears rather than translating in. */
export default function StickyBook() {
  const [visible, setVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(media.matches);

    const read = () => {
      rafRef.current = null;
      setVisible(window.scrollY > window.innerHeight);
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

  return (
    <div
      aria-hidden={!visible}
      className={
        'fixed inset-x-0 bottom-0 z-40 border-t border-line bg-ink/95 px-4 py-3 backdrop-blur-xl sm:hidden ' +
        'pb-[env(safe-area-inset-bottom)] ' +
        (reducedMotion
          ? visible
            ? 'opacity-100'
            : 'pointer-events-none opacity-0'
          : 'transition-transform duration-300 ease-ease ' +
            (visible ? 'translate-y-0' : 'pointer-events-none translate-y-full'))
      }
    >
      <div className="flex gap-3">
        <a
          href={CLINIC.phoneHref}
          className="btn btn-ghost shrink-0 px-5"
          aria-label={'Call ' + CLINIC.phone}
        >
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 5c0-.55.45-1 1-1h3.09a1 1 0 0 1 .98.79l.7 3.2a1 1 0 0 1-.27.95l-1.7 1.7a13 13 0 0 0 5.56 5.56l1.7-1.7a1 1 0 0 1 .95-.27l3.2.7a1 1 0 0 1 .79.98V19c0 .55-.45 1-1 1h-1C9.16 20 4 14.84 4 8.5V5Z"
            />
          </svg>
        </a>
        <BookButton className="btn btn-primary flex-1">
          Book a consultation
        </BookButton>
      </div>
    </div>
  );
}
