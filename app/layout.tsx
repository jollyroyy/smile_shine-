import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Cormorant_Garamond, Outfit } from 'next/font/google';
import './globals.css';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-serif',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Smile Shine | Haute Dental Aesthetics & Precision Care',
  description:
    'Step into Smile Shine — an haute dental sanctuary in Vadodara blending biometric 3D engineering with bespoke smile artistry. Experience our seamless interactive 3D virtual walkthroughs.',
  keywords: [
    'Smile Shine',
    'Smile Shine Dental Clinic',
    'Luxury Dentistry Vadodara',
    'Cosmetic Dentistry',
    'Porcelain Veneers',
    'Digital Smile Design',
    'Dental Implants',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`scroll-smooth ${plusJakarta.variable} ${cormorant.variable} ${outfit.variable}`}
    >
      <body className="bg-slate-950 text-slate-100 font-sans antialiased selection:bg-cyan-400 selection:text-slate-950">
        {children}
      </body>
    </html>
  );
}
