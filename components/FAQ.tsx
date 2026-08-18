'use client';

import { useState } from 'react';

const FAQS = [
  {
    id: 'hurt',
    question: 'Will it hurt?',
    answer:
      'Not during. We check the anaesthetic has taken before we start, every time, and we would rather wait five minutes than have you find out the hard way. Afterwards most people take a paracetamol and go to work.',
  },
  {
    id: 'cost',
    question: 'What will it cost?',
    answer:
      'You get a written quote after the consultation and before any treatment begins. It does not move unless we find something we could not see on the scan, and if that happens we stop and ask you first.',
  },
  {
    id: 'time',
    question: 'How long will I be there?',
    answer:
      'The consultation runs about forty minutes: an examination, a scan, and a conversation. Nothing is done to your teeth that day unless you want it to be.',
  },
  {
    id: 'years',
    question: 'I have not been to a dentist in years.',
    answer:
      'Then you are most of the people who walk in. There is no lecture. We work out what is urgent, what can wait, and what order to do it in, and you decide how much of it to start.',
  },
  {
    id: 'pay',
    question: 'How can I pay?',
    answer:
      'UPI, card or cash. Treatments over twenty-five thousand rupees can be split into instalments, arranged before you begin so you know the monthly figure in advance.',
  },
  {
    id: 'languages',
    question: 'Which languages do you speak?',
    answer: 'English, Hindi and Gujarati, at the chair and on the phone.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<string | null>(FAQS[0].id);

  return (
    <section id="questions" className="border-t border-line bg-ink px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-page">
        <div className="max-w-prose">
          <p className="u-label">Before you book</p>
          <h2 className="u-display mt-4 text-balance text-bone">
            The questions everybody asks.
          </h2>
        </div>

        <ul className="mt-14 border-t border-line">
          {FAQS.map((f) => {
            const isOpen = open === f.id;
            return (
              <li key={f.id} className="border-b border-line">
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : f.id)}
                    aria-expanded={isOpen}
                    aria-controls={'panel-' + f.id}
                    className="group flex w-full items-baseline justify-between gap-6 py-6 text-left"
                  >
                    <span className="u-title text-bone transition-colors duration-300 group-hover:text-mint">
                      {f.question}
                    </span>

                    <span
                      aria-hidden="true"
                      className={
                        'relative mt-2 block h-3 w-3 shrink-0 transition-transform duration-300 ease-ease ' +
                        (isOpen ? 'rotate-45' : '')
                      }
                    >
                      <span className="absolute left-0 top-1/2 h-px w-3 bg-bone-mute" />
                      <span className="absolute left-1/2 top-0 h-3 w-px bg-bone-mute" />
                    </span>
                  </button>
                </h3>

                <div id={'panel-' + f.id} hidden={!isOpen} className="pb-8">
                  <p className="max-w-prose text-[0.9375rem] leading-relaxed text-bone-dim">
                    {f.answer}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
