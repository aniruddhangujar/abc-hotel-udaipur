"use client";

import React, { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CanvasSequenceStage } from "@/components/animation/CanvasSequenceStage";
import { PalaceLogo } from "@/components/brand/PalaceLogo";
import { BookingSanctuary } from "@/components/booking/BookingSanctuary";
import { SequenceConfig } from "@/lib/sequence-loader";

gsap.registerPlugin(ScrollTrigger);

interface DepartureChapterProps {
  preselectedRoomId?: string;
  preselectedExperience?: string | null;
}

/**
 * CHAPTER 06 — THE DEPARTURE
 * Reveals the lakeside palace exterior at twilight as the camera moves gently away
 * over the glowing evening water reflections, closing into the bespoke reservation studio.
 */
export function DepartureChapter({
  preselectedRoomId,
  preselectedExperience,
}: DepartureChapterProps) {
  const sequenceRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<number>(0);
  const quoteRef = useRef<HTMLDivElement | null>(null);

  const desktopSequence: SequenceConfig = useMemo(
    () => ({
      id: "departure-desktop",
      basePath: "/sequences/departure-desktop",
      frameCount: 160,
      criticalCount: 28,
      startDelayMs: 650,
    }),
    []
  );

  const mobileSequence: SequenceConfig = useMemo(
    () => ({
      id: "departure-mobile",
      basePath: "/sequences/departure-mobile",
      frameCount: 80,
      criticalCount: 18,
      startDelayMs: 650,
    }),
    []
  );

  useEffect(() => {
    const container = sequenceRef.current;
    if (!container) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress;
          progressRef.current = p;

          if (quoteRef.current) {
            const reveal = Math.max(0, Math.min(1, (p - 0.18) / 0.35));
            quoteRef.current.style.opacity = String(reveal);
            quoteRef.current.style.transform = `translate3d(0, ${(1 - reveal) * 24}px, 0)`;
          }
        },
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="departure"
      aria-label="Chapter 06 — The Departure"
      className="relative bg-walnut text-cream"
    >
      {/* Pinned Twilight Pull-Away Sequence */}
      <div ref={sequenceRef} className="relative h-[240vh] md:h-[290vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <CanvasSequenceStage
            desktopSequence={desktopSequence}
            mobileSequence={mobileSequence}
            progressRef={progressRef}
            fallbackStaticSrc="/images/plates/palace-sunset-exterior.jpg"
            fallbackAlt="ABC HOTEL palace exterior glowing softly across Lake Pichola at sunset in Udaipur"
            ariaLabel="Twilight camera pull-away revealing the palace glowing across Lake Pichola"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-walnut/55 via-walnut/25 to-walnut/90"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 65% 50% at 50% 48%, rgba(24, 20, 16, 0.48) 0%, rgba(24, 20, 16, 0) 78%)",
            }}
          />

          <div
            ref={quoteRef}
            className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center will-change-[transform,opacity]"
          >
            <span className="font-sans text-[10px] tracking-[0.34em] uppercase text-gold mb-3">
              Chapter 06 · The Departure
            </span>
            <p className="font-devanagari text-xs text-ivory/75 mb-4">प्रस्थान</p>

            <h2 className="font-display text-3xl sm:text-5xl lg:text-[4rem] leading-[1.08] max-w-4xl text-cream drop-shadow-[0_4px_24px_rgba(0,0,0,0.65)]">
              Some memories deserve{" "}
              <span className="italic font-normal text-ivory">
                a place of their own.
              </span>
            </h2>

            <div className="mt-8">
              <PalaceLogo layout="stacked" tone="ivory" />
              <p className="mt-3 font-sans text-[11px] tracking-[0.38em] uppercase text-gold pl-[0.38em]">
                RAJASTHAN · INDIA
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Studio Bridge */}
      <div className="relative z-20 -mt-16 sm:-mt-24 pb-24 sm:pb-32 px-4 sm:px-8 lg:px-12 bg-gradient-to-b from-transparent via-walnut to-walnut">
        <BookingSanctuary
          preselectedRoomId={preselectedRoomId}
          preselectedExperience={preselectedExperience}
        />
      </div>
    </section>
  );
}
