"use client";

import React, { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CanvasSequenceStage } from "@/components/animation/CanvasSequenceStage";
import { ArchitecturalDivider } from "@/components/brand/HeritageMotifs";
import { PALACE_COURTYARD_MARKERS } from "@/data/palace";
import { SequenceConfig } from "@/lib/sequence-loader";

gsap.registerPlugin(ScrollTrigger);

/**
 * CHAPTER 02 — THE PALACE
 * Seamless courtyard passage past sandstone colonnades, central lotus water court,
 * jharokha balconies, and parting raw-silk curtains into the candlelit reception lobby.
 */
export function PalaceChapter() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const progressRef = useRef<number>(0);
  const copyPanelRef = useRef<HTMLDivElement | null>(null);
  const lobbyTagRef = useRef<HTMLDivElement | null>(null);

  const desktopSequence: SequenceConfig = useMemo(
    () => ({
      id: "courtyard-desktop",
      basePath: "/sequences/courtyard-desktop",
      frameCount: 180,
      criticalCount: 30,
      startDelayMs: 300,
    }),
    []
  );

  const mobileSequence: SequenceConfig = useMemo(
    () => ({
      id: "courtyard-mobile",
      basePath: "/sequences/courtyard-mobile",
      frameCount: 90,
      criticalCount: 20,
      startDelayMs: 300,
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

          if (copyPanelRef.current) {
            // Present primary courtyard legacy statement across 0.12..0.54
            let alpha = 0;
            if (p >= 0.06 && p <= 0.6) {
              if (p < 0.2) alpha = (p - 0.06) / 0.14;
              else if (p > 0.46) alpha = (0.6 - p) / 0.14;
              else alpha = 1;
            }
            copyPanelRef.current.style.opacity = String(Math.max(0, Math.min(1, alpha)));
            copyPanelRef.current.style.transform = `translate3d(0, ${
              (1 - Math.max(0, Math.min(1, alpha))) * 22
            }px, 0)`;
          }

          if (lobbyTagRef.current) {
            const lobbyAlpha = p > 0.68 ? Math.min(1, (p - 0.68) / 0.18) : 0;
            lobbyTagRef.current.style.opacity = String(lobbyAlpha);
            lobbyTagRef.current.style.transform = `translate3d(0, ${
              (1 - lobbyAlpha) * 20
            }px, 0)`;
          }
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="palace"
      aria-label="Chapter 02 — The Palace"
      className="relative bg-ivory text-walnut"
    >
      {/* Pinned Courtyard to Lobby Journey */}
      <div
        ref={sectionRef as React.RefObject<HTMLDivElement>}
        className="relative h-[270vh] md:h-[360vh]"
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <CanvasSequenceStage
            desktopSequence={desktopSequence}
            mobileSequence={mobileSequence}
            progressRef={progressRef}
            fallbackStaticSrc="/images/plates/courtyard-axis.jpg"
            fallbackAlt="Symmetrical grand sandstone courtyard with lotus water fountain and carved jharokha balconies at ABC HOTEL"
            ariaLabel="Courtyard camera sequence moving past carved colonnades into the reception lobby"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-walnut/65 via-transparent to-walnut/35"
          />

          {/* Floating Editorial Statement inside Courtyard */}
          <div
            ref={copyPanelRef}
            className="pointer-events-none absolute inset-x-0 bottom-10 sm:bottom-14 z-20 mx-auto max-w-4xl px-6 text-center will-change-[transform,opacity]"
          >
            <div className="inline-block bg-walnut/85 backdrop-blur-md border border-gold/35 px-6 sm:px-10 py-6 sm:py-8 text-cream shadow-[0_16px_48px_-12px_rgba(20,16,12,0.55)]">
              <div className="flex items-center justify-center gap-3 mb-3">
                <span className="font-sans text-[10px] tracking-[0.28em] uppercase text-gold">
                  Chapter 02 · The Palace
                </span>
                <span className="text-gold/50">·</span>
                <span className="font-devanagari text-xs text-ivory/80">राजमहल</span>
              </div>

              <h2 className="font-display text-2xl sm:text-4xl lg:text-[2.85rem] leading-[1.1] text-cream">
                An enduring legacy,{" "}
                <span className="italic font-normal text-ivory">brought to life.</span>
              </h2>

              <p className="mt-3 max-w-xl mx-auto font-sans text-xs sm:text-sm leading-relaxed text-ivory/85">
                Discover a world where centuries of craftsmanship meet the warmth of
                contemporary hospitality.
              </p>
            </div>
          </div>

          {/* Reception Lobby Arrival Caption */}
          <div
            ref={lobbyTagRef}
            style={{ opacity: 0 }}
            className="pointer-events-none absolute inset-x-0 bottom-12 sm:bottom-16 z-20 mx-auto max-w-2xl px-6 text-center will-change-[transform,opacity]"
          >
            <div className="inline-block bg-walnut/82 backdrop-blur-md border border-gold/35 px-7 py-5 text-cream">
              <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-gold">
                Swagat Kaksh · Reception Sanctum
              </p>
              <p className="mt-1.5 font-display italic text-xl sm:text-2xl text-cream">
                Chanderi silks part to reveal hand-frescoed vaults and lotus light.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Editorial Architectural Highlights Strip */}
      <div className="relative bg-cream text-walnut py-20 sm:py-28 px-6 sm:px-10 lg:px-16 border-t border-sandstone/20">
        <div className="mx-auto max-w-[1320px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-14">
            <div className="lg:col-span-7">
              <p className="font-sans text-[11px] tracking-[0.28em] uppercase text-sandstone mb-3">
                Architecture & Craft · 1694
              </p>
              <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl leading-[1.1] text-walnut">
                Carved in golden Mewar sandstone,{" "}
                <span className="italic font-normal text-terracotta">
                  shaped by stillness.
                </span>
              </h3>
            </div>
            <div className="lg:col-span-5">
              <p className="font-sans text-sm sm:text-[15px] leading-[1.7] text-charcoal">
                Every arcade, bracketed jharokha, and inlaid Makrana floor slab inside ABC
                HOTEL preserves the quiet geometry of an ancestral nobleman&apos;s lakeside
                haveli—restored over seven years by Udaipur master stone-carvers and
                lime-plaster artisans.
              </p>
            </div>
          </div>

          <ArchitecturalDivider tone="walnut" className="mb-12" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {PALACE_COURTYARD_MARKERS.map((marker, idx) => (
              <div
                key={marker.label}
                className="border-l border-sandstone/35 pl-6 py-1 flex flex-col justify-between"
              >
                <span className="font-display text-xs tracking-[0.2em] text-sandstone mb-2">
                  0{idx + 1}
                </span>
                <h4 className="font-display text-xl text-walnut mb-2">
                  {marker.label}
                </h4>
                <p className="font-sans text-sm leading-relaxed text-charcoal/85">
                  {marker.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
