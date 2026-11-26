"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Clock } from "lucide-react";
import { EXPERIENCES } from "@/data/experiences";
import { ArchitecturalDivider, JaaliCornerFrame } from "@/components/brand/HeritageMotifs";
import { RevealText } from "@/components/animation/RevealText";

interface ExperiencesChapterProps {
  onInquireExperience: (experienceTitle: string) => void;
}

/**
 * CHAPTER 05 — EXPERIENCES
 * Showcases all seven signature lifestyle and cultural offerings through an interactive
 * editorial index paired with a sticky architectural photograph plate.
 */
export function ExperiencesChapter({ onInquireExperience }: ExperiencesChapterProps) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const current = EXPERIENCES[selectedIdx] ?? EXPERIENCES[0];

  return (
    <section
      id="experiences"
      aria-label="Chapter 05 — Experiences"
      className="relative bg-ivory text-walnut py-24 sm:py-32 lg:py-40 px-6 sm:px-10 lg:px-16 border-t border-sandstone/20"
    >
      <div className="mx-auto max-w-[1360px]">
        {/* Section Heading */}
        <RevealText className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-14 sm:mb-20">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-sans text-[11px] tracking-[0.28em] uppercase text-olive font-medium">
                Chapter 05 · Experiences
              </span>
              <span className="text-sandstone/45">·</span>
              <span className="font-devanagari text-xs text-terracotta">अनुभव</span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.06] text-walnut">
              More than a destination.{" "}
              <span className="italic font-normal text-olive">
                A world of its own.
              </span>
            </h2>
          </div>

          <div className="lg:col-span-4">
            <p className="font-sans text-sm sm:text-[15px] leading-[1.7] text-charcoal">
              Days unfold to the rhythm of the lake, the baori waters, live Manganiyar
              melodies, and heritage crafts kept alive inside the palace walls.
            </p>
          </div>
        </RevealText>

        <ArchitecturalDivider tone="walnut" className="mb-14" />

        {/* Split Editorial Stage: Interactive Index Left, Sticky Featured Plate Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Interactive 7-Experience Ledger */}
          <div className="lg:col-span-6 divide-y divide-sandstone/25 border-t border-b border-sandstone/25">
            {EXPERIENCES.map((exp, idx) => {
              const isActive = selectedIdx === idx;
              return (
                <div key={exp.id} className="py-5 sm:py-6">
                  <button
                    type="button"
                    onClick={() => setSelectedIdx(idx)}
                    onMouseEnter={() => setSelectedIdx(idx)}
                    aria-expanded={isActive}
                    className="w-full text-left flex items-start justify-between gap-4 group cursor-pointer"
                  >
                    <div className="flex items-baseline gap-4 sm:gap-5">
                      <span
                        className={`font-sans text-xs tracking-[0.2em] transition-colors ${
                          isActive ? "text-terracotta font-medium" : "text-sandstone/75"
                        }`}
                      >
                        {exp.index}
                      </span>

                      <div>
                        <div className="flex flex-wrap items-baseline gap-3">
                          <h3
                            className={`font-display text-2xl sm:text-[1.85rem] leading-snug transition-colors ${
                              isActive
                                ? "text-walnut italic"
                                : "text-walnut/80 group-hover:text-walnut"
                            }`}
                          >
                            {exp.title}
                          </h3>
                          <span className="font-devanagari text-xs text-terracotta/75">
                            {exp.devanagari}
                          </span>
                        </div>
                        <p className="mt-1 font-sans text-xs sm:text-[13px] text-charcoal/75">
                          {exp.subtitle}
                        </p>
                      </div>
                    </div>

                    <ArrowUpRight
                      className={`w-4 h-4 mt-2 shrink-0 transition-transform duration-300 ${
                        isActive
                          ? "text-terracotta translate-x-0.5 -translate-y-0.5"
                          : "text-sandstone/40 group-hover:text-walnut"
                      }`}
                    />
                  </button>

                  {/* Mobile Inline Expansion (preserves editorial elegance on narrow screens) */}
                  {isActive && (
                    <div className="mt-5 lg:hidden">
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-walnut/10 mb-4">
                        <Image
                          src={exp.image}
                          alt={exp.title}
                          fill
                          sizes="95vw"
                          className="object-cover"
                        />
                      </div>
                      <p className="font-sans text-sm leading-relaxed text-charcoal">
                        {exp.description}
                      </p>
                      <p className="mt-2 font-sans text-xs text-olive font-medium">
                        {exp.highlight} · {exp.timing}
                      </p>
                      <button
                        type="button"
                        onClick={() => onInquireExperience(exp.title)}
                        className="mt-4 px-5 py-2.5 bg-walnut text-cream font-sans text-[10px] tracking-[0.2em] uppercase cursor-pointer"
                      >
                        Arrange with Concierge
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Desktop Sticky Architectural Plate & Detail Card */}
          <div className="hidden lg:block lg:col-span-6 lg:sticky lg:top-28">
            <JaaliCornerFrame tone="walnut">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-walnut">
                <Image
                  key={current.id}
                  src={current.image}
                  alt={`${current.title} — ${current.subtitle}`}
                  fill
                  sizes="48vw"
                  className="object-cover transition-opacity duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-walnut/55 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-6 right-6 flex items-center justify-between text-cream">
                  <span className="font-sans text-[10px] tracking-[0.26em] uppercase text-gold">
                    {current.index} · {current.duration}
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-sans text-xs text-ivory/90">
                    <Clock className="w-3.5 h-3.5 text-gold" />
                    {current.timing}
                  </span>
                </div>
              </div>
            </JaaliCornerFrame>

            <div className="mt-7 bg-cream p-7 border border-sandstone/25">
              <div className="flex items-baseline justify-between gap-4">
                <h4 className="font-display text-2xl sm:text-3xl text-walnut">
                  {current.title}
                </h4>
                <span className="font-devanagari text-sm text-terracotta">
                  {current.devanagari}
                </span>
              </div>

              <p className="mt-3 font-sans text-sm sm:text-[15px] leading-[1.7] text-charcoal">
                {current.description}
              </p>

              <div className="mt-5 pt-4 border-t border-sandstone/20 flex items-center justify-between gap-4">
                <p className="font-display italic text-base text-olive">
                  {current.highlight}
                </p>

                <button
                  type="button"
                  onClick={() => onInquireExperience(current.title)}
                  className="shrink-0 px-5 py-3 bg-walnut text-cream font-sans text-[10px] font-medium tracking-[0.2em] uppercase hover:bg-terracotta transition-colors cursor-pointer"
                >
                  Curate Experience
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

