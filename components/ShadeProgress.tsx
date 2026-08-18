'use client';

import React, { useEffect, useRef } from 'react';
import { SHADES } from '@/lib/shades';

/* The page's scroll indicator, built as a shade guide.

   A progress bar is the obvious device and says nothing about who this is for.
   The shade guide is the object this practice already uses to measure exactly
   one thing -- how bright a tooth is -- so borrowing it costs nothing and lands
   somewhere no template goes. It fills top to bottom as the reader descends,
   warm tabs first, and the code beside it is the tab currently lit.

   Every write here is straight to the node. This element updates on every
   scroll frame for the entire length of the page, so it must never be allowed
   to render React. */

export default function ShadeProgress() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const chipRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const codeRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    let raf: number | null = null;

    const paint = () => {
      raf = null;
      const doc = document.documentElement;
      const span = doc.scrollHeight - window.innerHeight;
      const p = span > 0 ? Math.min(Math.max(window.scrollY / span, 0), 1) : 0;
      const lit = Math.round(p * SHADES.length);

      for (let i = 0; i < SHADES.length; i++) {
        const chip = chipRefs.current[i];
        if (!chip) continue;
        const on = i < lit;
        chip.style.backgroundColor = on ? SHADES[i].hex : 'transparent';
        chip.style.opacity = on ? '1' : '0.22';
      }

      if (codeRef.current) {
        codeRef.current.textContent = SHADES[Math.min(Math.max(lit - 1, 0), SHADES.length - 1)].code;
        codeRef.current.style.opacity = lit > 0 ? '1' : '0';
      }
      /* Fades out at the very top so it does not compete with the opening frame. */
      if (rootRef.current) rootRef.current.style.opacity = p > 0.02 ? '1' : '0';
    };

    const onScroll = () => {
      if (raf === null) raf = requestAnimationFrame(paint);
    };

    if (mq.matches) {
      /* Still useful as a position readout; it just stops animating. */
      paint();
      return;
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    paint();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      style={{ opacity: 0 }}
      className="pointer-events-none fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-[3px] transition-opacity duration-500 lg:flex"
    >
      {SHADES.map((s, i) => (
        <span
          key={s.code}
          ref={(el) => {
            chipRefs.current[i] = el;
          }}
          className="block h-3 w-[7px] rounded-sm border border-line transition-[background-color,opacity] duration-300"
        />
      ))}
      <span
        ref={codeRef}
        className="u-figure mt-2 text-[10px] leading-none text-bone-mute transition-opacity duration-300"
        style={{ opacity: 0 }}
      />
    </div>
  );
}
