/**
 * What the practice does, named the way patients name it.
 *
 * The first draft called these "Photonic Laser Enamel Whitening", "Diamond+
 * Clear Aligners" and "Guided Titanium & Zirconia Implants". Nobody searches
 * for those, nobody asks for them at reception, and a page that talks that way
 * reads as a brochure rather than a practice. These are the words on the
 * consent form.
 *
 * PRICES ARE PLACEHOLDERS. Every `from` figure below is invented. Publishing an
 * indicative price is the single strongest thing this page can do for booking
 * rates -- cost is the objection that stops people calling -- but only if the
 * number is one the practice will honour. Replace all six, or set `from` to
 * undefined and the row will simply not show a price.
 */

export interface Treatment {
  id: string;
  name: string;
  blurb: string;
  detail: string;
  points: string[];
  visits: string;
  from?: string;
}

export const TREATMENTS: Treatment[] = [
  {
    id: 'checkups',
    name: 'Check-ups & cleaning',
    blurb: 'Every six months. The cheapest dentistry there is.',
    detail:
      'An examination, a scale and polish, and x-rays if it has been a while. Most of what we treat later would have cost a fraction caught here.',
    points: ['Examination and x-rays', 'Scale and polish', 'A written note of anything we are watching'],
    visits: 'One visit, about 45 minutes',
    from: '₹1,200',
  },
  {
    id: 'whitening',
    name: 'Whitening',
    blurb: 'Bleaching the enamel you already have. Nothing is drilled.',
    detail:
      'A protective barrier over the gums, then gel and light. Sensitivity for a day or two is normal and settles. We will say so in advance if your staining is the kind that will not lift.',
    points: ['In-chair session', 'Custom trays to take home', 'Shade recorded before and after'],
    visits: 'One visit, about 90 minutes',
    from: '₹12,000',
  },
  {
    id: 'veneers',
    name: 'Veneers',
    blurb: 'Thin ceramic shells bonded to the front of the teeth that show.',
    detail:
      'We scan, design the shape on screen, and you see it in your own mouth as a trial before anything permanent happens. The shade is matched at the chair against the teeth beside it, not chosen from a photograph.',
    points: ['3D scan and on-screen design', 'A trial you can look at and change', 'Shade matched at the chair'],
    visits: 'Two to three visits over three weeks',
    from: '₹18,000 per tooth',
  },
  {
    id: 'implants',
    name: 'Implants',
    blurb: 'A titanium root and a crown, to replace a tooth that has gone.',
    detail:
      'A CBCT scan decides the position before the day, and a printed guide holds it there during. The root needs a few months to fuse; you are not without a tooth in the meantime.',
    points: ['CBCT scan and printed surgical guide', 'A temporary tooth throughout', 'Final crown once it has fused'],
    visits: 'Three visits across three to six months',
    from: '₹35,000',
  },
  {
    id: 'aligners',
    name: 'Clear aligners',
    blurb: 'Removable trays that move teeth a little at a time.',
    detail:
      'You wear them 20 to 22 hours a day and change them on a schedule. They are hard to spot at conversational distance. If your case is one that braces would do better and faster, we will tell you that instead.',
    points: ['Scan and a plan you can see end to end', 'Trays changed weekly or fortnightly', 'A retainer afterwards, which is not optional'],
    visits: 'Reviews every six to eight weeks',
    from: '₹1,50,000',
  },
  {
    id: 'root-canal',
    name: 'Root canals & crowns',
    blurb: 'Saving a tooth that hurts, rather than taking it out.',
    detail:
      'The nerve is removed, the canal cleaned and sealed, and the tooth capped so it can be chewed on again. Under proper anaesthetic this is not the appointment its reputation suggests.',
    points: ['Usually completed in one sitting', 'Crown fitted after', 'Anaesthetic checked before we start, every time'],
    visits: 'One to two visits',
    from: '₹6,000',
  },
];
