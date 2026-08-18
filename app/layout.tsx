import type { Metadata } from 'next';
import { Instrument_Serif, Hanken_Grotesk } from 'next/font/google';
import { CLINIC } from '@/lib/clinic';
import './globals.css';

/* Two families, not three.
   Instrument Serif carries every display line: a modern high-contrast serif
   whose hairlines run into glossy thick stems, which is the same modulation
   enamel has under a light. It only ships one weight, which is the point --
   size and case do the work that a weight axis would otherwise be asked to do.
   Hanken Grotesk sets everything a patient actually has to read. It is a warm
   humanist grotesque that holds up at 14-16px, where the old stack was setting
   10px tracked type and losing legibility to decoration. */

const display = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

const text = Hanken_Grotesk({
  subsets: ['latin'],
  variable: '--font-text',
  display: 'swap',
});

export const metadata: Metadata = {
  title: `${CLINIC.name} — Dentist in ${CLINIC.neighbourhood}, ${CLINIC.city}`,
  description:
    'Veneers, implants and aligners, planned in 3D and matched by hand. Scan, plan and quote in a single visit, so you know the number before anything begins.',
  keywords: [
    'dentist Vadodara',
    'dental clinic Alkapuri',
    'veneers Vadodara',
    'dental implants Vadodara',
    'clear aligners Vadodara',
    'teeth whitening Vadodara',
  ],
  openGraph: {
    title: `${CLINIC.name} — Dentist in ${CLINIC.neighbourhood}, ${CLINIC.city}`,
    description:
      'Veneers, implants and aligners, planned in 3D and matched by hand. One visit to scan, plan and quote.',
    type: 'website',
    locale: 'en_IN',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${display.variable} ${text.variable}`}>
      <body>{children}</body>
    </html>
  );
}
