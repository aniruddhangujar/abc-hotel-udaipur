"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  loadImageSequence,
  resolveBracketingFrames,
  SequenceConfig,
} from "@/lib/sequence-loader";

interface CanvasSequenceStageProps {
  desktopSequence: SequenceConfig;
  mobileSequence: SequenceConfig;
  progressRef: React.MutableRefObject<number>;
  fallbackStaticSrc: string;
  fallbackAlt: string;
  onInitialReady?: () => void;
  className?: string;
  ariaLabel?: string;
}

/**
 * Responsive, DPR-aware HTML5 Canvas renderer for scroll-driven image sequences.
 * Automatically picks mobile vs desktop frame sets, supports progressive background
 * preloading, and renders an accessible static fallback under reduced motion.
 */
export function CanvasSequenceStage({
  desktopSequence,
  mobileSequence,
  progressRef,
  fallbackStaticSrc,
  fallbackAlt,
  onInitialReady,
  className = "",
  ariaLabel,
}: CanvasSequenceStageProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const framesRef = useRef<(HTMLImageElement | null)[]>([]);
  const smoothedProgressRef = useRef<number>(0);
  const lastExactRef = useRef<number>(-1);
  const needsRedrawRef = useRef<boolean>(true);
  const lastTimeRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);

  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
  const [hasFirstFrame, setHasFirstFrame] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mobileMq = window.matchMedia("(max-width: 767px)");
    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateFlags = () => {
      setIsMobile(mobileMq.matches);
      setReducedMotion(motionMq.matches);
    };

    updateFlags();
    mobileMq.addEventListener("change", updateFlags);
    motionMq.addEventListener("change", updateFlags);
    return () => {
      mobileMq.removeEventListener("change", updateFlags);
      motionMq.removeEventListener("change", updateFlags);
    };
  }, []);

  const activeConfig = isMobile ? mobileSequence : desktopSequence;

  useEffect(() => {
    if (reducedMotion) {
      onInitialReady?.();
      return;
    }

    smoothedProgressRef.current = Math.max(0, Math.min(1, progressRef.current));
    lastExactRef.current = -1;
    needsRedrawRef.current = true;
    let readyFired = false;

    const loader = loadImageSequence(
      activeConfig,
      ({ criticalReady }) => {
        if (criticalReady && !readyFired) {
          readyFired = true;
          onInitialReady?.();
        }
      },
      (index) => {
        needsRedrawRef.current = true;
        if (index === 0) {
          setHasFirstFrame(true);
          if (!readyFired) {
            readyFired = true;
            onInitialReady?.();
          }
        }
      }
    );

    framesRef.current = loader.frames;

    return () => {
      loader.cancel();
    };
  }, [activeConfig, progressRef, reducedMotion, onInitialReady]);

  useEffect(() => {
    if (reducedMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      needsRedrawRef.current = true; // Force redraw after resize
    };

    resizeCanvas();
    const ro = new ResizeObserver(resizeCanvas);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    const drawCover = (img: HTMLImageElement) => {
      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      if (!iw || !ih || !cw || !ch) return;

      const scale = Math.max(cw / iw, ch / ih);
      const dw = iw * scale;
      const dh = ih * scale;
      const dx = (cw - dw) * 0.5;
      const dy = (ch - dh) * 0.5;

      ctx.drawImage(img, dx, dy, dw, dh);
    };

    const tick = (now: number) => {
      const dt = lastTimeRef.current
        ? Math.min(0.05, Math.max(0.001, (now - lastTimeRef.current) / 1000))
        : 1 / 60;
      lastTimeRef.current = now;

      const targetProgress = Math.max(0, Math.min(1, progressRef.current));
      const currentSmoothed = smoothedProgressRef.current;
      const diff = targetProgress - currentSmoothed;

      if (Math.abs(diff) < 0.00015) {
        smoothedProgressRef.current = targetProgress;
      } else {
        const damping = 1 - Math.exp(-22 * dt);
        smoothedProgressRef.current = currentSmoothed + diff * damping;
      }

      const total = activeConfig.frameCount;
      const exact = Math.max(0, Math.min(total - 1, smoothedProgressRef.current * (total - 1)));
      const exactMoved = Math.abs(exact - lastExactRef.current) >= 0.004;

      if (exactMoved || needsRedrawRef.current) {
        const { base, overlay, overlayAlpha } = resolveBracketingFrames(
          framesRef.current,
          exact
        );
        if (base) {
          ctx.globalAlpha = 1;
          drawCover(base);
          if (overlay && overlay !== base && overlayAlpha > 0.015) {
            ctx.globalAlpha = overlayAlpha;
            drawCover(overlay);
            ctx.globalAlpha = 1;
          }
          lastExactRef.current = exact;
          needsRedrawRef.current = false;
        }
      }

      rafRef.current = window.requestAnimationFrame(tick);
    };

    rafRef.current = window.requestAnimationFrame(tick);

    return () => {
      ro.disconnect();
      if (rafRef.current !== null) window.cancelAnimationFrame(rafRef.current);
    };
  }, [activeConfig, progressRef, reducedMotion]);

  if (reducedMotion) {
    return (
      <div className={`relative w-full h-full overflow-hidden ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={fallbackStaticSrc}
          alt={fallbackAlt}
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full overflow-hidden bg-walnut ${className}`}>
      {!hasFirstFrame && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={fallbackStaticSrc}
          alt={fallbackAlt}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      <canvas
        ref={canvasRef}
        role="img"
        aria-label={ariaLabel ?? fallbackAlt}
        className="relative z-10 block w-full h-full"
      />
    </div>
  );
}

