import { CLINIC } from '@/lib/clinic';

export default function Facts() {
  return (
    <section className="border-t border-line bg-ink px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-page">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 sm:gap-y-0">
          {CLINIC.facts.map((fact, index) => (
            <div
              key={fact.label}
              className={index === 0 ? '' : 'sm:border-l sm:border-line sm:pl-6'}
            >
              <div className="flex items-baseline gap-2">
                <span className="u-figure text-4xl text-bone sm:text-5xl">{fact.value}</span>
                <span className="text-[0.875rem] text-bone-mute">{fact.unit}</span>
              </div>
              <p className="mt-2 text-[0.875rem] text-bone-dim">{fact.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
