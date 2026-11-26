"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X, ArrowUpRight } from "lucide-react";
import { PalaceLogo } from "@/components/brand/PalaceLogo";
import {
  ArchitecturalDivider,
  JaaliCornerFrame,
  JharokhaElevationWatermark,
} from "@/components/brand/HeritageMotifs";
import { BRAND_INFO } from "@/data/palace";
import { usePalaceScroll } from "@/components/animation/ScrollController";

interface NavigationOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onReserve: () => void;
}

const MENU_ITEMS = [
  {
    index: "01",
    label: "The Palace",
    devanagari: "राजमहल",
    targetId: "palace",
    caption: "Grand Sandstone Courtyard & Swagat Kaksh",
    previewImage: "/images/plates/courtyard-axis.jpg",
  },
  {
    index: "02",
    label: "Stay",
    devanagari: "विश्राम",
    targetId: "stay",
    caption: "Heritage Rooms, Royal Suites & Maharaja Wing",
    previewImage: "/images/rooms/royal-suite.jpg",
  },
  {
    index: "03",
    label: "Dining",
    devanagari: "शाही रसोई",
    targetId: "dining",
    caption: "Darbar Rasoi & The Chandni Terrace",
    previewImage: "/images/dining/laal-maas.jpg",
  },
  {
    index: "04",
    label: "Experiences",
    devanagari: "अनुभव",
    targetId: "experiences",
    caption: "Arogya Spa, Baori Pool & Evening Folk",
    previewImage: "/images/experiences/royal-spa.jpg",
  },
  {
    index: "05",
    label: "Contact",
    devanagari: "संपर्क",
    targetId: "contact",
    caption: "West Bank of Lake Pichola, Udaipur",
    previewImage: "/images/plates/palace-sunset-exterior.jpg",
  },
];

export function NavigationOverlay({
  isOpen,
  onClose,
  onReserve,
}: NavigationOverlayProps) {
  const { scrollToSection } = usePalaceScroll();
  const [hoveredIdx, setHoveredIdx] = useState(0);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    closeBtnRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const activePreview = MENU_ITEMS[hoveredIdx] ?? MENU_ITEMS[0];

  const handleNavigate = (targetId: string) => {
    onClose();
    window.setTimeout(() => scrollToSection(targetId), 120);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="ABC HOTEL Navigation"
      className="fixed inset-0 z-[80] bg-walnut text-cream flex flex-col justify-between overflow-y-auto"
    >
      <div className="palace-grain absolute inset-0" />

      {/* Quiet architectural watermark */}
      <JharokhaElevationWatermark className="pointer-events-none absolute right-6 bottom-6 w-80 h-96 text-gold opacity-[0.06] hidden lg:block" />

      {/* Top Overlay Header */}
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 h-20 flex items-center justify-between border-b border-ivory/10">
        <button
          ref={closeBtnRef}
          type="button"
          onClick={onClose}
          className="inline-flex items-center gap-2.5 text-[11px] font-sans tracking-[0.24em] uppercase text-ivory/80 hover:text-gold transition-colors cursor-pointer"
        >
          <X className="w-4 h-4 stroke-[1.5]" />
          <span>Close</span>
        </button>

        <PalaceLogo layout="inline" tone="ivory" showSubtitle />

        <button
          type="button"
          onClick={() => {
            onClose();
            window.setTimeout(onReserve, 140);
          }}
          className="px-4 py-2 text-[11px] font-sans font-medium tracking-[0.2em] uppercase border border-gold/60 text-gold hover:bg-gold hover:text-walnut transition-colors cursor-pointer"
        >
          Reserve
        </button>
      </div>

      {/* Main Editorial Menu Body */}
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 py-10 lg:py-14 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center flex-1">
        {/* Left: Editorial Index Links */}
        <nav aria-label="Full screen navigation" className="lg:col-span-7 flex flex-col gap-3 sm:gap-4">
          <p className="font-sans text-[11px] tracking-[0.28em] uppercase text-gold/80 mb-2">
            Palace Chapters · Udaipur
          </p>

          {MENU_ITEMS.map((item, idx) => (
            <button
              key={item.targetId}
              type="button"
              onMouseEnter={() => setHoveredIdx(idx)}
              onFocus={() => setHoveredIdx(idx)}
              onClick={() => handleNavigate(item.targetId)}
              className="group text-left py-2 sm:py-2.5 border-b border-ivory/10 flex items-baseline justify-between gap-4 cursor-pointer transition-colors"
            >
              <div className="flex items-baseline gap-4 sm:gap-6">
                <span className="font-sans text-xs tracking-[0.2em] text-gold/75">
                  {item.index}
                </span>
                <span className="font-display text-3xl sm:text-5xl lg:text-[3.35rem] leading-none text-cream group-hover:text-gold group-hover:italic transition-all duration-300">
                  {item.label}
                </span>
                <span className="hidden sm:inline-block font-devanagari text-sm text-ivory/45 group-hover:text-gold/75 transition-colors">
                  {item.devanagari}
                </span>
              </div>

              <ArrowUpRight className="w-5 h-5 text-ivory/35 group-hover:text-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
            </button>
          ))}

          <div className="pt-4">
            <button
              type="button"
              onClick={() => {
                onClose();
                window.setTimeout(onReserve, 140);
              }}
              className="group inline-flex items-center gap-4 text-left cursor-pointer"
            >
              <span className="font-sans text-xs tracking-[0.2em] text-gold">06</span>
              <span className="font-display italic text-2xl sm:text-4xl text-gold group-hover:text-cream transition-colors">
                Reserve Your Stay
              </span>
            </button>
          </div>
        </nav>

        {/* Right: Active Hover Photography Frame */}
        <div className="hidden lg:block lg:col-span-5">
          <JaaliCornerFrame tone="ivory" className="p-2">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-charcoal">
              <Image
                src={activePreview.previewImage}
                alt={activePreview.label}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-walnut/80 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <p className="font-sans text-[10px] tracking-[0.26em] uppercase text-gold">
                  Chapter {activePreview.index}
                </p>
                <p className="mt-1 font-display italic text-xl text-cream">
                  {activePreview.caption}
                </p>
              </div>
            </div>
          </JaaliCornerFrame>
        </div>
      </div>

      {/* Bottom Contact Strip */}
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 pb-8">
        <ArchitecturalDivider tone="ivory" className="mb-6" />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-sans text-ivory/65">
          <p>{BRAND_INFO.address}</p>
          <div className="flex flex-wrap gap-6">
            <span>{BRAND_INFO.phone}</span>
            <span>{BRAND_INFO.conciergeEmail}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

