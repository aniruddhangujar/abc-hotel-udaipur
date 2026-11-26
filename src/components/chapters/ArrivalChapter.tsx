"use client";

import React, { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CanvasSequenceStage } from "@/components/animation/CanvasSequenceStage";
import { PalaceEmblem } from "@/components/brand/PalaceLogo";
import { SequenceConfig } from "@/lib/sequence-loader";

gsap.registerPlugin(ScrollTrigger);

interface ArrivalChapterProps {
  onHeroReady?: () => void;
}

/**
 * CHAPTER 01 — THE ARRIVAL
 * Scroll-driven sequence starting on the monumental carved wooden palace gates,
 * parting inward in architectural perspective and moving seamlessly into the courtyard.
 */
export function ArrivalChapter({ onHeroReady }: ArrivalChapterProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const progressRef = useRef<number>(0);
  const heroOverlayRef = useRef<HTMLDivElement | null>(null);
  const thresholdWhisperRef = useRef<HTMLDivElement | null>(null);
  const scrollPromptRef = useRef<HTMLDivElement | null>(null);

  const desktopSequence: SequenceConfig = useMemo(
    () => ({
      id: "arrival-desktop",
      basePath: "/sequences/arrival-desktop",
      frameCount: 240,
      criticalCount: 40,
      startDelayMs: 0,
    }),
    []
  );

  const mobileSequence: SequenceConfig = useMemo(
    () => ({
      id: "arrival-mobile",
      basePath: "/sequences/arrival-mobile",
      frameCount: 120,
      criticalCount: 24,
      startDelayMs: 0,
    }),
    []
  );

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress;
          progressRef.current = p;

          // Fade hero typography gently between scroll 5% and 28%
          if (heroOverlayRef.current) {
            const fade = Math.max(0, 1 - Math.max(0, p - 0.04) / 0.22);
            heroOverlayRef.current.style.opacity = String(fade);
            heroOverlayRef.current.style.transform = `translate3d(0, ${
              -Math.min(1, p / 0.28) * 34
            }px, 0)`;
          }

          if (scrollPromptRef.current) {
            const cueFade = Math.max(0, 1 - p / 0.12);
            scrollPromptRef.current.style.opacity = String(cueFade);
          }

          // Quiet whisper as the wooden gates part & courtyard appears (46% -> 82%)
          if (thresholdWhisperRef.current) {
            let whisperAlpha = 0;
            if (p > 0.45 && p < 0.85) {
              if (p < 0.6) whisperAlpha = (p - 0.45) / 0.15;
              else if (p > 0.72) whisperAlpha = (0.85 - p) / 0.13;
              else whisperAlpha = 1;
            }
            thresholdWhisperRef.current.style.opacity = String(
              Math.max(0, Math.min(1, whisperAlpha))
            );
          }
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="arrival"
      ref={sectionRef}
      aria-label="Chapter 01 — The Arrival"
      className="relative h-[310vh] md:h-[420vh] bg-walnut text-cream"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <CanvasSequenceStage
          desktopSequence={desktopSequence}
          mobileSequence={mobileSequence}
          progressRef={progressRef}
          fallbackStaticSrc="/images/plates/palace-gate-closed.jpg"
          fallbackAlt="Monumental carved wooden palace gates of ABC HOTEL in Udaipur bathed in golden hour sunlight"
          onInitialReady={onHeroReady}
          ariaLabel="Interactive entrance gates opening into the palace courtyard of ABC HOTEL Udaipur"
        />

        {/* Atmospheric editorial vignette protecting contrast */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-walnut/55 via-walnut/25 to-walnut/75"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 68% 52% at 50% 52%, rgba(28, 24, 19, 0.56) 0%, rgba(28, 24, 19, 0.22) 60%, rgba(28, 24, 19, 0) 100%)",
          }}
        />

        {/* Centered Wordmark & Hero Statement */}
        <div
          ref={heroOverlayRef}
          className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center will-change-[transform,opacity]"
        >
          <div className="flex flex-col items-center max-w-4xl">
            <PalaceEmblem size={44} className="text-gold mb-3 drop-shadow-sm" />

            <p className="font-devanagari text-xs sm:text-sm tracking-[0.28em] text-ivory/90 mb-3">
              स्वागतम् · उदयपुर
            </p>

            <span className="font-display text-lg sm:text-2xl tracking-[0.34em] uppercase text-cream pl-[0.34em]">
              ABC HOTEL
            </span>

            <div className="my-5 w-16 h-px bg-gold/65" />

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[4.35rem] leading-[1.06] tracking-[-0.02em] text-cream drop-shadow-[0_4px_24px_rgba(41,37,31,0.55)]">
              Some places are visited.{" "}
              <span className="italic font-normal text-ivory block sm:inline">
                Others are experienced.
              </span>
            </h1>

            <p className="mt-5 font-sans text-xs sm:text-sm tracking-[0.2em] uppercase text-ivory/80">
              Where History Welcomes You
            </p>
          </div>
        </div>

        {/* Mid-Threshold Poetic Whisper as Doors Open */}
        <div
          ref={thresholdWhisperRef}
          style={{ opacity: 0 }}
          className="pointer-events-none absolute inset-x-0 bottom-12 sm:bottom-16 z-20 flex flex-col items-center text-center px-6 transition-none will-change-opacity"
        >
          <div className="inline-block bg-walnut/80 backdrop-blur-md border border-gold/30 px-6 sm:px-9 py-4 sm:py-5">
            <span className="block font-sans text-[10px] tracking-[0.34em] uppercase text-gold mb-1.5">
              Chapter 01 · The Threshold
            </span>
            <p className="font-display italic text-lg sm:text-2xl md:text-[1.75rem] text-cream">
              Step across four centuries of Mewar sandstone and quiet sanctuary.
            </p>
          </div>
        </div>

        {/* Bottom Scroll Invitation */}
        <div
          ref={scrollPromptRef}
          className="pointer-events-none absolute inset-x-0 bottom-8 z-20 flex flex-col items-center gap-3"
        >
          <span className="font-sans text-[10px] font-medium tracking-[0.34em] uppercase text-ivory/90">
            Scroll to Discover
          </span>
          <div className="w-px h-9 bg-gradient-to-b from-gold to-transparent" />
        </div>
      </div>
    </section>
  );
}
