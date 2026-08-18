'use client';

import React, { useState } from 'react';
import { TREATMENTS } from '@/lib/treatments';
import { BookButton } from '@/components/BookingWidget';

/* An index, not a card grid.

   The first draft gave each treatment an identical glass card with an icon, a
   badge, a description and a three-item tick list -- the same shape six times,
   which is a lot of surface area spent making six different things look the
   same. A list sets the names in the display face at a size worth reading,
   shows the price and the number of visits without being asked, and keeps the
   rest folded away until someone wants it.

   Opened rather than hovered, so it works the same on a phone. One row is open
   at a time, which keeps the section short enough to scan.

   No 01/02/03 numbering: these are six independent choices, not a sequence, and
   numbering them would assert an order the content does not have. */

export default function Treatments() {
  const [open, setOpen] = useState<string | null>(TREATMENTS[0].id);

  return (
    <section id="treatments" className="border-t border-line bg-ink px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-page">
        <div className="max-w-prose">
          <p className="u-label">Treatments</p>
          <h2 className="u-display mt-4 text-balance text-bone">
            What it costs, and how long it takes.
          </h2>
          <p className="u-lead mt-5">
            Prices below are where each treatment starts. You will get a written quote for your own
            mouth at the consultation, before anything begins.
          </p>
        </div>

        <ul className="mt-14 border-t border-line">
          {TREATMENTS.map((t) => {
            const isOpen = open === t.id;
            return (
              <li key={t.id} className="border-b border-line">
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : t.id)}
                    aria-expanded={isOpen}
                    aria-controls={'panel-' + t.id}
                    className="group flex w-full items-baseline gap-6 py-7 text-left sm:gap-10"
                  >
                    <span className="min-w-0 flex-1">
                      <span
                        className={
                          'u-title block transition-colors duration-300 ' +
                          (isOpen ? 'text-bone' : 'text-bone group-hover:text-mint')
                        }
                      >
                        {t.name}
                      </span>
                      <span className="mt-1.5 block text-[0.9375rem] text-bone-dim">{t.blurb}</span>
                    </span>

                    {t.from && (
                      <span className="hidden shrink-0 text-right sm:block">
                        <span className="u-label block">From</span>
                        <span className="u-figure mt-1 block text-lg text-bone">{t.from}</span>
                      </span>
                    )}

                    <span
                      aria-hidden="true"
                      className={
                        'relative mt-2 block h-3 w-3 shrink-0 transition-transform duration-300 ease-ease ' +
                        (isOpen ? 'rotate-45' : '')
                      }
                    >
                      <span className="absolute left-0 top-1/2 h-px w-3 bg-bone-mute" />
                      <span
                        className={
                          'absolute left-1/2 top-0 h-3 w-px bg-bone-mute transition-opacity duration-300 ' +
                          (isOpen ? 'opacity-100' : 'opacity-100')
                        }
                      />
                    </span>
                  </button>
                </h3>

                <div
                  id={'panel-' + t.id}
                  hidden={!isOpen}
                  className="grid gap-8 pb-10 sm:grid-cols-12 sm:gap-10"
                >
                  <p className="text-[0.9375rem] leading-relaxed text-bone-dim sm:col-span-6">
                    {t.detail}
                  </p>

                  <ul className="space-y-2.5 sm:col-span-3">
                    {t.points.map((p) => (
                      <li key={p} className="flex gap-3 text-[0.875rem] text-bone-dim">
                        <span aria-hidden="true" className="mt-2.5 h-px w-3 shrink-0 bg-mint" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="space-y-5 sm:col-span-3">
                    <div>
                      <p className="u-label">Time</p>
                      <p className="mt-1.5 text-[0.875rem] text-bone">{t.visits}</p>
                    </div>
                    {t.from && (
                      <div className="sm:hidden">
                        <p className="u-label">From</p>
                        <p className="u-figure mt-1 text-lg text-bone">{t.from}</p>
                      </div>
                    )}
                    <BookButton className="inline-flex items-baseline gap-2 text-[0.9375rem] text-mint transition-opacity hover:opacity-70">
                      Book about this
                      <span aria-hidden="true">&rarr;</span>
                    </BookButton>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
