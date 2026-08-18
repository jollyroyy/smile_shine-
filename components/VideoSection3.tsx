'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

export interface VideoOverlayProps {
  text?: string;
  title?: string;
  description?: string;
  className?: string;
}

export const VideoOverlay: React.FC<VideoOverlayProps> = ({
  text,
  title,
  description = 'Every dimension engineered for tranquility, luxury, and peace of mind.',
  className = '',
}) => {
  const displayTitle = title || text || 'Smile Shine Sanctuary — Designed for Ultimate Comfort';

  return (
    <div
      className={`absolute bottom-0 inset-x-0 h-[18%] sm:h-[15%] min-h-[110px] bg-gradient-to-t from-white/85 via-white/50 to-transparent flex flex-col justify-end items-center pb-5 sm:pb-7 md:pb-8 px-4 z-20 pointer-events-auto backdrop-blur-[0.5px] ${className}`}
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Primary Haute Serif Headline */}
        <h2 className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-950 drop-shadow-sm leading-tight">
          {displayTitle}
        </h2>

        {/* Subtext Descriptor */}
        {description && (
          <p className="font-sans text-[11px] sm:text-xs md:text-sm font-semibold tracking-[0.08em] text-slate-700 mt-1 uppercase">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export interface VideoSection3Props {
  videoFramePath?: string;
  totalFrames?: number;
  title?: string;
  text?: string;
  description?: string;
  padLength?: number;
  extension?: string;
  scrollContainerHeight?: string;
}

export const VideoSection3: React.FC<VideoSection3Props> = ({
  videoFramePath = '/videos/video_1_frames/frame_',
  totalFrames = 300,
  title = 'Smile Shine Sanctuary — Designed for Ultimate Comfort',
  text,
  description = 'Every dimension engineered for tranquility, luxury, and peace of mind.',
  padLength = 4,
  extension = 'webp',
  scrollContainerHeight = '350vh',
}) => {
  const [currentFrame, setCurrentFrame] = useState<number>(1);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [loadProgress, setLoadProgress] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesCache = useRef<Map<number, HTMLImageElement>>(new Map());
  const rafId = useRef<number | null>(null);
  const targetFrameRef = useRef<number>(1);

  const overlayTitle = text || title;

  const getFrameUrl = useCallback(
    (index: number) => {
      const paddedIndex = String(index).padStart(padLength, '0');
      const cleanPath = videoFramePath.endsWith('/')
        ? `${videoFramePath}frame_${paddedIndex}.${extension}`
        : `${videoFramePath}${paddedIndex}.${extension}`;
      return cleanPath;
    },
    [videoFramePath, padLength, extension]
  );

  const renderFrameToCanvas = useCallback((img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (canvas.width !== img.naturalWidth || canvas.height !== img.naturalHeight) {
      canvas.width = img.naturalWidth || 1920;
      canvas.height = img.naturalHeight || 1080;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        root: null,
        rootMargin: '250px 0px',
        threshold: 0.01,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let isMounted = true;
    let loadedCount = 0;

    const preloadFrame = (index: number): Promise<HTMLImageElement> => {
      return new Promise((resolve) => {
        if (imagesCache.current.has(index)) {
          resolve(imagesCache.current.get(index)!);
          return;
        }

        const img = new Image();
        img.src = getFrameUrl(index);
        img.onload = () => {
          if (!isMounted) return;
          imagesCache.current.set(index, img);
          loadedCount++;
          setLoadProgress(Math.round((loadedCount / totalFrames) * 100));

          if (index === 1 && canvasRef.current) {
            renderFrameToCanvas(img);
            setIsLoaded(true);
          }
          resolve(img);
        };
        img.onerror = () => {
          loadedCount++;
          resolve(img);
        };
      });
    };

    const initialBatch = Array.from({ length: Math.min(20, totalFrames) }, (_, i) => i + 1);
    Promise.all(initialBatch.map(preloadFrame)).then(() => {
      if (!isMounted) return;
      setIsLoaded(true);

      const remainingFrames = Array.from(
        { length: totalFrames - initialBatch.length },
        (_, i) => i + initialBatch.length + 1
      );

      remainingFrames.forEach((frameIdx, idx) => {
        setTimeout(() => {
          if (isMounted) preloadFrame(frameIdx);
        }, idx * 10);
      });
    });

    return () => {
      isMounted = false;
    };
  }, [isVisible, totalFrames, getFrameUrl, renderFrameToCanvas]);

  useEffect(() => {
    if (!isVisible) return;

    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const scrollableHeight = containerRef.current.offsetHeight - window.innerHeight;

      if (scrollableHeight <= 0) return;

      const currentScroll = -rect.top;
      const progress = Math.min(Math.max(currentScroll / scrollableHeight, 0), 1);

      const targetFrame = Math.min(
        Math.max(Math.floor(progress * (totalFrames - 1)) + 1, 1),
        totalFrames
      );

      targetFrameRef.current = targetFrame;

      if (!rafId.current) {
        rafId.current = requestAnimationFrame(() => {
          const nextFrame = targetFrameRef.current;
          setCurrentFrame(nextFrame);

          const cachedImg = imagesCache.current.get(nextFrame);
          if (cachedImg && cachedImg.complete) {
            renderFrameToCanvas(cachedImg);
          } else {
            const tempImg = new Image();
            tempImg.src = getFrameUrl(nextFrame);
            tempImg.onload = () => {
              imagesCache.current.set(nextFrame, tempImg);
              renderFrameToCanvas(tempImg);
            };
          }
          rafId.current = null;
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isVisible, totalFrames, getFrameUrl, renderFrameToCanvas]);

  return (
    <section
      ref={containerRef}
      style={{ height: scrollContainerHeight }}
      className="relative w-full bg-slate-950 text-slate-900"
      aria-label="Smile Shine Clinic Suites Experience"
    >
      {/* Sticky 100vh Viewport Container */}
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-slate-950"
      >
        {/* 16:9 Aspect Video Container */}
        <div className="relative w-full aspect-video max-h-screen flex items-center justify-center">
          {/* Main Scrubber Canvas */}
          <canvas
            ref={canvasRef}
            className={`w-full h-full object-contain transition-opacity duration-700 ease-out ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            aria-label={`Smile Shine suites frame ${currentFrame} of ${totalFrames}`}
          />

          {/* Loading Indicator */}
          {!isLoaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950 text-white z-10">
              <div className="relative w-16 h-16 mb-5">
                <div className="absolute inset-0 rounded-full border border-cyan-500/20 animate-ping" />
                <div className="w-16 h-16 rounded-full border-2 border-t-cyan-400 border-cyan-500/20 animate-spin" />
              </div>
              <span className="text-xs font-semibold tracking-[0.25em] uppercase text-cyan-400 font-display">
                Loading Clinic Flow
              </span>
              <span className="text-[11px] font-mono text-slate-500 mt-1">{loadProgress}%</span>
            </div>
          )}

          {/* Top Subtle Luxury Badge (Left) */}
          <div className="absolute top-6 left-6 z-20 pointer-events-none hidden sm:flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-950/70 backdrop-blur-xl border border-white/10 shadow-xl">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-300">
              Patient Lounge → Operatory Suites
            </span>
          </div>

          {/* Frame Counter HUD (Right) */}
          <div className="absolute top-6 right-6 z-20 pointer-events-none hidden sm:flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-slate-950/70 backdrop-blur-xl border border-white/10 text-[10px] font-mono text-slate-300">
            <span className="text-slate-400">FLOW</span>
            <span className="text-cyan-400 font-bold">{String(currentFrame).padStart(3, '0')}</span>
            <span className="text-slate-600">/</span>
            <span>{totalFrames}</span>
          </div>

          {/* Reusable VideoOverlay Child Component */}
          <VideoOverlay
            title={overlayTitle}
            description={description}
          />

          {/* Scroll Guide Indicator */}
          <div
            className={`absolute bottom-24 sm:bottom-28 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center pointer-events-none transition-opacity duration-500 ${
              currentFrame > 20 ? 'opacity-0 pointer-events-none' : 'opacity-90'
            }`}
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.25em] text-slate-900 bg-white/80 backdrop-blur-md px-3.5 py-0.5 rounded-full border border-white/50 shadow-md">
                Scroll to scrub
              </span>
              <div className="w-5 h-8 sm:w-5.5 sm:h-8.5 rounded-full border-2 border-slate-900/60 bg-white/40 backdrop-blur-sm flex justify-center p-1 shadow-md">
                <div className="w-1 h-2 rounded-full bg-slate-900 animate-bounce" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection3;
