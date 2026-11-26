import React from "react";

interface PalaceEmblemProps {
  className?: string;
  size?: number;
}

/**
 * Understated geometric Mewar Jharokha-Lotus architectural emblem.
 * Combines a cusped Rajput mehraab arch with a minimal three-petal lotus geometry
 * and a stone plinth baseline. No crowns, no noisy mandalas.
 */
export function PalaceEmblem({ className = "", size = 34 }: PalaceEmblemProps) {
  return (
    <svg
      width={size}
      height={Math.round((size * 44) / 48)}
      viewBox="0 0 48 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Stepped stone plinth */}
      <line x1="6" y1="39.5" x2="42" y2="39.5" stroke="currentColor" strokeWidth="1.1" />
      <line x1="11" y1="42" x2="37" y2="42" stroke="currentColor" strokeWidth="0.9" opacity="0.65" />

      {/* Outer cusped Rajasthani arch (mehraab) */}
      <path
        d="M11 39.5V22.5C11 19.5 13 17.5 15 16.5C14.5 14 16.5 11.5 19.5 10.5C21 7.5 22.8 5.2 24 3.5C25.2 5.2 27 7.5 28.5 10.5C31.5 11.5 33.5 14 33 16.5C35 17.5 37 19.5 37 22.5V39.5"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Inner jharokha sill & columns */}
      <line x1="16" y1="35.5" x2="32" y2="35.5" stroke="currentColor" strokeWidth="0.9" opacity="0.7" />
      <path
        d="M16 35.5V23.5C16 19.5 19.8 16.5 24 13.5C28.2 16.5 32 19.5 32 23.5V35.5"
        stroke="currentColor"
        strokeWidth="0.85"
        opacity="0.75"
      />

      {/* Geometric three-petal lotus crest */}
      <path
        d="M24 20.5C25.6 23 25.8 25.8 24 28.8C22.2 25.8 22.4 23 24 20.5Z"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      <path
        d="M24 28.8C21.2 28.2 19.4 26.2 19.2 23.6C21.4 24.1 22.9 25.7 24 28.8Z"
        stroke="currentColor"
        strokeWidth="0.95"
        strokeLinejoin="round"
      />
      <path
        d="M24 28.8C26.8 28.2 28.6 26.2 28.8 23.6C26.6 24.1 25.1 25.7 24 28.8Z"
        stroke="currentColor"
        strokeWidth="0.95"
        strokeLinejoin="round"
      />

      {/* Keystone dot */}
      <circle cx="24" cy="32" r="0.9" fill="currentColor" />
    </svg>
  );
}

interface PalaceLogoProps {
  layout?: "stacked" | "inline";
  tone?: "ivory" | "walnut";
  showSubtitle?: boolean;
  className?: string;
}

export function PalaceLogo({
  layout = "inline",
  tone = "ivory",
  showSubtitle = false,
  className = "",
}: PalaceLogoProps) {
  const colorClass = tone === "ivory" ? "text-cream" : "text-walnut";
  const accentClass = tone === "ivory" ? "text-gold" : "text-sandstone";

  if (layout === "stacked") {
    return (
      <div className={`inline-flex flex-col items-center select-none ${colorClass} ${className}`}>
        <PalaceEmblem size={42} className={`${accentClass} mb-2.5`} />
        <span className="font-display text-[1.45rem] md:text-[1.75rem] font-medium tracking-[0.28em] uppercase leading-none pl-[0.28em]">
          ABC HOTEL
        </span>
        {showSubtitle && (
          <span className="mt-2 font-sans text-[10px] tracking-[0.38em] uppercase opacity-80 pl-[0.38em]">
            Udaipur · Rajasthan
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-2 sm:gap-3 select-none ${colorClass} ${className}`}>
      <PalaceEmblem size={26} className={`${accentClass} hidden sm:block`} />
      <div className="flex flex-col text-center sm:text-left">
        <span className="font-display text-[13px] sm:text-base font-medium tracking-[0.2em] sm:tracking-[0.26em] uppercase leading-none whitespace-nowrap">
          ABC HOTEL
        </span>
        {showSubtitle && (
          <span className="mt-1 font-sans text-[8px] sm:text-[9px] tracking-[0.28em] sm:tracking-[0.32em] uppercase opacity-75">
            Udaipur
          </span>
        )}
      </div>
    </div>
  );
}
