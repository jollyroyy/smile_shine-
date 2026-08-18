import { CLINIC } from '@/lib/clinic';
import { TREATMENTS } from '@/lib/treatments';

export default function Footer() {
  return (
    <footer className="border-t border-line bg-ink px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-page">
        <div className="grid gap-12 sm:grid-cols-12">
          {/* Practice */}
          <div className="sm:col-span-5">
            <span className="font-display text-3xl text-bone">{CLINIC.name}</span>
            <p className="mt-4 max-w-[38ch] text-[0.9375rem] text-bone-dim">
              A dental practice on RC Dutt Road. Veneers, implants and aligners, planned in 3D and
              matched by hand.
            </p>
            <div className="mt-6 text-[0.875rem] text-bone-mute">
              <p>{CLINIC.address.line1}</p>
              <p>{CLINIC.address.line2}</p>
              <p>{CLINIC.address.city}</p>
            </div>
          </div>

          {/* Treatments */}
          <div className="sm:col-span-3">
            <span className="u-label">Treatments</span>
            <ul className="mt-5 space-y-2.5">
              {TREATMENTS.slice(0, 5).map((t) => (
                <li key={t.id}>
                  <a
                    href="#treatments"
                    className="text-[0.9375rem] text-bone-dim transition-colors hover:text-bone"
                  >
                    {t.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="sm:col-span-4">
            <span className="u-label">Get in touch</span>
            <a
              href={CLINIC.phoneHref}
              className="mt-4 block font-display text-2xl text-bone transition-colors hover:text-mint"
            >
              {CLINIC.phone}
            </a>
            <a
              href={'mailto:' + CLINIC.email}
              className="mt-3 block text-[0.9375rem] text-bone-dim transition-colors hover:text-bone"
            >
              {CLINIC.email}
            </a>
            <a
              href={CLINIC.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 block text-[0.9375rem] text-mint"
            >
              WhatsApp
            </a>
            <div className="mt-6">
              {CLINIC.hours.map((h) => (
                <div
                  key={h.days}
                  className="flex items-baseline justify-between gap-6 text-[0.875rem]"
                >
                  <span className="text-bone-mute">{h.days}</span>
                  <span className="text-bone-dim">{h.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-line pt-8 text-[0.8125rem] text-bone-mute sm:flex-row sm:items-center">
          <span>
            © {new Date().getFullYear()} {CLINIC.name}. Vadodara, Gujarat.
          </span>
          {/*
            These three are plain text, not links -- no privacy policy, terms
            or DPDP notice page exists yet. They must become real <a> links
            before launch. The statute that applies to an Indian dental
            practice's patient records is the Digital Personal Data
            Protection Act, 2023 (DPDP) -- not HIPAA, which is US law and
            has no bearing here.
          */}
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li><span>Privacy</span></li>
            <li><span>Terms</span></li>
            <li><span>Patient data (DPDP Act, 2023)</span></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
