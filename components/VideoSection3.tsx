'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Props for the reusable VideoOverlay child component
 */
export interface VideoOverlayProps {
  /**
   * Main overlay title / headline
   */
  text?: string;
  title?: string;
  /**
   * Supporting description / subtext
   */
  description?: string;
  /**
   * Additional custom CSS classes for the container
   */
  className?: string;
}

/**
 * Reusable VideoOverlay component positioned at the bottom 15% of the video container
 * with a white gradient overlay (from-white/85 to-transparent).
 */
export const VideoOverlay: React.FC<VideoOverlayProps> = ({
  text,
  title,
  description = 'Every space designed for your peace of mind.',
  className = '',
}) => {
  const displayTitle = title || text || 'Professional Clinic Design - Built for Your Comfort';

  return (
    <div
      className={`absolute bottom-0 inset-x-0 h-[18%] sm:h-[15%] min-h-[110px] bg-gradient-to-t from-white/85 to-transparent flex flex-col justify-end items-center pb-5 sm:pb-7 md:pb-9 px-4 z-20 pointer-events-auto backdrop-blur-[0.5px] ${className}`}
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Primary Headline */}
        <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 drop-shadow-sm leading-tight">
          {displayTitle}
        </h2>

        {/* Supporting Descriptor */}
        {description && (
          <p className="text-xs sm:text-sm md:text-base font-semibold text-slate-700 mt-1 sm:mt-1.5 tracking-normal leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

/**
 * Props for the VideoSection3 component
 */
export interface VideoSection3Props {
  /**
   * Base path or prefix for frame images.
   * Defaults to '/videos/video_3_frames/frame_'
   */
  videoFramePath?: string;
  /**
   * Total number of frames in the sequence. Defaults to 300
   */
  totalFrames?: number;
  /**
   * Heading text for the bottom overlay
   */
  title?: string;
  text?: string;
  /**
   * Subtitle text for the bottom overlay
   */
  description?: string;
  /**
   * Zero padding length for frame indices (e.g. 4 for '0001')
   */
  padLength?: number;
  /**
   * Frame image extension ('webp', 'png', 'jpg')
   */
  extension?: string;
  /**
   * Height of the scroll container to control scrub speed (e.g., '350vh')
   */
  scrollContainerHeight?: string;
}

/**
 * VideoSection3: Third full-width video section displaying clinic continuity walkthrough
 * (empty patient area to active clinic flow) with smooth scroll frame scrubbing.
 */
export const VideoSection3: React.FC<VideoSection3Props> = ({
  videoFramePath = '/videos/video_3_frames/frame_',
  totalFrames = 300,
  title = 'Professional Clinic Design - Built for Your Comfort',
  text,
  description = 'Every space designed for your peace of mind.',
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

  // Helper to format frame path
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

  // Draw frame on canvas with high-DPI crisp rendering and 16:9 aspect fit
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

  // 1. Intersection Observer for Lazy Loading
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

  // 2. Progressive Frame Preloading (once visible)
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

    // Priority batch 1: First 20 frames for instant interaction
    const initialBatch = Array.from({ length: Math.min(20, totalFrames) }, (_, i) => i + 1);
    Promise.all(initialBatch.map(preloadFrame)).then(() => {
      if (!isMounted) return;
      setIsLoaded(true);

      // Priority batch 2: Remaining frames progressively loaded in background
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

  // 3. Smooth Scroll Scrubbing with requestAnimationFrame
  useEffect(() => {
    if (!isVisible) return;

    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const scrollableHeight = containerRef.current.offsetHeight - window.innerHeight;

      if (scrollableHeight <= 0) return;

      // Progress calculation [0.0 - 1.0]
      const currentScroll = -rect.top;
      const progress = Math.min(Math.max(currentScroll / scrollableHeight, 0), 1);

      // Frame mapping [1 - totalFrames]
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
      className="relative w-full bg-slate-950 text-slate-900 my-0 border-t border-slate-800/80"
      aria-label="Clinic Continuity and Flow Walkthrough Section"
    >
      {/* Visual Section Divider & Badge */}
      <div className="absolute top-0 inset-x-0 z-30 flex justify-center -translate-y-1/2 pointer-events-none">
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-teal-500/30 backdrop-blur-md shadow-xl text-xs font-semibold uppercase tracking-wider text-teal-300">
          <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
          <span>Section 03 : Clinic Flow & Comfort</span>
        </div>
      </div>

      {/* Sticky 100vh Viewport Container */}
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-slate-950"
      >
        {/* Responsive 16:9 Aspect Ratio Container */}
        <div className="relative w-full aspect-video max-h-screen flex items-center justify-center">
          {/* Main Scrubber Canvas */}
          <canvas
            ref={canvasRef}
            className={`w-full h-full object-contain transition-opacity duration-700 ease-out ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            aria-label={`Clinic continuity video frame ${currentFrame} of ${totalFrames}`}
          />

          {/* Loading Indicator */}
          {!isLoaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 text-white z-10">
              <div className="relative w-14 h-14 mb-4">
                <div className="absolute inset-0 rounded-full border-4 border-teal-500/20 animate-ping" />
                <div className="w-14 h-14 rounded-full border-4 border-t-teal-400 border-teal-500/30 animate-spin" />
              </div>
              <p className="text-sm font-semibold tracking-wider uppercase text-teal-400">
                Loading Clinic Flow
              </p>
              <span className="text-xs text-slate-400 mt-1">{loadProgress}%</span>
            </div>
          )}

          {/* Tag Badge (Top Left) */}
          <div className="absolute top-6 left-6 z-20 pointer-events-none hidden sm:flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/60 backdrop-blur-md border border-white/10 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-teal-400" />
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-200">
              Patient Lounge → Operatory Suites
            </span>
          </div>

          {/* Frame Counter Badge (Top Right) */}
          <div className="absolute top-6 right-6 z-20 pointer-events-none hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-md bg-black/40 backdrop-blur-md border border-white/10 text-[11px] font-mono text-slate-300">
            <span>FLOW FRAME</span>
            <span className="text-teal-400 font-bold">{String(currentFrame).padStart(3, '0')}</span>
            <span className="text-slate-500">/</span>
            <span>{totalFrames}</span>
          </div>

          {/* Reusable VideoOverlay Child Component */}
          <VideoOverlay
            title={overlayTitle}
            description={description}
          />

          {/* Subtle Scroll Guide Indicator */}
          <div
            className={`absolute bottom-24 sm:bottom-28 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center pointer-events-none transition-opacity duration-500 ${
              currentFrame > 25 ? 'opacity-0 pointer-events-none' : 'opacity-90'
            }`}
          >
            <div className="flex flex-col items-center gap-1.5">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-900/80 bg-white/70 backdrop-blur-md px-3 py-0.5 rounded-full border border-white/40 shadow-sm">
                Scroll to experience clinic
              </span>
              <div className="w-5 h-8 sm:w-6 sm:h-9 rounded-full border-2 border-slate-800/60 bg-white/40 backdrop-blur-sm flex justify-center p-1 shadow-md">
                <div className="w-1.5 h-2 rounded-full bg-slate-800 animate-bounce" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection3;
