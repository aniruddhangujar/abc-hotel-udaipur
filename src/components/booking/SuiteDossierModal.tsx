"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { X, Check, Maximize2, Users, Eye } from "lucide-react";
import { RoomCategory } from "@/data/rooms";
import { ArchitecturalDivider, JaaliCornerFrame } from "@/components/brand/HeritageMotifs";

interface SuiteDossierModalProps {
  room: RoomCategory | null;
  onClose: () => void;
  onCheckAvailability: (roomId: string) => void;
}

export function SuiteDossierModal({
  room,
  onClose,
  onCheckAvailability,
}: SuiteDossierModalProps) {
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!room) return;
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
  }, [room, onClose]);

  if (!room) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="suite-dossier-title"
      className="fixed inset-0 z-[85] flex items-center justify-center bg-walnut/85 backdrop-blur-md p-4 sm:p-6 lg:p-10"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-cream text-walnut border border-sandstone/35 shadow-2xl">
        {/* Top Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 sm:px-8 py-4 bg-cream/95 backdrop-blur-sm border-b border-sandstone/20">
          <div className="flex items-center gap-3">
            <span className="font-sans text-[10px] tracking-[0.28em] uppercase text-sandstone">
              Accommodation Dossier · {room.index}
            </span>
            <span className="text-sandstone/40">·</span>
            <span className="font-devanagari text-xs text-terracotta">
              {room.devanagari}
            </span>
          </div>

          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            aria-label="Close suite dossier"
            className="inline-flex items-center gap-2 text-[11px] font-sans tracking-[0.2em] uppercase text-walnut hover:text-terracotta transition-colors cursor-pointer"
          >
            <span>Close</span>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-9">
          {/* Left Photography */}
          <div className="lg:col-span-6">
            <JaaliCornerFrame tone="walnut">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-walnut/10">
                <Image
                  src={room.image}
                  alt={room.name}
                  fill
                  sizes="(min-width: 1024px) 45vw, 95vw"
                  className="object-cover"
                />
              </div>
            </JaaliCornerFrame>

            <div className="mt-6 grid grid-cols-3 gap-3 border-t border-b border-sandstone/25 py-4">
              <div>
                <p className="flex items-center gap-1.5 font-sans text-[10px] tracking-[0.2em] uppercase text-sandstone">
                  <Maximize2 className="w-3 h-3" /> Area
                </p>
                <p className="mt-1 font-sans text-xs sm:text-sm font-medium text-walnut">
                  {room.dimensions}
                </p>
              </div>
              <div>
                <p className="flex items-center gap-1.5 font-sans text-[10px] tracking-[0.2em] uppercase text-sandstone">
                  <Users className="w-3 h-3" /> Guests
                </p>
                <p className="mt-1 font-sans text-xs sm:text-sm font-medium text-walnut">
                  {room.capacity}
                </p>
              </div>
              <div>
                <p className="flex items-center gap-1.5 font-sans text-[10px] tracking-[0.2em] uppercase text-sandstone">
                  <Eye className="w-3 h-3" /> Setting
                </p>
                <p className="mt-1 font-sans text-xs sm:text-sm font-medium text-walnut">
                  {room.bedding}
                </p>
              </div>
            </div>
          </div>

          {/* Right Specifications */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <p className="font-sans text-[11px] tracking-[0.24em] uppercase text-terracotta">
                {room.subtitle}
              </p>
              <h2
                id="suite-dossier-title"
                className="mt-2 font-display text-3xl sm:text-4xl text-walnut"
              >
                {room.name}
              </h2>

              <p className="mt-4 font-sans text-sm leading-[1.7] text-charcoal">
                {room.shortDescription}
              </p>

              <p className="mt-3 font-sans text-sm leading-[1.7] text-charcoal/85">
                {room.architecturalNotes}
              </p>

              <p className="mt-4 font-sans text-xs text-olive font-medium">
                Vista: {room.view}
              </p>

              <ArchitecturalDivider tone="walnut" className="my-4" />

              <p className="font-sans text-[10px] tracking-[0.24em] uppercase text-sandstone mb-3">
                Curated Amenities & Palace Privileges
              </p>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {room.amenities.map((amenity) => (
                  <li
                    key={amenity}
                    className="flex items-start gap-2 font-sans text-xs sm:text-[13px] text-walnut"
                  >
                    <Check className="w-3.5 h-3.5 text-sandstone shrink-0 mt-0.5" />
                    <span>{amenity}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 pt-5 border-t border-sandstone/25 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="font-sans text-[10px] tracking-[0.24em] uppercase text-charcoal/70">
                  Starting Nightly Tariff
                </p>
                <p className="font-display text-2xl sm:text-3xl text-walnut">
                  {room.priceDisplay}
                  <span className="font-sans text-xs text-charcoal/70 font-normal">
                    {" "}
                    / night + royal taxes
                  </span>
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onCheckAvailability(room.id);
                }}
                className="px-6 py-3.5 bg-walnut text-cream font-sans text-[11px] font-medium tracking-[0.22em] uppercase hover:bg-terracotta transition-colors cursor-pointer"
              >
                Check Availability
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
