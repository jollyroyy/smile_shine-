'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';

/* One engine for all three scroll-scrubbed sequences.
   HeroVideoScrubber, ResultsVideoScrubber and VideoSection3 were three copies
   of the same 280 lines differing only in their strings, which meant the scroll
   curve was defined in three places and could drift. The curve itself is
   unchanged: a container of `height`, a sticky 100vh viewport inside it, and
   progress read straight off the container's own offset.

   Two things the copies got wrong are fixed here. They called setState once per
   animation frame, re-rendering React up to 300 times per sequence to update a
   frame counter nobody needed; the frame index now lives in a ref, and only the
   caption beat -- which changes twice -- is state. And they scheduled 280
   setTimeouts at once to stagger preloading; that is now a bounded queue, so a
   sequence that unmounts stops fetching instead of draining its backlog. */

export interface Beat {
  /** The line itself. Set in the display serif. */
  title: string;
  /** The quieter line under it. */
  note?: string;
}

export interface ScrollSequenceProps {
  framePath: string;
  totalFrames?: number;
  padLength?: number;
  extension?: string;
  /** Caption beats, distributed evenly across the scroll of this sequence. */
  beats: Beat[];
  /** Container height. Taller = slower scrub. */
  height?: string;
  /** Accessible name for the section. */
  label: string;
  /** First sequence on the page: shows the scroll cue, loads eagerly. */
  lead?: boolean;
  /** Heading level for the first beat's title. */
  as?: 'h1' | 'h2';
  id?: string;
}

const PRELOAD_LEAD = 24; // frames fetched before the canvas is shown
const PRELOAD_LANES = 4;  // concurrent fetches for the rest

