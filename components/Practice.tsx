import { CLINIC } from '@/lib/clinic';

const PRINCIPLES = [
  'We tell you the price before we start.',
  'We say when something can wait.',
  'We will not sell you whitening when what you need is a filling.',
  'You can bring someone into the room, not just the waiting area.',
];

export default function Practice() {
  return (
    <section id="practice" className="border-t border-line bg-ink px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-page">
        <div className="max-w-prose">
          <p className="u-label">The practice</p>
          <h2 className="u-display mt-4 text-balance text-bone">
            Three dentists, three rooms, one appointment at a time.
          </h2>
          <p className="u-lead mt-5">
            We do not run six chairs at once. It costs us patients, and it is the reason
            nobody here is rushing you.
          </p>
          <p className="mt-5 max-w-prose text-[0.9375rem] text-bone-dim">
            Smile Shine has been on RC Dutt Road for twelve years. Ceramics are matched
            and finished on site, so the shade is chosen against your own teeth in the
            same room, rather than posted to a lab and guessed at.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2">
          {PRINCIPLES.map((line) => (
            <div key={line} className="border-t border-line pt-6">
              <span className="block h-px w-6 bg-mint" />
              <p className="mt-4 text-[1.0625rem] text-bone">{line}</p>
            </div>
          ))}
        </div>

        <div className="mt-24">
          <p className="u-label">Who you will see</p>
          <div className="mt-8 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {CLINIC.team.map((member) => (
              <div key={member.initials}>
                <p className="u-figure text-2xl text-bone-mute">{member.initials}</p>
                <div className="mt-4 border-t border-line pt-6">
                  <h3 className="u-title text-bone">{member.name}</h3>
                  <p className="mt-2 text-[0.8125rem] text-bone-mute">{member.qualification}</p>
                  <p className="mt-3 text-[0.9375rem] text-mint">{member.role}</p>
                  <p className="mt-3 text-[0.875rem] leading-relaxed text-bone-dim">{member.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
