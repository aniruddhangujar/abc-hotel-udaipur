"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { ROOM_CATEGORIES, RoomCategory } from "@/data/rooms";
import { ArchitecturalDivider, JaaliCornerFrame } from "@/components/brand/HeritageMotifs";
import { RevealText } from "@/components/animation/RevealText";

interface StayChapterProps {
  onExploreRoom: (room: RoomCategory) => void;
  onCheckAvailability: (roomId: string) => void;
}

/**
 * CHAPTER 03 — THE ART OF STAYING
 * Asymmetrical editorial accommodation showcase across Heritage Room, Royal Suite,
 * and The Maharaja Residence. Avoids uniform hotel card grids.
 */
export function StayChapter({ onExploreRoom, onCheckAvailability }: StayChapterProps) {
  const [heritage, royal, maharaja] = ROOM_CATEGORIES;

  return (
    <section
      id="stay"
      aria-label="Chapter 03 — The Art of Staying"
      className="relative bg-cream text-walnut py-24 sm:py-32 lg:py-40 px-6 sm:px-10 lg:px-16"
    >
      <div className="mx-auto max-w-[1360px]">
        {/* Section Editorial Opener */}
        <RevealText className="max-w-3xl mb-16 sm:mb-24">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-sans text-[11px] tracking-[0.28em] uppercase text-sandstone">
              Chapter 03 · The Art of Staying
            </span>
            <span className="text-sandstone/45">·</span>
            <span className="font-devanagari text-xs text-terracotta">विश्राम</span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.06] text-walnut">
            Quiet sanctuaries of{" "}
            <span className="italic font-normal text-terracotta">
              hand-plastered light.
            </span>
          </h2>

          <p className="mt-5 font-sans text-sm sm:text-base leading-[1.7] text-charcoal max-w-2xl">
            Just twenty-eight private quarters surround the inner lotus court and lakeside
            bastion—each proportioned for stillness, natural cross-ventilation, and
            unhurried Mewari living.
          </p>
        </RevealText>

        {/* 1. HERITAGE ROOM — Tall portrait image left, offset editorial spec column right */}
        <article className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center mb-24 sm:mb-32">
          <div className="lg:col-span-6 xl:col-span-6">
            <JaaliCornerFrame tone="walnut">
              <div className="group relative aspect-[3/4] w-full overflow-hidden bg-ivory">
                <Image
                  src={heritage.image}
                  alt={heritage.name}
                  fill
                  sizes="(min-width: 1024px) 46vw, 95vw"
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
                />
              </div>
            </JaaliCornerFrame>
          </div>

          <div className="lg:col-span-6 xl:col-span-5 xl:col-start-8">
            <RevealText>
              <div className="flex items-center gap-3 mb-3">
                <span className="font-display text-sm text-sandstone">
                  {heritage.index}
                </span>
                <span className="h-px w-8 bg-sandstone/40" />
                <span className="font-sans text-[11px] tracking-[0.24em] uppercase text-sandstone">
                  {heritage.subtitle}
                </span>
              </div>

              <h3 className="font-display text-3xl sm:text-4xl lg:text-[2.8rem] text-walnut leading-tight">
                {heritage.name}
              </h3>

              <p className="mt-4 font-sans text-sm sm:text-[15px] leading-[1.72] text-charcoal">
                {heritage.shortDescription}
              </p>

              {/* Compact Spec Ledger */}
              <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-b border-sandstone/25 py-5">
                <div>
                  <dt className="font-sans text-[10px] tracking-[0.22em] uppercase text-charcoal/65">
                    Dimensions
                  </dt>
                  <dd className="mt-1 font-sans text-sm font-medium text-walnut">
                    {heritage.dimensions}
                  </dd>
                </div>
                <div>
                  <dt className="font-sans text-[10px] tracking-[0.22em] uppercase text-charcoal/65">
                    Capacity
                  </dt>
                  <dd className="mt-1 font-sans text-sm font-medium text-walnut">
                    {heritage.capacity}
                  </dd>
                </div>
                <div>
                  <dt className="font-sans text-[10px] tracking-[0.22em] uppercase text-charcoal/65">
                    Vista
                  </dt>
                  <dd className="mt-1 font-sans text-sm font-medium text-walnut">
                    {heritage.view}
                  </dd>
                </div>
                <div>
                  <dt className="font-sans text-[10px] tracking-[0.22em] uppercase text-charcoal/65">
                    From
                  </dt>
                  <dd className="mt-1 font-display text-lg text-terracotta">
                    {heritage.priceDisplay}{" "}
                    <span className="font-sans text-xs text-charcoal/70">/ night</span>
                  </dd>
                </div>
              </dl>

              <div className="mt-6 flex flex-wrap gap-2">
                {heritage.amenities.slice(0, 4).map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1.5 bg-ivory/75 border border-sandstone/20 font-sans text-[11px] text-charcoal"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => onExploreRoom(heritage)}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-walnut text-cream font-sans text-[11px] font-medium tracking-[0.2em] uppercase hover:bg-terracotta transition-colors cursor-pointer"
                >
                  <span>Explore Room</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => onCheckAvailability(heritage.id)}
                  className="px-6 py-3.5 border border-walnut/50 text-walnut font-sans text-[11px] font-medium tracking-[0.2em] uppercase hover:bg-walnut hover:text-cream transition-colors cursor-pointer"
                >
                  Check Availability
                </button>
              </div>
            </RevealText>
          </div>
        </article>

        <ArchitecturalDivider tone="walnut" className="mb-24 sm:mb-32" />

        {/* 2. ROYAL SUITE — Flipped asymmetry: editorial column left, wide lakeside gallery right */}
        <article className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center mb-24 sm:mb-32">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <RevealText>
              <div className="flex items-center gap-3 mb-3">
                <span className="font-display text-sm text-sandstone">{royal.index}</span>
                <span className="h-px w-8 bg-sandstone/40" />
                <span className="font-sans text-[11px] tracking-[0.24em] uppercase text-sandstone">
                  {royal.subtitle}
                </span>
              </div>

              <h3 className="font-display text-3xl sm:text-4xl lg:text-[2.8rem] text-walnut leading-tight">
                {royal.name}
              </h3>

              <p className="mt-4 font-sans text-sm sm:text-[15px] leading-[1.72] text-charcoal">
                {royal.shortDescription}
              </p>

              <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-b border-sandstone/25 py-5">
                <div>
                  <dt className="font-sans text-[10px] tracking-[0.22em] uppercase text-charcoal/65">
                    Dimensions
                  </dt>
                  <dd className="mt-1 font-sans text-sm font-medium text-walnut">
                    {royal.dimensions}
                  </dd>
                </div>
                <div>
                  <dt className="font-sans text-[10px] tracking-[0.22em] uppercase text-charcoal/65">
                    Capacity
                  </dt>
                  <dd className="mt-1 font-sans text-sm font-medium text-walnut">
                    {royal.capacity}
                  </dd>
                </div>
                <div>
                  <dt className="font-sans text-[10px] tracking-[0.22em] uppercase text-charcoal/65">
                    Vista
                  </dt>
                  <dd className="mt-1 font-sans text-sm font-medium text-walnut">
                    {royal.view}
                  </dd>
                </div>
                <div>
                  <dt className="font-sans text-[10px] tracking-[0.22em] uppercase text-charcoal/65">
                    From
                  </dt>
                  <dd className="mt-1 font-display text-lg text-terracotta">
                    {royal.priceDisplay}{" "}
                    <span className="font-sans text-xs text-charcoal/70">/ night</span>
                  </dd>
                </div>
              </dl>

              <div className="mt-6 flex flex-wrap gap-2">
                {royal.amenities.slice(0, 4).map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1.5 bg-ivory/75 border border-sandstone/20 font-sans text-[11px] text-charcoal"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => onExploreRoom(royal)}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-walnut text-cream font-sans text-[11px] font-medium tracking-[0.2em] uppercase hover:bg-terracotta transition-colors cursor-pointer"
                >
                  <span>Explore Room</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => onCheckAvailability(royal.id)}
                  className="px-6 py-3.5 border border-walnut/50 text-walnut font-sans text-[11px] font-medium tracking-[0.2em] uppercase hover:bg-walnut hover:text-cream transition-colors cursor-pointer"
                >
                  Check Availability
                </button>
              </div>
            </RevealText>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2">
            <JaaliCornerFrame tone="walnut">
              <div className="group relative aspect-[16/10] w-full overflow-hidden bg-ivory">
                <Image
                  src={royal.image}
                  alt={royal.name}
                  fill
                  sizes="(min-width: 1024px) 56vw, 95vw"
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
                />
              </div>
            </JaaliCornerFrame>
          </div>
        </article>

        {/* 3. THE MAHARAJA RESIDENCE — Full-bleed grand lakeside pavilion feature */}
        <article className="relative bg-ivory border border-sandstone/25">
          <div className="group relative aspect-[16/9] w-full overflow-hidden bg-walnut">
            <Image
              src={maharaja.image}
              alt={maharaja.name}
              fill
              sizes="(min-width: 1024px) 92vw, 100vw"
              className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-walnut/65 via-transparent to-transparent lg:hidden" />
          </div>

          <div className="p-6 sm:p-10 lg:p-14 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3 mb-3">
                <span className="font-display text-sm text-sandstone">
                  {maharaja.index}
                </span>
                <span className="h-px w-8 bg-sandstone/40" />
                <span className="font-sans text-[11px] tracking-[0.24em] uppercase text-sandstone">
                  {maharaja.subtitle}
                </span>
              </div>

              <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl text-walnut leading-[1.08]">
                {maharaja.name}
              </h3>

              <p className="mt-4 font-display italic text-lg text-terracotta">
                From {maharaja.priceDisplay} / night · {maharaja.dimensions}
              </p>
            </div>

            <div className="lg:col-span-7">
              <p className="font-sans text-sm sm:text-base leading-[1.72] text-charcoal">
                {maharaja.shortDescription} {maharaja.architecturalNotes}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {maharaja.amenities.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1.5 bg-cream border border-sandstone/20 font-sans text-[11px] text-walnut"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => onExploreRoom(maharaja)}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-walnut text-cream font-sans text-[11px] font-medium tracking-[0.2em] uppercase hover:bg-terracotta transition-colors cursor-pointer"
                >
                  <span>Explore Residence</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => onCheckAvailability(maharaja.id)}
                  className="px-6 py-3.5 border border-walnut/50 text-walnut font-sans text-[11px] font-medium tracking-[0.2em] uppercase hover:bg-walnut hover:text-cream transition-colors cursor-pointer"
                >
                  Check Availability
                </button>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

