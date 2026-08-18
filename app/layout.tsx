import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'WE DESIGN SMILES | Luxury Cosmetic & Restorative Dental Studio',
  description:
    'Experience next-generation dental artistry and painless care. Explore our interactive 3D virtual walkthroughs, digital smile designs, custom porcelain veneers, and guided implants.',
  keywords: [
    'Dental Clinic',
    'Cosmetic Dentistry',
    'Porcelain Veneers',
    'Digital Smile Design',
    'Dental Implants',
    'Beverly Hills Dentist',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
