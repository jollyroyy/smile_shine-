'use client';

import React from 'react';
import { CLINIC } from '@/lib/clinic';
import { BookButton } from '@/components/BookingWidget';

/* Booking, on Cal.com -- but the calendar itself has moved into the widget
   (see BookingWidget.tsx) and opens over whichever part of the page the reader
   is on when they decide.

   What is left here is everything the calendar cannot say: the number to call
   instead, what to bring, what it costs and who holds the data. That is worth
   a section of its own -- these are the objections that stop a booking, and
   burying them inside a modal would mean nobody reads them until they have
   already committed to a time.

   The section keeps id="book", so every `href="#book"` on the page still lands
   somewhere useful before hydration and for anyone without JavaScript: the
   direct link to the calendar below is a plain anchor. */

const PREPARE = [
  'A list of anything that hurts, and when it started.',
  'Any x-rays or reports from another dentist, if you have them.',
  'The name of anything you take regularly, including blood thinners.',
];

export default function Booking() {
  return (
    <section id="book" className="border-t border-line bg-ink px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-page">
        <div className="max-w-prose">
          <p className="u-label">Book</p>
          <h2 className="u-display mt-4 text-balance text-bone">
            Pick a time that suits you.
          </h2>
          <p className="u-lead mt-5">
            Forty minutes. An examination, a scan, and a conversation about what you want to
            change. Nothing is done to your teeth that day unless you ask for it.
          </p>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* The way in to the calendar */}
          <div className="lg:col-span-7">
            <div className="border border-line bg-ink-raise p-8 sm:p-10">
              <p className="font-display text-[1.75rem] leading-tight text-bone sm:text-[2rem]">
                Open the calendar and take a time.
              </p>
              <p className="mt-4 max-w-prose text-[0.9375rem] text-bone-dim">
                Live availability for the next four weeks. It opens here on the page — you will
                not lose your place — and you get an email confirmation the moment it is done.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <BookButton className="btn btn-primary">Book a consultation</BookButton>
                <a href={CLINIC.phoneHref} className="btn btn-ghost">
                  Call {CLINIC.phone}
                </a>
              </div>

              <p className="mt-6 text-[0.8125rem] text-bone-mute">
                Or{' '}
                <a
                  href={CLINIC.cal.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-mint underline underline-offset-4"
                >
                  open the booking page in a new tab
                </a>
                .
              </p>
            </div>

            <div className="mt-10 border-t border-line pt-5">
              <p className="u-label">Rather not book online</p>
              <a
                href={CLINIC.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block font-display text-2xl text-bone transition-colors hover:text-mint"
              >
                Message on WhatsApp
              </a>
            </div>
          </div>

          {/* Everything the calendar cannot say */}
          <div className="lg:col-span-5">
            <div className="border-t border-line pt-5">
              <p className="u-label">Worth bringing</p>
              <ul className="mt-4 space-y-3">
                {PREPARE.map((p) => (
                  <li key={p} className="flex gap-3 text-[0.9375rem] text-bone-dim">
                    <span aria-hidden="true" className="mt-3 h-px w-3 shrink-0 bg-mint" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 border-t border-line pt-5">
              <p className="u-label">Paying</p>
              <p className="mt-3 text-[0.9375rem] text-bone-dim">
                {CLINIC.payment.join(' · ')}
              </p>
              <p className="mt-4 text-[0.8125rem] text-bone-mute">
                The consultation is charged whether or not you go ahead, and it comes off the cost
                of treatment if you do.
              </p>
            </div>

            <p className="mt-10 border-t border-line pt-5 text-[0.8125rem] leading-relaxed text-bone-mute">
              Booking is handled by Cal.com, and what you enter there is held under their terms.
              Clinical records stay with the practice and are handled under India&rsquo;s Digital
              Personal Data Protection Act, 2023.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
