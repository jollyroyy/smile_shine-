import { CLINIC } from '@/lib/clinic';

/* A definition-list of contact facts beside the map, not six identical boxed
   cards with an icon apiece. The map is the one place a bit of visual weight
   earns its keep, so it takes the wider column and the full height. */

export default function Visit() {
  return (
    <section id="visit" className="border-t border-line bg-ink px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-page">
        <div className="max-w-prose">
          <p className="u-label">Visit</p>
          <h2 className="u-display mt-4 text-balance text-bone">
            Third floor, above the arcade.
          </h2>
          <p className="u-lead mt-5">
            Two minutes from Alkapuri circle. Parking is in the basement and the lift goes
            straight to us.
          </p>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <div className="border-t border-line pt-5">
              <p className="u-label">Address</p>
              <p className="mt-2 text-[0.9375rem] text-bone">
                <span className="block">{CLINIC.address.line1}</span>
                <span className="block">{CLINIC.address.line2}</span>
                <span className="block">{CLINIC.address.city}</span>
              </p>
            </div>

            <div className="mt-6 border-t border-line pt-5">
              <p className="u-label">Phone</p>
              <a
                href={CLINIC.phoneHref}
                className="mt-2 block text-[1.0625rem] text-bone transition-colors duration-300 ease-ease hover:text-mint"
              >
                {CLINIC.phone}
              </a>
              <a
                href={CLINIC.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1.5 block text-[0.875rem] text-mint"
              >
                Message on WhatsApp
              </a>
            </div>

            <div className="mt-6 border-t border-line pt-5">
              <p className="u-label">Email</p>
              <a
                href={'mailto:' + CLINIC.email}
                className="mt-2 block text-[0.9375rem] text-bone transition-colors duration-300 ease-ease hover:text-mint"
              >
                {CLINIC.email}
              </a>
            </div>

            <div className="mt-6 border-t border-line pt-5">
              <p className="u-label">Hours</p>
              <div className="mt-2 space-y-1.5">
                {CLINIC.hours.map((h) => (
                  <div key={h.days} className="flex items-baseline justify-between gap-6 text-[0.9375rem]">
                    <span className="text-bone-dim">{h.days}</span>
                    <span className="u-figure text-bone">{h.time}</span>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-[0.8125rem] text-bone-mute">{CLINIC.emergencyNote}</p>
            </div>

            <div className="mt-6 border-t border-line pt-5">
              <p className="u-label">Payment</p>
              <p className="mt-2 text-[0.9375rem] text-bone-dim">{CLINIC.payment.join(' · ')}</p>
            </div>

            <div className="mt-6 border-t border-line pt-5">
              <p className="u-label">Languages</p>
              <p className="mt-2 text-[0.9375rem] text-bone-dim">{CLINIC.languages.join(' · ')}</p>
            </div>

            <a
              href={CLINIC.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary mt-10 w-full sm:w-auto"
            >
              Get directions
            </a>
          </div>

          <div className="lg:col-span-7">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm border border-line lg:aspect-auto lg:h-full lg:min-h-[520px]">
              {/* Google's embed renders bright white by default, which would make
                  the map the brightest object on an otherwise near-black page.
                  This filter combination inverts and desaturates it toward the
                  same dark neutral the rest of the site sits on. */}
              <iframe
                src={CLINIC.mapEmbedUrl}
                title="Map showing Smile Shine on RC Dutt Road, Alkapuri"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full border-0"
                style={{ filter: 'grayscale(0.35) invert(0.92) hue-rotate(180deg) contrast(0.9) brightness(0.95)' }}
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
