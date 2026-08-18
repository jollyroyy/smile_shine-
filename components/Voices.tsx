/* PLACEHOLDER TESTIMONIALS. These three quotes are written, not collected. Each
   one answers a real objection -- embarrassment, upselling, price creep -- which
   is what makes them useful, and exactly why they must be replaced with real
   ones before launch. Publishing invented patient testimonials for a medical
   practice is not a small thing. */

import { CLINIC } from '@/lib/clinic';
import { BookButton } from '@/components/BookingWidget';

const QUOTES = [
  {
    quote: 'I had put this off for about four years. Nobody made a thing of it.',
    attribution: 'R. Mehta · Alkapuri',
  },
  {
    quote:
      'They talked me out of veneers and did two fillings instead. It cost a fifth of what I had budgeted.',
    attribution: 'S. Desai · Fatehgunj',
  },
  {
    quote: 'The number they quoted at the start was the number I paid at the end.',
    attribution: 'A. Shah · Gotri',
  },
];

export default function Voices() {
  return (
    <section id="voices" className="border-t border-line bg-ink px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-page">
        <div className="max-w-prose">
          <p className="u-label">Patients</p>
          <h2 className="u-display mt-4 text-balance text-bone">What people actually say.</h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-3">
          {QUOTES.map((q) => (
            <figure key={q.attribution} className="border-t border-line pt-6">
              <blockquote className="u-title text-bone">{q.quote}</blockquote>
              <figcaption className="mt-5 text-[0.875rem] text-bone-mute">{q.attribution}</figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-16 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 border-t border-line pt-8">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="u-figure text-2xl text-bone">{CLINIC.reviews.rating}</span>
            <span className="text-[0.875rem] text-bone-dim">out of 5 on {CLINIC.reviews.source}</span>
            <span className="text-[0.875rem] text-bone-mute">from {CLINIC.reviews.count} reviews</span>
          </div>

          <BookButton className="text-[0.9375rem] text-mint transition-opacity hover:opacity-70">
            Book a consultation <span aria-hidden="true">&rarr;</span>
          </BookButton>
        </div>
      </div>
    </section>
  );
}
