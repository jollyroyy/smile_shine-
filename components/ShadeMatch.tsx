'use client';

import React, { useCallback, useRef, useState } from 'react';
import { SHADES } from '@/lib/shades';
import { BookButton } from '@/components/BookingWidget';

/* Pick your shade.

   The most useful thing a whitening page can do is answer the question the
   reader actually has, which is not "how many watts is the laser" but "what
   would I look like". This is the guide the dentist would hold up at the
   chair, made draggable. Choose where you are now; it shows where a course of
   whitening usually lands, in the practice's own units.

   It states a typical range and says so. It does not promise an outcome, and
   the shift is a single constant here so the practice can set it to whatever
   it can actually stand behind.

   Built as a real slider: role, value semantics, arrow keys, Home and End.
   Pointer capture means a drag that leaves the strip keeps tracking instead of
   dropping the tab halfway. */

const TYPICAL_SHIFT = 5; // tabs. Confirm against the practice's own results.

export default function ShadeMatch() {
  const [i, setI] = useState(4); // A3.5, the commonest starting tab
  const [dragging, setDragging] = useState(false);
  const stripRef = useRef<HTMLDivElement | null>(null);

  const target = Math.min(i + TYPICAL_SHIFT, SHADES.length - 1);
  const moved = target - i;

  const fromPointer = useCallback((clientX: number) => {
    const el = stripRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const t = Math.min(Math.max((clientX - r.left) / r.width, 0), 1);
    setI(Math.round(t * (SHADES.length - 1)));
  }, []);

  const onKey = (e: React.KeyboardEvent) => {
    const step: Record<string, number> = { ArrowLeft: -1, ArrowDown: -1, ArrowRight: 1, ArrowUp: 1 };
    if (e.key in step) {
      e.preventDefault();
      setI((v) => Math.min(Math.max(v + step[e.key], 0), SHADES.length - 1));
    } else if (e.key === 'Home') {
      e.preventDefault();
      setI(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setI(SHADES.length - 1);
    }
  };

  return (
    <section id="shade" className="border-t border-line bg-ink px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto grid max-w-page gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <p className="u-label">Whitening</p>
          <h2 className="u-display mt-4 text-balance text-bone">
            Find the tab you&rsquo;re on now.
          </h2>
          <p className="u-lead mt-5 max-w-prose">
            This is the guide we hold against your teeth to choose the colour of a crown or a
            veneer. Drag along it to the tab that looks closest to yours.
          </p>
          <p className="mt-4 max-w-prose text-[0.9375rem] text-bone-mute">
            A course of whitening usually moves {TYPICAL_SHIFT} tabs. How far yours goes depends on
            what stained them, and we will tell you honestly at the consultation if the answer is
            &ldquo;not far&rdquo;.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <BookButton className="btn btn-primary">
              Book a whitening consultation
            </BookButton>
          </div>
        </div>

        <div className="lg:col-span-7">
          {/* The guide.

              Every tab stays at full strength. An earlier pass dimmed the ones
              either side of the selection to 40%, which turned the thing into a
              bar chart with a highlighted column -- but a shade guide only works
              if you can see the whole run and judge yours against it. So the
              tabs are constant and the selection is marked instead: a bone rule
              above the tab you are on, a mint one above where whitening usually
              reaches, and the span between them drawn underneath. */}
          <div
            ref={stripRef}
            role="slider"
            tabIndex={0}
            aria-label="Your current tooth shade"
            aria-valuemin={0}
            aria-valuemax={SHADES.length - 1}
            aria-valuenow={i}
            aria-valuetext={'Shade ' + SHADES[i].code}
            onKeyDown={onKey}
            onPointerDown={(e) => {
              (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
              setDragging(true);
              fromPointer(e.clientX);
            }}
            onPointerMove={(e) => {
              if (dragging) fromPointer(e.clientX);
            }}
            onPointerUp={() => setDragging(false)}
            onPointerCancel={() => setDragging(false)}
            className={
              'grid touch-none select-none items-end gap-[2px] sm:gap-1 ' +
              (dragging ? 'cursor-grabbing' : 'cursor-grab')
            }
            style={{ gridTemplateColumns: 'repeat(' + SHADES.length + ', minmax(0,1fr))' }}
          >
            {/* markers */}
            {SHADES.map((s, k) => (
              <span key={'m' + s.code} className="flex h-4 items-end justify-center">
                <span
                  className={
                    'block w-px transition-all duration-300 ease-ease ' +
                    (k === i
                      ? 'h-4 bg-bone'
                      : k === target
                        ? 'h-4 bg-mint'
                        : 'h-0 bg-transparent')
                  }
                />
              </span>
            ))}

            {/* tabs */}
            {SHADES.map((s, k) => (
              <span
                key={s.code}
                style={{ backgroundColor: s.hex }}
                className={
                  'block rounded-sm transition-all duration-300 ease-ease ' +
                  (k === i || k === target ? 'h-28 sm:h-36' : 'h-20 sm:h-24')
                }
              />
            ))}

            {/* codes */}
            {SHADES.map((s, k) => (
              <span
                key={'c' + s.code}
                className={
                  'u-figure mt-2 hidden text-center text-[11px] leading-none transition-colors duration-300 sm:block ' +
                  (k === i ? 'text-bone' : k === target ? 'text-mint' : 'text-bone-mute')
                }
              >
                {s.code}
              </span>
            ))}
          </div>

          {/* Read-out */}
          <div className="mt-5 flex flex-wrap items-start justify-between gap-x-6 gap-y-4 border-t border-line pt-5">
            <div>
              <p className="u-label">Now</p>
              <p className="u-figure mt-1.5 text-3xl text-bone">{SHADES[i].code}</p>
            </div>

            <div className="order-3 w-full pt-2 sm:order-none sm:w-auto sm:flex-1 sm:pt-6">
              <div className="relative h-px bg-line">
                <div
                  className="absolute inset-y-0 left-0 bg-mint transition-[width] duration-300 ease-ease"
                  style={{ width: (moved / TYPICAL_SHIFT) * 100 + '%' }}
                />
              </div>
              <p className="mt-2 text-center text-[0.8125rem] text-bone-mute">
                {moved === 0
                  ? 'Already at the brightest tab on the guide'
                  : moved + (moved === 1 ? ' tab' : ' tabs') + ' brighter'}
              </p>
            </div>

            <div className="text-right">
              <p className="u-label">Typically</p>
              <p className="u-figure mt-1.5 text-3xl text-mint">{SHADES[target].code}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