export default function ScrollSequence({
  framePath,
  totalFrames = 300,
  padLength = 4,
  extension = 'webp',
  beats,
  height = '350vh',
  label,
  lead = false,
  as = 'h2',
  id,
}: ScrollSequenceProps) {
  const [ready, setReady] = useState(false);
  const [beat, setBeat] = useState(0);
  const [near, setNear] = useState(false);
  const [still, setStill] = useState(false); // reduced motion: no scrubbing

  const containerRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);
  const cache = useRef<Map<number, HTMLImageElement>>(new Map());
  const rafRef = useRef<number | null>(null);
  const wantRef = useRef(1);
  const drawnRef = useRef(0);

  const urlFor = useCallback(
    (i: number) => framePath + String(i).padStart(padLength, '0') + '.' + extension,
    [framePath, padLength, extension]
  );

  const draw = useCallback((img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas || !img.naturalWidth) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    if (canvas.width !== img.naturalWidth) {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
    }
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  }, []);

  const load = useCallback(
    (i: number) =>
      new Promise<HTMLImageElement | null>((resolve) => {
        const hit = cache.current.get(i);
        if (hit) return resolve(hit);
        const img = new Image();
        img.decoding = 'async';
        img.onload = () => {
          cache.current.set(i, img);
          resolve(img);
        };
        img.onerror = () => resolve(null);
        img.src = urlFor(i);
      }),
    [urlFor]
  );

  /* Honour the motion preference, and keep honouring it if it changes. */
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setStill(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  /* Fetch a little before the sequence arrives, and let go once it is well
     behind. Three sequences of 300 frames is 900 decoded 1280x720 bitmaps, and
     a browser that holds all of them is carrying gigabytes for footage the
     reader scrolled past several screens ago -- enough to lock the tab up on a
     desktop, never mind a mid-range Android. Releasing the map lets the decoded
     frames go; the encoded files stay in the HTTP cache, so scrolling back is a
     re-decode rather than a re-download.

     The release margin is much wider than the load margin on purpose. If they
     matched, a reader parked on the seam between two sequences would sit at the
     boundary dropping and refilling the same cache. */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setNear(true);
      },
      { rootMargin: '300px 0px', threshold: 0.01 }
    );
    io.observe(el);

    const release = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) {
          setNear(false);
          setReady(false);
          cache.current.clear();
          drawnRef.current = 0;
        }
      },
      { rootMargin: '1400px 0px', threshold: 0 }
    );
    release.observe(el);

    if (lead) setNear(true);
    return () => {
      io.disconnect();
      release.disconnect();
    };
  }, [lead]);

  /* Fetch the opening frames, show the canvas, then fill in the rest through a
     bounded queue that stops when the component unmounts. */
  useEffect(() => {
    if (!near) return;
    let alive = true;

    (async () => {
      const opening = Array.from(
        { length: Math.min(PRELOAD_LEAD, totalFrames) },
        (_, k) => k + 1
      );
      const first = await Promise.all(opening.map(load));
      if (!alive) return;
      if (first[0]) draw(first[0]);
      setReady(true);

      let next = opening.length + 1;
      const lane = async () => {
        while (alive && next <= totalFrames) {
          const mine = next++;
          await load(mine);
          /* A frame that arrives after the reader has already scrubbed to it
             would otherwise never be painted. */
          if (alive && mine === wantRef.current) {
            const img = cache.current.get(mine);
            if (img) draw(img);
          }
        }
      };
      await Promise.all(Array.from({ length: PRELOAD_LANES }, lane));
    })();

    return () => {
      alive = false;
    };
  }, [near, totalFrames, load, draw]);

  /* The scroll curve. Unchanged from the original three components. */
  useEffect(() => {
    if (!near || still) return;

    const onScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const span = el.offsetHeight - window.innerHeight;
      if (span <= 0) return;

      const p = Math.min(Math.max(-el.getBoundingClientRect().top / span, 0), 1);
      wantRef.current = Math.min(Math.floor(p * (totalFrames - 1)) + 1, totalFrames);

      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        const want = wantRef.current;

        if (want !== drawnRef.current) {
          const img = cache.current.get(want);
          if (img) {
            draw(img);
            drawnRef.current = want;
          } else {
            load(want).then((late) => {
              if (late && wantRef.current === want) {
                draw(late);
                drawnRef.current = want;
              }
            });
          }
        }

        /* The local progress line. Written straight to the node: it changes
           every frame and has no business triggering a React render. */
        if (barRef.current) barRef.current.style.transform = 'scaleX(' + p + ')';

        /* Beats hold for most of their span and cross-fade at the seams. */
        const idx = Math.min(Math.floor(p * beats.length), beats.length - 1);
        setBeat((cur) => (cur === idx ? cur : idx));
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [near, still, totalFrames, beats.length, draw, load]);

  /* Reduced motion: one representative frame, and every beat readable at once
     rather than a sequence that only exists if you agree to scroll for it. */
  useEffect(() => {
    if (!still || !near) return;
    load(Math.floor(totalFrames / 2)).then((img) => {
      if (img) draw(img);
    });
  }, [still, near, totalFrames, load, draw]);

  const Heading = as;

  return (
    <section
      id={id}
      ref={containerRef}
      style={{ height: still ? 'auto' : height }}
      className="relative w-full bg-ink"
      aria-label={label}
    >
      <div
        className={
          (still ? 'relative' : 'sticky top-0 h-screen') +
          ' w-full overflow-hidden bg-ink flex items-center justify-center'
        }
      >
        <div className="relative w-full aspect-video max-h-screen">
          <canvas
            ref={canvasRef}
            aria-hidden="true"
            className={
              'w-full h-full object-contain transition-opacity duration-700 ' +
              (ready ? 'opacity-100' : 'opacity-0')
            }
          />

          {!ready && (
            <div className="absolute inset-0 grid place-items-center bg-ink">
              <span className="u-label text-bone-mute">Loading</span>
            </div>
          )}

          {/* Caption band. Same bottom-anchored geometry the first draft used,
              graded out of the page's own black instead of a white panel that
              read as a browser artefact against everything around it.

              Two stops, not one: these frames put bright ceiling lights and pale
              marble directly behind the type, and a single linear fade leaves
              the display line sitting on a lit floor. The lower half is close to
              solid so the caption always has a ground, and the falloff above it
              is long enough that the seam never shows. */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[70%] bg-gradient-to-t from-ink via-ink/70 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[32%] bg-gradient-to-t from-ink to-transparent" />

          <div className="absolute inset-x-0 bottom-0 z-30 px-6 pb-10 sm:pb-14">
            <div className="mx-auto max-w-page">
              {still ? (
                <div className="space-y-6">
                  {beats.map((b, i) =>
                    i === 0 ? (
                      <div key={b.title}>
                        <Heading className="u-display text-bone">{b.title}</Heading>
                        {b.note && <p className="mt-3 max-w-prose text-bone-dim">{b.note}</p>}
                      </div>
                    ) : (
                      <div key={b.title}>
                        <p className="u-title text-bone">{b.title}</p>
                        {b.note && <p className="mt-2 max-w-prose text-bone-dim">{b.note}</p>}
                      </div>
                    )
                  )}
                </div>
              ) : (
                <div className="relative">
                  {beats.map((b, i) => (
                    <div
                      key={b.title}
                      aria-hidden={i !== beat}
                      className={
                        'transition-[opacity,transform] duration-700 ease-ease ' +
                        (i === beat
                          ? 'opacity-100 translate-y-0'
                          : 'pointer-events-none absolute inset-x-0 bottom-0 translate-y-3 opacity-0')
                      }
                    >
                      {i === 0 ? (
                        <Heading className="u-display max-w-[22ch] text-balance text-bone">
                          {b.title}
                        </Heading>
                      ) : (
                        <p className="u-display max-w-[22ch] text-balance text-bone">{b.title}</p>
                      )}
                      {b.note && (
                        <p className="mt-3 max-w-prose text-[0.9375rem] text-bone-dim">{b.note}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Progress through this sequence. Replaces the FRAME 001/300 counter,
              which reported the resolution of the effect rather than anything
              the reader wanted to know. */}
          {!still && (
            <div className="absolute inset-x-0 bottom-0 z-40 h-px bg-line">
              <div
                ref={barRef}
                className="h-full origin-left bg-mint"
                style={{ transform: 'scaleX(0)' }}
              />
            </div>
          )}

          {lead && !still && (
            <div
              className={
                'pointer-events-none absolute bottom-24 right-6 z-30 hidden items-center gap-3 transition-opacity duration-500 sm:flex ' +
                (beat === 0 ? 'opacity-100' : 'opacity-0')
              }
            >
              <span className="u-label text-bone-mute">Scroll</span>
              <span className="h-px w-10 bg-line-firm" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
