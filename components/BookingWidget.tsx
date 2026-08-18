'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { CLINIC } from '@/lib/clinic';

/* The calendar as a widget, not a destination.

   It used to sit inline at the bottom of the page: a 680px iframe that every
   reader scrolled past whether or not they were ready to book, and that the
   seven "Book a consultation" buttons scattered up the page could only point
   at. Now those buttons open the calendar where the reader already is, so a
   decision made beside the aligner pricing does not cost a trip to the foot of
   the page and back.

   Three things this has to get right, because a booking dialog that gets them
   wrong loses the appointment:

   - The iframe is created on the first open and never destroyed. Closing hides
     the dialog with `visibility`, so a reader who opens it, checks a price and
     opens it again lands on the month they were already looking at instead of
     watching a third-party calendar boot a second time. Nothing is requested
     from Cal.com until somebody actually asks for it.

   - Escape closes, the backdrop closes, focus goes into the dialog on open and
     back to the button that opened it on close, and Tab is held inside while
     it is up. A modal that traps a screen reader outside its own content is
     worse than the inline section it replaced.

   - Origin checking on the message listener is the only thing standing between
     an embedded third party and this page, so both hosts Cal.com posts from
     are listed explicitly and anything else is dropped. */

function embedSrc() {
  const p = new URLSearchParams({
    embed: 'true',
    theme: CLINIC.cal.theme,
    layout: 'month_view',
    brandColor: CLINIC.cal.brandColor,
  });
  return CLINIC.cal.url + '?' + p.toString();
}

type BookingApi = { open: () => void; close: () => void; isOpen: boolean };

const BookingContext = createContext<BookingApi | null>(null);

export function useBooking(): BookingApi {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBooking must be used inside <BookingProvider>');
  return ctx;
}

/* The one button every call site uses.

   It stays an anchor to #book rather than becoming a <button>, so the markup
   still works before hydration and for anyone without JavaScript -- the
   booking section is still down there with a direct link to the calendar.
   Once hydrated, the click opens the dialog instead of jumping. */
export function BookButton({
  children,
  className,
  onClick,
  ...rest
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const { open } = useBooking();
  return (
    <a
      href="#book"
      className={className}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented) return;
        e.preventDefault();
        open();
      }}
      {...rest}
    >
      {children}
    </a>
  );
}

const FOCUSABLE =
  'a[href], button:not([disabled]), iframe, input, select, textarea, [tabindex]:not([tabindex="-1"])';

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [booked, setBooked] = useState(false);

  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const restoreRef = useRef<HTMLElement | null>(null);

  const open = useCallback(() => {
    restoreRef.current = document.activeElement as HTMLElement | null;
    setMounted(true);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    /* Back to whatever opened it. Without this the reader is returned to the
       top of the document, which on a page this long is a punishment. */
    restoreRef.current?.focus?.();
  }, []);

  /* Escape out, Tab held in, and the page underneath kept still. */
  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        close();
        return;
      }
      if (e.key !== 'Tab') return;
      const root = dialogRef.current;
      if (!root) return;
      const items = Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null || el === document.activeElement
      );
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, close]);

  /* Anything Cal.com has to tell us. Bound once, not on open: binding it later
     would miss a booking confirmed in the instant before the listener
     attached. */
  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (!(CLINIC.cal.origins as readonly string[]).includes(e.origin)) return;
      const type = e.data && e.data.type;
      if (
        type === 'bookingSuccessful' ||
        type === 'CAL_BOOKING_SUCCESSFUL' ||
        type === 'cal:booking:confirmed'
      ) {
        setBooked(true);
      }
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  return (
    <BookingContext.Provider value={{ open, close, isOpen }}>
      {children}

      {mounted && (
        <div
          className={
            'fixed inset-0 z-[100] transition-opacity duration-300 ease-ease ' +
            (isOpen ? 'opacity-100' : 'pointer-events-none invisible opacity-0')
          }
          aria-hidden={!isOpen}
        >
          <div
            className="absolute inset-0 bg-[rgba(8,8,9,0.88)] backdrop-blur-sm"
            onClick={close}
            aria-hidden="true"
          />

          <div className="absolute inset-0 grid place-items-center overflow-y-auto p-0 sm:p-6">
            <div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="booking-dialog-title"
              className={
                'relative flex h-[100dvh] w-full flex-col border-line bg-ink shadow-2xl transition-transform duration-300 ease-ease ' +
                'sm:h-[92vh] sm:max-h-[880px] sm:max-w-3xl sm:rounded-sm sm:border ' +
                (isOpen ? 'translate-y-0' : 'translate-y-3')
              }
            >
              <div className="flex items-start justify-between gap-6 border-b border-line px-5 py-4 sm:px-7 sm:py-5">
                <div>
                  <p className="u-label">Book</p>
                  <h2
                    id="booking-dialog-title"
                    className="mt-2 font-display text-2xl leading-tight text-bone sm:text-[1.75rem]"
                  >
                    Pick a time that suits you.
                  </h2>
                  <p className="mt-2 text-[0.875rem] text-bone-dim">
                    Forty minutes — examination, scan and a conversation. Nothing is done to your
                    teeth that day unless you ask for it.
                  </p>
                </div>

                <button
                  ref={closeRef}
                  type="button"
                  onClick={close}
                  aria-label="Close booking"
                  className="-mr-2 -mt-2 grid h-11 w-11 shrink-0 place-items-center rounded-full text-bone-dim transition-colors hover:text-bone"
                >
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1}
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
              </div>

              <div className="relative min-h-0 flex-1 bg-ink-raise">
                <iframe
                  src={embedSrc()}
                  title={'Book a consultation at ' + CLINIC.name}
                  onLoad={() => setLoaded(true)}
                  className={
                    'absolute inset-0 h-full w-full border-0 transition-opacity duration-500 ' +
                    (loaded ? 'opacity-100' : 'opacity-0')
                  }
                  allow="camera; microphone; fullscreen; payment"
                />

                {/* Held until the calendar's own load event, not a timer. */}
                {!loaded && (
                  <div className="absolute inset-0 grid place-items-center px-6 text-center">
                    <div>
                      <p className="u-label">Loading the calendar</p>
                      <p className="mt-4 text-[0.9375rem] text-bone-dim">
                        If it does not appear,{' '}
                        <a
                          href={CLINIC.cal.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-mint underline underline-offset-4"
                        >
                          open the booking page directly
                        </a>{' '}
                        or call {CLINIC.phone}.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-line px-5 py-4 text-[0.8125rem] text-bone-mute sm:px-7">
                {booked ? (
                  <p role="status" className="text-[0.875rem] text-bone">
                    That is booked. You will get a confirmation by email, and we will call the day
                    before to remind you.
                  </p>
                ) : (
                  <p>
                    Rather not book online? Call{' '}
                    <a href={CLINIC.phoneHref} className="text-mint hover:opacity-70">
                      {CLINIC.phone}
                    </a>{' '}
                    or{' '}
                    <a
                      href={CLINIC.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-mint hover:opacity-70"
                    >
                      message on WhatsApp
                    </a>
                    .
                  </p>
                )}
                <p>Booking is handled by Cal.com under their terms.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </BookingContext.Provider>
  );
}
