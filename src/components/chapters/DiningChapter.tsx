"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { UtensilsCrossed } from "lucide-react";
import { CULINARY_COURSES, RESTAURANT_INFO } from "@/data/dining";
import { ArchitecturalDivider } from "@/components/brand/HeritageMotifs";

gsap.registerPlugin(ScrollTrigger);

interface DiningChapterProps {
  onReserveTable: () => void;
}

/**
 * CHAPTER 04 — THE ROYAL TABLE
 * Editorial culinary sequence: as the visitor scrolls, each signature Rajasthani/Indian
 * dish enters, scales and rotates smoothly on its circular platter, revealing ingredients
 * and tasting provenance before yielding naturally to the next course.
 */
export function DiningChapter({ onReserveTable }: DiningChapterProps) {
  const stageContainerRef = useRef<HTMLDivElement | null>(null);
  const dishVisualRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = stageContainerRef.current;
    if (!container) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (prefersReduced || !isDesktop) return;

    const total = CULINARY_COURSES.length;

    const applyCourseTransforms = (p: number) => {
      const segment = 1 / total;
      const idx = Math.min(total - 1, Math.floor(p * total));
      setActiveIndex(idx);

      CULINARY_COURSES.forEach((_, i) => {
        const dishEl = dishVisualRefs.current[i];
        if (!dishEl) return;

        const start = i * segment;
        const localP = (p - start) / segment;

        if (localP < -0.25 || localP > 1.25) {
          dishEl.style.opacity = "0";
          dishEl.style.pointerEvents = "none";
          return;
        }

        let opacity = 1;
        if (localP < 0.2) opacity = Math.max(0, (localP + 0.15) / 0.35);
        else if (localP > 0.8) opacity = Math.max(0, (1.15 - localP) / 0.35);

        const clampedLocal = Math.max(-0.2, Math.min(1.2, localP));
        const scale =
          0.84 + 0.18 * Math.sin(Math.max(0, Math.min(1, clampedLocal)) * Math.PI);
        const rotate = -18 + clampedLocal * 32;

        dishEl.style.opacity = String(Math.max(0, Math.min(1, opacity)));
        dishEl.style.transform = `scale(${scale.toFixed(3)}) rotate(${rotate.toFixed(
          2
        )}deg)`;
        dishEl.style.pointerEvents = opacity > 0.4 ? "auto" : "none";
      });
    };

    applyCourseTransforms(0);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          applyCourseTransforms(self.progress);
        },
      });
    }, container);

    return () => ctx.revert();
  }, []);

  const scrollToCourse = (idx: number) => {
    const container = stageContainerRef.current;
    if (!container) return;
    const total = CULINARY_COURSES.length;
    const top = container.getBoundingClientRect().top + window.scrollY;
    const scrollable = Math.max(1, container.offsetHeight - window.innerHeight);
    const targetP = (idx + 0.48) / total;
    window.scrollTo({
      top: top + scrollable * targetP,
      behavior: "smooth",
    });
  };

  const activeDish = CULINARY_COURSES[activeIndex] ?? CULINARY_COURSES[0];

  return (
    <section
      id="dining"
      aria-label="Chapter 04 — The Royal Table"
      className="relative bg-walnut text-cream"
    >
      {/* Desktop Pinned Editorial Dish Choreography */}
      <div
        ref={stageContainerRef}
        className="hidden lg:block relative h-[320vh]"
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
          <div className="palace-grain absolute inset-0" />

          {/* Subtle warm candlelight radial glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_35%_52%,rgba(166,111,69,0.16),transparent_62%)]"
          />

          <div className="relative z-10 mx-auto w-full max-w-[1360px] px-12 grid grid-cols-12 gap-12 items-center pt-10">
            {/* Left: Circular Rotating Platter Stage */}
            <div className="col-span-6 flex flex-col items-center">
              <div className="relative w-[430px] h-[430px] xl:w-[490px] xl:h-[490px] rounded-full border border-gold/25 p-3 shadow-[0_30px_90px_rgba(0,0,0,0.65)]">
                <div className="relative w-full h-full rounded-full overflow-hidden bg-charcoal">
                  {CULINARY_COURSES.map((dish, i) => (
                    <div
                      key={dish.id}
                      ref={(el) => {
                        dishVisualRefs.current[i] = el;
                      }}
                      className="absolute inset-0 will-change-[transform,opacity]"
                    >
                      <Image
                        src={dish.image}
                        alt={dish.name}
                        fill
                        sizes="500px"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-gold/25" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Course selector dots */}
              <div className="mt-7 flex items-center gap-3">
                {CULINARY_COURSES.map((dish, idx) => (
                  <button
                    key={dish.id}
                    type="button"
                    onClick={() => scrollToCourse(idx)}
                    aria-label={`View course ${dish.courseNumber}: ${dish.name}`}
                    className={`h-1.5 transition-all duration-300 cursor-pointer ${
                      activeIndex === idx
                        ? "w-10 bg-gold"
                        : "w-4 bg-ivory/25 hover:bg-ivory/50"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Right: Dynamic Course Typography & Ingredients */}
            <div className="col-span-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-sans text-[11px] tracking-[0.28em] uppercase text-gold">
                  Chapter 04 · The Royal Table
                </span>
                <span className="text-gold/45">·</span>
                <span className="font-devanagari text-xs text-ivory/75">शाही रसोई</span>
              </div>

              <div className="flex items-center gap-3 text-xs font-sans tracking-[0.22em] uppercase text-sandstone mb-2">
                <span>Course {activeDish.courseNumber}</span>
                <span>—</span>
                <span>{activeDish.category}</span>
              </div>

              <h2 className="font-display text-4xl xl:text-5xl text-cream leading-[1.08] transition-all duration-500">
                {activeDish.name}
              </h2>

              <p className="mt-2 font-display italic text-lg text-gold/90">
                {activeDish.accompaniment}
              </p>

              <p className="mt-5 font-sans text-[15px] leading-[1.72] text-ivory/85 max-w-xl">
                {activeDish.description}
              </p>

              {/* Ingredients & Provenance */}
              <div className="mt-7 border-t border-ivory/15 pt-5">
                <p className="font-sans text-[10px] tracking-[0.26em] uppercase text-gold/80 mb-3">
                  Provenance & Key Ingredients
                </p>
                <div className="flex flex-wrap gap-2">
                  {activeDish.ingredients.map((ing) => (
                    <span
                      key={ing}
                      className="px-3 py-1.5 bg-charcoal/90 border border-gold/20 font-sans text-xs text-ivory/90"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-7 flex items-center justify-between border-t border-ivory/15 pt-5">
                <div>
                  <span className="font-sans text-xs text-ivory/65">
                    {activeDish.dietary}
                  </span>
                  <p className="font-display text-2xl text-cream mt-0.5">
                    {activeDish.price}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={onReserveTable}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-gold text-walnut font-sans text-[11px] font-medium tracking-[0.22em] uppercase hover:bg-cream transition-colors cursor-pointer"
                >
                  <UtensilsCrossed className="w-3.5 h-3.5" />
                  <span>Reserve a Table</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Dedicated Editorial Culinary Showcase */}
      <div className="lg:hidden py-20 px-6 sm:px-10">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <span className="font-sans text-[11px] tracking-[0.28em] uppercase text-gold">
              Chapter 04 · The Royal Table
            </span>
            <span className="font-devanagari text-xs text-ivory/75">शाही रसोई</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl text-cream leading-tight">
            Mewar culinary heritage,{" "}
            <span className="italic font-normal text-gold">
              composed by candlelight.
            </span>
          </h2>

          <div className="mt-12 space-y-16">
            {CULINARY_COURSES.map((dish) => (
              <article key={dish.id} className="border-t border-ivory/15 pt-10">
                <div className="relative mx-auto w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden border border-gold/30 mb-8 shadow-2xl">
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    fill
                    sizes="320px"
                    className="object-cover"
                  />
                </div>

                <p className="font-sans text-[10px] tracking-[0.24em] uppercase text-sandstone">
                  Course {dish.courseNumber} · {dish.category}
                </p>
                <h3 className="mt-1.5 font-display text-2xl sm:text-3xl text-cream">
                  {dish.name}
                </h3>
                <p className="mt-1 font-display italic text-base text-gold">
                  {dish.accompaniment}
                </p>
                <p className="mt-3 font-sans text-sm leading-relaxed text-ivory/80">
                  {dish.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {dish.ingredients.map((ing) => (
                    <span
                      key={ing}
                      className="px-2.5 py-1 bg-charcoal border border-gold/20 font-sans text-[11px] text-ivory/85"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
                <div className="mt-5 flex items-center justify-between text-sm">
                  <span className="text-ivory/65">{dish.dietary}</span>
                  <span className="font-display text-xl text-cream">{dish.price}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* Restaurant Information, Hours, Dietary & Table Reservation Band */}
      <div className="relative bg-charcoal text-cream border-t border-gold/20 py-16 sm:py-20 px-6 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-[1360px]">
          <ArchitecturalDivider tone="ivory" className="mb-12" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5">
              <p className="font-sans text-[11px] tracking-[0.26em] uppercase text-gold mb-2">
                Palace Dining Rooms
              </p>
              <h3 className="font-display text-3xl sm:text-4xl text-cream">
                Darbar Rasoi &amp; The Chandni Terrace
              </h3>
              <p className="mt-4 font-sans text-sm leading-relaxed text-ivory/75">
                {RESTAURANT_INFO.dietaryNote}
              </p>
              <p className="mt-3 font-sans text-xs text-gold/85">
                {RESTAURANT_INFO.dressCode}
              </p>

              <button
                type="button"
                onClick={onReserveTable}
                className="mt-7 inline-flex items-center gap-2.5 px-7 py-3.5 border border-gold text-gold font-sans text-[11px] font-medium tracking-[0.22em] uppercase hover:bg-gold hover:text-walnut transition-colors cursor-pointer"
              >
                <UtensilsCrossed className="w-3.5 h-3.5" />
                <span>Reserve a Table</span>
              </button>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {RESTAURANT_INFO.venues.map((venue) => (
                <div
                  key={venue.name}
                  className="p-6 sm:p-7 bg-walnut/85 border border-gold/20 flex flex-col justify-between"
                >
                  <div>
                    <p className="font-sans text-[10px] tracking-[0.24em] uppercase text-sandstone">
                      {venue.setting}
                    </p>
                    <h4 className="mt-1.5 font-display text-2xl text-cream">
                      {venue.name}
                    </h4>
                  </div>

                  <div className="mt-6 pt-4 border-t border-ivory/10 space-y-2 text-xs sm:text-[13px] font-sans">
                    <p className="text-ivory/85">{venue.hours}</p>
                    <p className="text-gold">{venue.tastingPrice}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
