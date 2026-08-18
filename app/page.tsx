import React from 'react';

import Navigation from '@/components/Navigation';
import ScrollSequence, { Beat } from '@/components/ScrollSequence';
import ShadeProgress from '@/components/ShadeProgress';
import Facts from '@/components/Facts';
import Treatments from '@/components/Treatments';
import ShadeMatch from '@/components/ShadeMatch';
import Voices from '@/components/Voices';
import Practice from '@/components/Practice';
import FAQ from '@/components/FAQ';
import Visit from '@/components/Visit';
import Booking from '@/components/Booking';
import Footer from '@/components/Footer';
import StickyBook from '@/components/StickyBook';
import { BookingProvider } from '@/components/BookingWidget';
import { CLINIC } from '@/lib/clinic';

/* The three sequences still run back to back with nothing between them, which
   is the one thing about this page worth protecting. What has changed is that
   each one now says three things across its scroll instead of holding a single
   title for 350vh -- the scrub had no reason to be that long when the caption
   never moved.

   Each sequence is also a heading level and real text in the served HTML. The
   previous version loaded all three through `dynamic(..., { ssr: false })`, so
   a crawler arriving at a dental practice's home page found three empty divs
   and a spinner. Nothing here touches the browser outside an effect, so there
   is no reason not to render it. */

const ARRIVAL: Beat[] = [
  {
    title: 'Good dental work is the kind nobody notices.',
    note: 'Veneers, implants and aligners on RC Dutt Road, Alkapuri.',
  },
  {
    title: 'Three rooms. One appointment at a time.',
    note: 'Which is why nobody here is working against a clock.',
  },
  {
    title: 'Come and look before you commit to anything.',
    note: 'The consultation runs forty minutes. Nothing is done that day unless you ask for it.',
  },
];

const WORK: Beat[] = [
  {
    title: 'Every one of these was matched by hand.',
    note: 'The shade is chosen at the chair, against the teeth beside it, rather than picked off a screen.',
  },
  {
    title: 'You should not be able to tell which ones we did.',
    note: 'That is the whole brief.',
  },
  {
    title: 'You see yours before anything is permanent.',
    note: 'We design it, you look at it, and we keep changing it until it is right.',
  },
];

/* Sequence order follows what is actually on screen, which an earlier pass got
   wrong: the results copy was running over footage of the waiting room while
   the film of the dentist working played under copy about pricing. video_1
   opens on treatment and ends on the wall of before-and-afters, so it carries
   WORK. video_2 is arrival, corridor and front desk, so it carries the visit. */
const CHAIR: Beat[] = [
  {
    title: 'The part people dread takes about forty minutes.',
    note: 'We check the anaesthetic has taken before we start. Every time.',
  },
  {
    title: 'You will know the number before you sit down.',
    note: 'A written quote after the consultation, and it does not move without your say-so.',
  },
  {
    title: 'Then you decide how much of it to do.',
    note: 'Some of it can wait. We will tell you which.',
  },
];

/* Local search is most of how a practice gets found, and none of it was here.
   Every value comes from the same config block as the visible page, so the two
   cannot drift apart. */
const schema = {
  '@context': 'https://schema.org',
  '@type': 'Dentist',
  name: CLINIC.name,
  description:
    'Dental practice in Alkapuri, Vadodara. Veneers, implants, clear aligners, whitening, root canals and routine care.',
  telephone: CLINIC.phone,
  email: CLINIC.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: CLINIC.address.line1 + ', ' + CLINIC.address.line2,
    addressLocality: CLINIC.city,
    addressRegion: 'Gujarat',
    postalCode: '390007',
    addressCountry: 'IN',
  },
  areaServed: CLINIC.city,
  availableLanguage: ['English', 'Hindi', 'Gujarati'],
  openingHours: ['Mo-Fr 09:00-18:00', 'Sa 10:00-16:00'],
};

export default function HomePage() {
  return (
    <BookingProvider>
      <div id="top">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />

        <Navigation />
        <ShadeProgress />

        <main>
          {/* Three sequences, contiguous. */}
          <ScrollSequence
            id="tour"
            framePath="/videos/video_3_frames/frame_"
            beats={ARRIVAL}
            label="Arriving at the practice"
            lead
            as="h1"
          />
          <ScrollSequence
            id="results"
            framePath="/videos/video_1_frames/frame_"
            beats={WORK}
            label="Work the practice has done"
          />
          {/* Stops at 285. The generator burned an end card over the last fifteen
              frames of this clip -- a script wordmark reading "Lisa / CHIIFE
              KNUSTAR", which is the model's attempt at signage and not a word in
              any language. It fades in at frame 286, so the sequence simply ends
              before it. Dropping 5% of the run is not perceptible in the scrub and
              leaves no retouching to notice. The other two clips are clean to 300. */}
          <ScrollSequence
            id="visiting"
            framePath="/videos/video_2_frames/frame_"
            totalFrames={285}
            beats={CHAIR}
            label="What a visit is like"
          />

          <Facts />
          <Treatments />
          <ShadeMatch />
          <Voices />
          <Practice />
          <FAQ />
          <Visit />
          <Booking />
        </main>

        <Footer />
        <StickyBook />
      </div>
    </BookingProvider>
  );
}
